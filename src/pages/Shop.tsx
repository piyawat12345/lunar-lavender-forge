import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus, AlertTriangle, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const notices = [
  {
    title: "แจ้งให้ทราบ/Notice",
    content: "ทุกไอดีรับประกัน 3 วันเท่านั้น / All IDs are guaranteed for only 3 days.",
  },
  {
    title: "แจ้งให้ทราบ/Notice",
    content: "เคลมกรณีติดกุญแจเท่านั้น หากนำไอดีไปฟามต่อแล้วโดนแบนจากในเกม ไม่สามารถเคลมได้",
    contentEn: "Claim only in case of key lock. If you use the ID to continue farming and get banned from the game, you cannot claim.",
  },
  {
    title: "แจ้งให้ทราบ/Notice",
    content: "ทางร้านปรับเป็นระบบผูกเมลแดงแล้ว ประกันจะหมดต่อเมื่อ เปลี่ยนเมลหรือลบเมล",
    contentEn: "The store has switched to a red-email binding system. The warranty will only expire if you change or remove the email.",
  },
];

const Shop = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { user, profile } = useAuth();
  const [buying, setBuying] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(id))
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleBuy = async () => {
    if (!user || !profile || !product) return;
    const totalPrice = Number(product.price) * quantity;
    if (Number(profile.credit) < totalPrice) {
      toast.error("เครดิตไม่เพียงพอ กรุณาเติมเงินก่อน");
      return;
    }
    setBuying(true);
    const { error } = await supabase.from("purchase_history").insert({
      user_id: user.id,
      product_id: product.id,
      product_name: product.name,
      price: totalPrice,
      quantity,
    });
    setBuying(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } else {
      toast.success("สั่งซื้อสำเร็จ! ตรวจสอบที่คลังเก็บของ");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-24 pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">หน้าแรก</Link>
            <span>/</span>
            <Link to="/categories" className="hover:text-foreground transition-colors">หมวดหมู่ทั้งหมด</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="space-y-3 mb-6">
            {notices.map((notice, i) => (
              <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <AlertTriangle size={16} /> {notice.title}
                </h4>
                <p className="text-xs text-foreground/80 mt-1">{notice.content}</p>
                {notice.contentEn && <p className="text-xs text-muted-foreground mt-1">{notice.contentEn}</p>}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="grid md:grid-cols-[350px_1fr] gap-6 p-6">
              <div className="flex justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full max-w-[350px] aspect-square object-cover rounded-xl border-2 border-primary/30"
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-xl font-bold">{product.name}</h1>
                <p className="text-2xl font-bold text-primary">{Number(product.price).toFixed(2)} บาท / ชิ้น</p>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">รายละเอียดสินค้า</h3>
                  <p className="text-sm text-foreground">{product.description}</p>
                </div>

                <p className="text-xs text-destructive">
                  *รบกวนอัดคลิปตั้งแต่ซื้อสินค้าจนถึงการเข้ารหัส หากไม่มีคลิปแล้วรหัสเกิดปัญหาทางร้านขอไม่รับผิดชอบทุกกรณี*
                </p>

                <p className="text-sm">
                  หากลูกค้าต้องการเคลมสินค้า แจ้งปัญหาติดต่อได้ที่:{" "}
                  <a href="https://lin.ee/CeZmjXV" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    line official
                  </a>
                </p>

                <div>
                  <label className="text-sm text-muted-foreground">จำนวนสินค้า</label>
                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-border"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-bold w-12 text-center">{quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-border"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">เหลือสินค้าอีก {product.stock} ชิ้น</p>
                </div>

                {user ? (
                  <Button
                    onClick={handleBuy}
                    disabled={product.stock === 0 || buying}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl mt-4"
                  >
                    {buying ? <Loader2 size={16} className="mr-2 animate-spin" /> : <ShoppingCart size={16} className="mr-2" />}
                    {buying ? "กำลังสั่งซื้อ..." : `ซื้อสินค้า (${(Number(product.price) * quantity).toFixed(2)} บาท)`}
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl mt-4">
                      <ShoppingCart size={16} className="mr-2" />
                      เข้าสู่ระบบเพื่อซื้อสินค้า
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Shop;
