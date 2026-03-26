import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Coins, Link as LinkIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const mockHistory = [
  { id: 1, method: "อั่งเปา", credit: 100, time: "2024-12-01 14:30" },
  { id: 2, method: "พร้อมเพย์", credit: 500, time: "2024-11-28 10:15" },
  { id: 3, method: "อั่งเปา", credit: 200, time: "2024-11-25 18:45" },
];

const Topup = () => {
  const [link, setLink] = useState("");

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Topup;
