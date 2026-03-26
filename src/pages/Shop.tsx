import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus, AlertTriangle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

// Mock product data
const productData: Record<string, { name: string; price: number; img: string; stock: number; description: string }> = {
  "1": { name: "Blox Fruit V4 T1 Human", price: 89, img: "/img/product/v4t1_human.png", stock: 5, description: "ไอดี Blox Fruit V4 Race Human พร้อมเล่น" },
  "2": { name: "Blox Fruit V4 T1 Mink", price: 99, img: "/img/product/v4t1_mink.png", stock: 3, description: "ไอดี Blox Fruit V4 Race Mink พร้อมเล่น" },
  "7": { name: "Netflix Premium 6 เดือน", price: 199, img: "/img/product/6m.png", stock: 10, description: "Netflix Premium 6 เดือน ดูได้ทุกอุปกรณ์" },
};

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
  const product = productData[id || "1"] || productData["1"];
  const [quantity, setQuantity] = useState(1);

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

          {/* Notices */}
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
                  src={product.img}
                  alt={product.name}
                  className="w-full max-w-[350px] aspect-square object-cover rounded-xl border-2 border-primary/30"
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-xl font-bold">{product.name}</h1>
                <p className="text-2xl font-bold text-primary">{product.price.toFixed(2)} บาท / ชิ้น</p>

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

                <Link to="/login">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl mt-4">
                    <ShoppingCart size={16} className="mr-2" />
                    เข้าสู่ระบบเพื่อซื้อสินค้า
                  </Button>
                </Link>
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
