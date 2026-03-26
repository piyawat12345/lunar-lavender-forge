import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Blox Fruits", img: "/img/group/1720545440460.jpg", count: 45 },
  { id: 2, name: "Fisch", img: "/img/group/fisch_category.png", count: 20 },
  { id: 3, name: "PC Executor", img: "/img/group/pcexecutor_2cate.png", count: 8 },
  { id: 4, name: "อื่นๆ", img: "/img/group/1720545441850.jpg", count: 12 },
];

const FeaturesSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">หมวดหมู่แนะนำสำหรับคุณ</h2>
        <Link to="/categories" className="px-4 py-2 border border-primary/50 text-primary text-sm rounded-lg hover:bg-primary/10 transition-colors">
          ดูเพิ่มเติม
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/category/${cat.id}`}>
              <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all group">
                <img src={cat.img} alt={cat.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">มีสินค้าทั้งหมด {cat.count} ชิ้น</p>
                  </div>
                  <span className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
                    สินค้าทั้งหมด
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
