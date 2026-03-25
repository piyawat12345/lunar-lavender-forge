import { motion } from "framer-motion";
import { Zap, ShieldCheck, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "ส่งไวทันที",
    desc: "ระบบอัตโนมัติ ได้รับสินค้าภายในไม่กี่วินาทีหลังชำระเงิน",
  },
  {
    icon: ShieldCheck,
    title: "ปลอดภัย 100%",
    desc: "ทุกไอดีผ่านการตรวจสอบ รับประกันคุณภาพทุกรายการ",
  },
  {
    icon: Clock,
    title: "ราคาคุ้มค่า",
    desc: "ราคาส่ง คุ้มสุดในตลาด เหมาะทั้งใช้เองและขายต่อ",
  },
  {
    icon: Headphones,
    title: "ซัพพอร์ต 24 ชม.",
    desc: "ทีมงานพร้อมช่วยเหลือตลอด 24 ชั่วโมง ผ่าน LINE",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            ทำไมต้อง <span className="text-gradient-primary">Maruai789</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            เราให้บริการที่ดีที่สุด เพื่อประสบการณ์ที่ไร้กังวล
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
