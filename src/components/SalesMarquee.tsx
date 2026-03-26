import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const mockSales = [
  { user: "x***4", product: "Blox Fruit Lv.2450 V4", time: "2 นาทีที่แล้ว" },
  { user: "g***k", product: "Fisch VIP Account", time: "5 นาทีที่แล้ว" },
  { user: "m***9", product: "Blox Fruit Leopard", time: "8 นาทีที่แล้ว" },
  { user: "s***2", product: "PC Executor Lifetime", time: "12 นาทีที่แล้ว" },
  { user: "a***7", product: "Blox Fruit Kitsune", time: "15 นาทีที่แล้ว" },
  { user: "r***1", product: "Fisch Mythical Rod", time: "18 นาทีที่แล้ว" },
  { user: "p***3", product: "Anime Vanguards 10K", time: "22 นาทีที่แล้ว" },
  { user: "t***8", product: "Blox Fruit T-Rex", time: "25 นาทีที่แล้ว" },
];

const SalesMarquee = () => {
  const items = [...mockSales, ...mockSales];

  return (
    <div className="w-full bg-primary/10 border-b border-primary/20 overflow-hidden py-2">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {items.map((sale, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground shrink-0"
          >
            <ShoppingCart size={14} className="text-primary" />
            <span className="text-foreground font-medium">{sale.user}</span>
            <span>ซื้อ</span>
            <span className="text-primary font-medium">{sale.product}</span>
            <span className="text-xs opacity-60">({sale.time})</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default SalesMarquee;
