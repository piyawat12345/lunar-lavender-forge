import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt="Maruai789 ขายไอดีเกม Roblox"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      {/* Top glow */}
      <div className="absolute inset-0 hero-glow" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 bg-glass rounded-full px-4 py-1.5 mb-8">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-xs font-medium text-muted-foreground">ปลอดภัย 100% · ส่งไว · บริการ 24 ชม.</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          ขาย<span className="text-gradient-primary">ไอดีไก่ตัน</span> Roblox
          <br />
          <span className="text-gradient-primary">Blox Fruit</span>,{" "}
          <a href="#streaming" className="hover:underline">Netflix ราคาถูก</a>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Maruai789 ศูนย์รวมไก่ตัน Roblox คุณภาพดี ราคาถูก
          เหมาะสำหรับคนที่ต้องการเริ่มต้นเกม Blox Fruit แบบตึงๆ พร้อมสู้
          <br className="hidden sm:block" />
          หรือจะนำไปขายต่อก็คุ้มสุดๆ ระบบส่งไว ปลอดภัย บริการหลังการขาย 24 ชม.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base glow-primary">
            เลือกซื้อสินค้า
            <ArrowRight size={18} className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-border text-foreground hover:bg-secondary">
            สมัครสมาชิก
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          {[
            { value: "10K+", label: "ลูกค้า" },
            { value: "50K+", label: "ออเดอร์" },
            { value: "24/7", label: "บริการ" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-bold text-gradient-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
