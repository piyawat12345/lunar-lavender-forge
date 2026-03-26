import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Copy, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const Inventory = () => {
  const { user } = useAuth();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { data: purchases, isLoading } = useQuery({
    queryKey: ["purchase_history", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchase_history")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("คัดลอกแล้ว!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const parseDeliveredData = (raw: string | null) => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Record<string, string>;
    } catch {
      return { ข้อมูล: raw };
    }
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

          {!user && (
            <div className="text-center py-16 text-muted-foreground">
              <p>กรุณา <Link to="/login" className="text-primary underline">เข้าสู่ระบบ</Link> เพื่อดูคลังเก็บของ</p>
            </div>
          )}

          {user && isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          )}

          {user && !isLoading && (!purchases || purchases.length === 0) && (
            <div className="text-center py-16 text-muted-foreground">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              <p>ยังไม่มีสินค้าในคลัง</p>
              <Link to="/categories" className="text-primary underline text-sm mt-2 inline-block">เลือกซื้อสินค้า</Link>
            </div>
          )}

          <div className="space-y-4">
            {purchases?.map((item, i) => {
              const fields = parseDeliveredData(item.delivered_data);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">{item.product_name}</h3>
                      <p className="text-xs text-muted-foreground">จำนวน: {item.quantity} | ราคา: ฿{Number(item.price).toFixed(2)}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      item.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {item.status === "completed" ? "สำเร็จ" : item.status}
                    </span>
                  </div>

                  {fields && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      {Object.entries(fields).map(([label, value]) => (
                        <div key={label} className="bg-secondary rounded-lg p-3 flex items-center justify-between">
                          <div className="min-w-0 flex-1 mr-2">
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className="font-mono text-xs text-foreground truncate">{value}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(value, `${item.id}-${label}`)}
                            className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                          >
                            {copiedField === `${item.id}-${label}` ? (
                              <CheckCircle size={16} className="text-emerald-400" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {!fields && (
                    <p className="text-xs text-muted-foreground italic">ไม่มีข้อมูลจัดส่ง</p>
                  )}

                  <p className="text-xs text-muted-foreground mt-3">
                    ซื้อเมื่อ: {new Date(item.created_at).toLocaleString("th-TH")}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Inventory;
