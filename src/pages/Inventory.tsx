import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const mockInventory = [
  { id: 1, name: "Blox Fruit V4 T1 Human", username: "user_bf001", password: "pass123", cookie: "cookie_abc", boughtAt: "2024-12-01 14:30", status: "active" },
  { id: 2, name: "Netflix Premium 6M", username: "netflix_user", password: "nfpass456", cookie: "", boughtAt: "2024-11-28 10:15", status: "active" },
  { id: 3, name: "Blox Fruit V4 T1 Mink", username: "user_bf002", password: "pass789", cookie: "cookie_xyz", boughtAt: "2024-11-25 18:45", status: "claimed" },
];

const Inventory = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("คัดลอกแล้ว!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">หน้าแรก</Link>
            <span>/</span>
            <span className="text-foreground">คลังเก็บของ</span>
          </nav>

          <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
            <Package size={20} className="text-primary" /> คลังเก็บของ - Inventory
          </h2>

          <div className="space-y-4">
            {mockInventory.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-foreground">{item.name}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {item.status === "active" ? "ใช้งานได้" : "เคลมแล้ว"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  {[
                    { label: "Username", value: item.username },
                    { label: "Password", value: item.password },
                    ...(item.cookie ? [{ label: "Cookie", value: item.cookie }] : []),
                  ].map((field) => (
                    <div key={field.label} className="bg-secondary rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">{field.label}</p>
                        <p className="font-mono text-xs text-foreground">{field.value}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(field.value, `${item.id}-${field.label}`)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {copiedField === `${item.id}-${field.label}` ? (
                          <CheckCircle size={16} className="text-emerald-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-muted-foreground">ซื้อเมื่อ: {item.boughtAt}</p>
                  {item.status === "active" && (
                    <Button size="sm" variant="outline" className="text-xs border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                      เคลมสินค้า
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Inventory;
