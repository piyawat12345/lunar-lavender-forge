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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [activeTab, setActiveTab] = useState<"truewallet" | "promptpay">("truewallet");
  const [ppAmount, setPpAmount] = useState("");
  const [ppStep, setPpStep] = useState<"form" | "qr" | "success">("form");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const { data: history } = useQuery({
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

  const handlePromptPaySubmit = async () => {
    if (!ppAmount || Number(ppAmount) <= 0 || !user) return;
    setLoading(true);
    const { error } = await supabase.from("topup_history").insert({
      user_id: user.id,
      amount: Number(ppAmount),
      method: "promptpay",
      status: "pending",
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาด");
    } else {
      setPpStep("qr");
    }
  };

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPpStep("success");
      toast.success("เติมเงินสำเร็จ!");
    }, 2000);
  };

  const handleTrueWallet = async () => {
    if (!link || !user) return;
    setLoading(true);
    await supabase.from("topup_history").insert({
      user_id: user.id,
      amount: 0,
      method: "truewallet",
      status: "pending",
      reference: link,
    });
    setLoading(false);
    toast.success("ส่งลิงก์อังเปาแล้ว กำลังตรวจสอบ");
    setLink("");
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
                onClick={() => { setActiveTab(tab.id); setPpStep("form"); }}
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
                        onChange={(e) => setLink(e.target.value)} className="bg-secondary border-border" />
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
                            onChange={(e) => setPpAmount(e.target.value)} className="bg-secondary border-border text-lg h-12" min={1} />
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
                          <div className="w-52 h-52 bg-muted rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <QrCode size={80} className="text-muted-foreground mx-auto mb-2" />
                              <p className="text-xs text-muted-foreground">QR Code</p>
                              <p className="text-xs text-muted-foreground">จะแสดงเมื่อเชื่อมต่อ API</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">ควรชำระภายใน <span className="text-primary font-semibold">24 ชม.</span></p>
                        <div className="flex gap-3">
                          <Button variant="outline" onClick={() => setPpStep("form")} className="flex-1 rounded-xl">ยกเลิก</Button>
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
                        <Button onClick={() => { setPpStep("form"); setPpAmount(""); }} className="rounded-xl">เติมเงินอีกครั้ง</Button>
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
                }`}>{h.status}</span>
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
