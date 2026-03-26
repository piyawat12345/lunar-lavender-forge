import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Coins, Link as LinkIcon, CheckCircle, QrCode, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const presetAmounts = [20, 50, 100, 200, 300, 500, 1000];

const Topup = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [activeTab, setActiveTab] = useState<"truewallet" | "promptpay">("truewallet");
  const [ppAmount, setPpAmount] = useState("");
  const [ppStep, setPpStep] = useState<"form" | "qr" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [idPay, setIdPay] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const { data: history, refetch: refetchHistory } = useQuery({
    queryKey: ["topup-history", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("topup_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const callPaymentApi = async (body: Record<string, any>) => {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await supabase.functions.invoke("payment", {
      body,
    });
    return res.data;
  };

  const handlePromptPaySubmit = async () => {
    if (!ppAmount || Number(ppAmount) <= 0 || !user || !profile) return;
    setLoading(true);
    try {
      const data = await callPaymentApi({
        action: "create_pay",
        amount: Number(ppAmount),
        ref1: profile.username,
      });

      if (data?.status === "1" || data?.id_pay) {
        const payId = data.id_pay;
        setIdPay(payId);

        // Save to history
        await supabase.from("topup_history").insert({
          user_id: user.id,
          amount: Number(ppAmount),
          method: "promptpay",
          status: "pending",
          reference: payId,
        });

        // Get QR details
        const details = await callPaymentApi({
          action: "detail_pay",
          id_pay: payId,
        });

        if (details) {
          setPaymentDetails(details);
          if (details.qr_image || details.qr_url || details.qr) {
            setQrImageUrl(details.qr_image || details.qr_url || details.qr || "");
          }
        }

        setPpStep("qr");
      } else {
        toast.error(data?.msg || "ไม่สามารถสร้างรายการได้ กรุณาลองใหม่");
      }
    } catch (err: any) {
      console.error("PromptPay error:", err);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
    setLoading(false);
  };

  const handleConfirmPayment = async () => {
    if (!idPay || !user) return;
    setLoading(true);
    try {
      const data = await callPaymentApi({
        action: "confirm",
        id_pay: idPay,
      });

      if (data?.status === "1") {
        // Update topup history status
        await supabase
          .from("topup_history")
          .update({ status: "completed" })
          .eq("reference", idPay)
          .eq("user_id", user.id);

        await refreshProfile();
        await refetchHistory();
        setPpStep("success");
        toast.success("เติมเงินสำเร็จ!");
      } else {
        toast.error(data?.msg || "ยังไม่พบการชำระเงิน กรุณาสแกน QR Code แล้วลองอีกครั้ง");
      }
    } catch (err: any) {
      console.error("Confirm error:", err);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
    setLoading(false);
  };

  const handleCancelPayment = async () => {
    if (idPay) {
      try {
        await callPaymentApi({ action: "cancel", id_pay: idPay });
      } catch (e) {
        // ignore cancel errors
      }
    }
    setIdPay("");
    setQrImageUrl("");
    setPaymentDetails(null);
    setPpStep("form");
  };

  const handleTrueWallet = async () => {
    if (!link || !user || !profile) return;
    setLoading(true);
    try {
      const res = await supabase.functions.invoke("truewallet", {
        body: {
          angpao_link: link,
          username: profile.username,
        },
      });
      const data = res.data;

      if (data?.credit_added && data.credit_added > 0) {
        await supabase.from("topup_history").insert({
          user_id: user.id,
          amount: data.credit_added,
          method: "truewallet",
          status: "completed",
          reference: link,
        });
        await refreshProfile();
        await refetchHistory();
        toast.success(`เติมเงินสำเร็จ! ได้รับ ${data.credit_added} เครดิต`);
        setLink("");
      } else {
        const errorMsg = data?.Msg || data?.msg || data?.error || "ลิงก์อังเปาไม่ถูกต้องหรือถูกใช้แล้ว";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      console.error("TrueWallet error:", err);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
    setLoading(false);
  };

  const tabs = [
    { id: "truewallet" as const, label: "TrueWallet อั่งเปา", icon: LinkIcon },
    { id: "promptpay" as const, label: "PromptPay QR", icon: QrCode },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">หน้าแรก</Link>
            <span>/</span>
            <span className="text-foreground">เติมเงิน</span>
          </nav>

          <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
            <Coins size={20} className="text-primary" /> Topup - เติมเงิน
          </h2>

          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); handleCancelPayment(); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "truewallet" && (
              <motion.div key="truewallet" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="grid md:grid-cols-[350px_1fr] gap-6 p-6">
                  <div className="text-center space-y-4">
                    <img src="/img/icon/truewallet.png" alt="TrueWallet" className="w-32 h-32 mx-auto object-contain" />
                    <div>
                      <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                        <LinkIcon size={14} /> Aungpao - ลิ้งอังเป่า
                      </label>
                      <Input placeholder="https://gift.truemoney.com/campaign/?v=xxxx" value={link}
                        onChange={(e) => setLink(e.target.value)} className="bg-secondary border-border" disabled={loading} />
                    </div>
                    <Button onClick={handleTrueWallet} disabled={!link || loading} className="w-full rounded-xl">
                      {loading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <CheckCircle size={16} className="mr-2" />}
                      {loading ? "กำลังตรวจสอบ..." : "ตรวจสอบข้อมูล"}
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      *หากโอนเงินไปแล้วไม่ได้เครดิต แจ้งที่ได้ :{" "}
                      <a href="https://lin.ee/CeZmjXV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">line official</a>
                    </p>
                    <TopupHistoryTable history={history || []} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "promptpay" && (
              <motion.div key="promptpay" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-[hsl(var(--primary))] p-4 flex items-center justify-center gap-3">
                  <img src="/img/icon/pp.png" alt="PromptPay" className="h-10 object-contain" />
                  <img src="/img/icon/maemanee.png" alt="Maemanee" className="h-8 object-contain" />
                </div>
                <div className="flex items-center justify-center gap-3 p-3 border-b border-border bg-secondary/30">
                  <img src="/img/support_logo/1.jpg" alt="support" className="h-8 object-contain rounded" />
                  <img src="/img/support_logo/2.jpg" alt="support" className="h-8 object-contain rounded" />
                  <img src="/img/support_logo/5.png" alt="support" className="h-8 object-contain rounded" />
                </div>
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {ppStep === "form" && (
                      <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto space-y-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            <CreditCard size={14} className="inline mr-2" />จำนวนเงินที่ต้องการเติม (บาท)
                          </label>
                          <Input type="number" placeholder="ระบุจำนวนเงิน" value={ppAmount}
                            onChange={(e) => setPpAmount(e.target.value)} className="bg-secondary border-border text-lg h-12" min={1} disabled={loading} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {presetAmounts.map((amt) => (
                            <button key={amt} onClick={() => setPpAmount(String(amt))}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                ppAmount === String(amt)
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-secondary border-border text-foreground hover:border-primary/50"
                              }`}>
                              ฿{amt}
                            </button>
                          ))}
                        </div>
                        <Button onClick={handlePromptPaySubmit} disabled={!ppAmount || Number(ppAmount) <= 0 || loading} className="w-full h-12 rounded-xl text-base">
                          {loading ? <Loader2 size={18} className="mr-2 animate-spin" /> : <QrCode size={18} className="mr-2" />}
                          {loading ? "กำลังสร้าง QR Code..." : "สร้าง QR Code เพื่อชำระเงิน"}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">*ระบบจะสร้าง QR Code สำหรับสแกนจ่ายผ่านแอปธนาคาร</p>
                      </motion.div>
                    )}
                    {ppStep === "qr" && (
                      <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto text-center space-y-6">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">สแกน QR Code เพื่อชำระเงิน</h3>
                          <p className="text-muted-foreground text-sm">จำนวน <span className="text-primary font-bold text-lg">{ppAmount}</span> บาท</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 inline-block mx-auto shadow-lg border">
                          {qrImageUrl ? (
                            <img src={qrImageUrl} alt="QR Code" className="w-52 h-52 object-contain" />
                          ) : (
                            <div className="w-52 h-52 bg-muted rounded-xl flex items-center justify-center">
                              <div className="text-center">
                                <QrCode size={80} className="text-muted-foreground mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground">กำลังโหลด QR Code...</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">ควรชำระภายใน <span className="text-primary font-semibold">24 ชม.</span></p>
                        <div className="flex gap-3">
                          <Button variant="outline" onClick={handleCancelPayment} className="flex-1 rounded-xl">ยกเลิก</Button>
                          <Button onClick={handleConfirmPayment} disabled={loading} className="flex-1 rounded-xl">
                            {loading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <CheckCircle size={16} className="mr-2" />}
                            {loading ? "กำลังตรวจสอบ..." : "ยืนยันการโอนเงิน"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    {ppStep === "success" && (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="max-w-md mx-auto text-center space-y-6 py-8">
                        <img src="/img/icon/check_green.png" alt="Success" className="w-24 h-24 mx-auto" />
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">ทำรายการสำเร็จแล้ว</h3>
                          <p className="text-muted-foreground">คุณได้รับ <span className="text-primary font-bold">{ppAmount}</span> เครดิต ขอบคุณครับ</p>
                        </div>
                        <p className="text-sm text-muted-foreground">ตรวจสอบเครดิตของคุณ หากพบปัญหากรุณาติดต่อ Admin</p>
                        <Button onClick={() => { setPpStep("form"); setPpAmount(""); setIdPay(""); setQrImageUrl(""); }} className="rounded-xl">เติมเงินอีกครั้ง</Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {ppStep === "form" && (
                  <div className="border-t border-border p-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      *หากโอนเงินไปแล้วไม่ได้เครดิต แจ้งที่ได้ :{" "}
                      <a href="https://lin.ee/CeZmjXV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">line official</a>
                    </p>
                    <TopupHistoryTable history={history || []} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

interface TopupRecord {
  id: string;
  method: string;
  amount: number;
  created_at: string;
  status: string;
}

const TopupHistoryTable = ({ history }: { history: TopupRecord[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-muted-foreground">
          <th className="text-left py-3 px-2">#</th>
          <th className="text-left py-3 px-2">Pay</th>
          <th className="text-left py-3 px-2">Credit</th>
          <th className="text-left py-3 px-2">Status</th>
          <th className="text-left py-3 px-2">Time</th>
        </tr>
      </thead>
      <tbody>
        {history.length === 0 ? (
          <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">ยังไม่มีประวัติการเติมเงิน</td></tr>
        ) : (
          history.map((h, i) => (
            <tr key={h.id} className="border-b border-border/50">
              <td className="py-3 px-2 text-muted-foreground">{i + 1}</td>
              <td className="py-3 px-2">{h.method === "truewallet" ? "อั่งเปา" : "พร้อมเพย์"}</td>
              <td className="py-3 px-2 text-primary font-medium">{Number(h.amount).toFixed(2)}</td>
              <td className="py-3 px-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  h.status === "completed" ? "bg-green-500/20 text-green-400"
                  : h.status === "failed" ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
                }`}>{h.status === "completed" ? "สำเร็จ" : h.status === "failed" ? "ล้มเหลว" : "รอดำเนินการ"}</span>
              </td>
              <td className="py-3 px-2 text-muted-foreground">{new Date(h.created_at).toLocaleString("th-TH")}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default Topup;
