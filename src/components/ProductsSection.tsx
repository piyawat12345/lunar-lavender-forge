import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2, Tv, Crown } from "lucide-react";

const products = [
  {
    icon: Gamepad2,
    title: "ไก่ตัน Roblox",
    desc: "ไอดีตึง ๆ พร้อมเล่น Blox Fruit, Pet Simulator, Adopt Me",
    price: "เริ่มต้น ฿29",
    tag: "ขายดี",
  },
  {
    icon: Crown,
    title: "Blox Fruit",
    desc: "ไอดีพร้อมสกิลเทพ เลเวลสูง อาวุธครบ พร้อมลุย",
    price: "เริ่มต้น ฿49",
    tag: "แนะนำ",
  },
  {
    icon: Tv,
    title: "แอพสตรีมมิ่ง",
    desc: "Netflix, Disney+, YouTube Premium และอื่น ๆ ราคาพิเศษ",
    price: "เริ่มต้น ฿39",
    tag: "พรีเมียม",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            สินค้า<span className="text-gradient-primary">ยอดนิยม</span>
          </h2>
          <p className="text-muted-foreground mt-4">เลือกสินค้าที่ใช่สำหรับคุณ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/40 transition-all duration-300 flex flex-col"
            >
              {/* Tag */}
              <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider bg-primary/15 text-primary rounded-full px-3 py-1">
                {p.tag}
              </span>

              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <p.icon size={26} className="text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-bold text-gradient-primary">{p.price}</span>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5">
                  ดูเพิ่มเติม
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
