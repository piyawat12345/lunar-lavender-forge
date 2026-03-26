import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Coins, Link as LinkIcon, CheckCircle, QrCode, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const mockHistory = [
  { id: 1, method: "อั่งเปา", credit: 100, time: "2024-12-01 14:30" },
  { id: 2, method: "พร้อมเพย์", credit: 500, time: "2024-11-28 10:15" },
  { id: 3, method: "อั่งเปา", credit: 200, time: "2024-11-25 18:45" },
];

const presetAmounts = [20, 50, 100, 200, 300, 500, 1000];

const Topup = () => {
  const [link, setLink] = useState("");
  const [activeTab, setActiveTab] = useState<"truewallet" | "promptpay">("truewallet");
  const [ppAmount, setPpAmount] = useState("");
  const [ppStep, setPpStep] = useState<"form" | "qr" | "success">("form");
  const [loading, setLoading] = useState(false);

  const handlePromptPaySubmit = () => {
    if (!ppAmount || Number(ppAmount) <= 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPpStep("qr");
    }, 1500);
  };

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPpStep("success");
    }, 2000);
  };

  const tabs = [
    { id: "truewallet" as const, label: "TrueWallet อั่งเปา", icon: LinkIcon },
    { id: "promptpay" as const, label: "PromptPay QR", icon: QrCode },
  ];

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

          {/* Tab Switcher */}
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
            {/* TrueWallet Tab */}
            {activeTab === "truewallet" && (
              <motion.div
                key="truewallet"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <div className="grid md:grid-cols-[350px_1fr] gap-6 p-6">
                  <div className="text-center space-y-4">
                    <img
                      src="/img/icon/truewallet.png"
                      alt="TrueWallet"
                      className="w-32 h-32 mx-auto object-contain"
                    />
                    <div>
                      <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                        <LinkIcon size={14} /> Aungpao - ลิ้งอังเป่า
                      </label>
                      <Input
                        placeholder="https://gift.truemoney.com/campaign/?v=xxxx"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="bg-secondary border-border"
                      />
                    </div>
                    <Button className="w-full rounded-xl">
                      <CheckCircle size={16} className="mr-2" />
                      ตรวจสอบข้อมูล
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      *หากโอนเงินไปแล้วไม่ได้เครดิต แจ้งที่ได้ :{" "}
                      <a href="https://lin.ee/CeZmjXV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        line official
                      </a>
                    </p>
                    <TopupHistoryTable />
                  </div>
                </div>
              </motion.div>
            )}

            {/* PromptPay Tab */}
            {activeTab === "promptpay" && (
              <motion.div
                key="promptpay"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                {/* Header Bar */}
                <div className="bg-[hsl(var(--primary))] p-4 flex items-center justify-center gap-3">
                  <img src="/img/icon/pp.png" alt="PromptPay" className="h-10 object-contain" />
                  <img src="/img/icon/maemanee.png" alt="Maemanee" className="h-8 object-contain" />
                </div>

                {/* Support logos */}
                <div className="flex items-center justify-center gap-3 p-3 border-b border-border bg-secondary/30">
                  <img src="/img/support_logo/1.jpg" alt="support" className="h-8 object-contain rounded" />
                  <img src="/img/support_logo/2.jpg" alt="support" className="h-8 object-contain rounded" />
                  <img src="/img/support_logo/5.png" alt="support" className="h-8 object-contain rounded" />
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Amount Form */}
                    {ppStep === "form" && (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-md mx-auto space-y-6"
                      >
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            <CreditCard size={14} className="inline mr-2" />
                            จำนวนเงินที่ต้องการเติม (บาท)
                          </label>
                          <Input
                            type="number"
                            placeholder="ระบุจำนวนเงิน"
                            value={ppAmount}
                            onChange={(e) => setPpAmount(e.target.value)}
                            className="bg-secondary border-border text-lg h-12"
                            min={1}
                          />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {presetAmounts.map((amt) => (
                            <button
                              key={amt}
                              onClick={() => setPpAmount(String(amt))}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                ppAmount === String(amt)
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-secondary border-border text-foreground hover:border-primary/50"
                              }`}
                            >
                              ฿{amt}
                            </button>
                          ))}
                        </div>

                        <Button
                          onClick={handlePromptPaySubmit}
                          disabled={!ppAmount || Number(ppAmount) <= 0 || loading}
                          className="w-full h-12 rounded-xl text-base"
                        >
                          {loading ? (
                            <Loader2 size={18} className="mr-2 animate-spin" />
                          ) : (
                            <QrCode size={18} className="mr-2" />
                          )}
                          {loading ? "กำลังสร้าง QR Code..." : "สร้าง QR Code เพื่อชำระเงิน"}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          *ระบบจะสร้าง QR Code สำหรับสแกนจ่ายผ่านแอปธนาคาร
                        </p>
                      </motion.div>
                    )}

                    {/* Step 2: QR Code Display */}
                    {ppStep === "qr" && (
                      <motion.div
                        key="qr"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-md mx-auto text-center space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">สแกน QR Code เพื่อชำระเงิน</h3>
                          <p className="text-muted-foreground text-sm">จำนวน <span className="text-primary font-bold text-lg">{ppAmount}</span> บาท</p>
                        </div>

                        {/* QR Placeholder */}
                        <div className="bg-white rounded-2xl p-6 inline-block mx-auto shadow-lg border">
                          <div className="w-52 h-52 bg-muted rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <QrCode size={80} className="text-muted-foreground mx-auto mb-2" />
                              <p className="text-xs text-muted-foreground">QR Code</p>
                              <p className="text-xs text-muted-foreground">จะแสดงเมื่อเชื่อมต่อ API</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          ควรชำระภายใน <span className="text-primary font-semibold">24 ชม.</span>
                        </p>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setPpStep("form")}
                            className="flex-1 rounded-xl"
                          >
                            ยกเลิก
                          </Button>
                          <Button
                            onClick={handleConfirmPayment}
                            disabled={loading}
                            className="flex-1 rounded-xl"
                          >
                            {loading ? (
                              <Loader2 size={16} className="mr-2 animate-spin" />
                            ) : (
                              <CheckCircle size={16} className="mr-2" />
                            )}
                            {loading ? "กำลังตรวจสอบ..." : "ยืนยันการโอนเงิน"}
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Success */}
                    {ppStep === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-md mx-auto text-center space-y-6 py-8"
                      >
                        <img src="/img/icon/check_green.png" alt="Success" className="w-24 h-24 mx-auto" />
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">ทำรายการสำเร็จแล้ว</h3>
                          <p className="text-muted-foreground">
                            คุณได้รับ <span className="text-primary font-bold">{ppAmount}</span> เครดิต ขอบคุณครับ
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ตรวจสอบเครดิตของคุณ หากพบปัญหากรุณาติดต่อ Admin
                        </p>
                        <Button
                          onClick={() => { setPpStep("form"); setPpAmount(""); }}
                          className="rounded-xl"
                        >
                          เติมเงินอีกครั้ง
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* History below PromptPay */}
                {ppStep === "form" && (
                  <div className="border-t border-border p-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      *หากโอนเงินไปแล้วไม่ได้เครดิต แจ้งที่ได้ :{" "}
                      <a href="https://lin.ee/CeZmjXV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        line official
                      </a>
                    </p>
                    <TopupHistoryTable />
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

const TopupHistoryTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-muted-foreground">
          <th className="text-left py-3 px-2">#</th>
          <th className="text-left py-3 px-2">Pay</th>
          <th className="text-left py-3 px-2">Credit</th>
          <th className="text-left py-3 px-2">Time</th>
        </tr>
      </thead>
      <tbody>
        {mockHistory.map((h) => (
          <tr key={h.id} className="border-b border-border/50">
            <td className="py-3 px-2 text-muted-foreground">{h.id}</td>
            <td className="py-3 px-2">{h.method}</td>
            <td className="py-3 px-2 text-primary font-medium">{h.credit.toFixed(2)}</td>
            <td className="py-3 px-2 text-muted-foreground">{h.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Topup;
