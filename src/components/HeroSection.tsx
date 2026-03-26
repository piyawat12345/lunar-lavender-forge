import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const heroBanner = "/img/1720545450016.jpg";

const quickCards = [
  { img: "/img/catgory/1720545447125.jpg", alt: "ติดต่อสอบถาม", href: "https://lin.ee/CeZmjXV", external: true },
  { img: "/img/catgory/1720545445488.jpg", alt: "เติมเงิน", href: "/topup" },
  { img: "/img/catgory/1720545443741.jpg", alt: "เลือกซื้อสินค้า", href: "/categories" },
  { img: "/img/catgory/1720545448723.jpg", alt: "บริการอื่นๆ", href: "/premium" },
];

const HeroSection = () => {
  return (
    <section>
      {/* Hero Banner */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={heroBanner}
            alt="Maruai789 Hero Banner"
            className="w-full rounded-xl"
          />
        </motion.div>
      </div>

      {/* Quick Access Cards - matching old site */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickCards.map((card, i) => (
            <motion.div
              key={card.alt}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              {card.external ? (
                <a href={card.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={card.img}
                    alt={card.alt}
                    className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer"
                  />
                </a>
              ) : (
                <Link to={card.href}>
                  <img
                    src={card.img}
                    alt={card.alt}
                    className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer"
                  />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notices - matching old site */}
      <div className="max-w-6xl mx-auto px-4 mt-6 space-y-3">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <h4 className="font-bold text-amber-400 text-sm">**แจ้งให้ทราบ/Notice**</h4>
          <p className="text-sm text-foreground mt-1">ทุกไอดีรับประกัน 3 วันเท่านั้น / All IDs are guaranteed for only 3 days.</p>
          <p className="text-xs text-muted-foreground mt-1">
            ถ้า ID Roblox ติด 2 Step Verification ให้ไปแก้ที่นี่{" "}
            <a href="https://genhubs.com/tools/device-logout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">คลิก</a>
          </p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <h4 className="font-bold text-amber-400 text-sm">แจ้งให้ทราบ/Notice</h4>
          <p className="text-sm text-foreground mt-1">เคลมกรณีติดกุญแจเท่านั้น หากนำไอดีไปฟามต่อแล้วโดนแบนจากในเกม ไม่สามารถเคลมได้</p>
          <p className="text-xs text-muted-foreground mt-1">Claim only in case of key lock.</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <h4 className="font-bold text-amber-400 text-sm">แจ้งให้ทราบ/Notice</h4>
          <p className="text-sm text-foreground mt-1">ทางร้านปรับเป็นระบบผูกเมลแดงแล้ว ประกันจะหมดต่อเมื่อ เปลี่ยนเมลหรือลบเมล</p>
          <p className="text-xs text-muted-foreground mt-1">The store has switched to a red-email binding system.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
