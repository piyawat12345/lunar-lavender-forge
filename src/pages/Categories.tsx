import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const categories = [
  {
    id: 1,
    name: "Blox Fruits",
    img: "/img/group/1720545440460.jpg",
    count: 45,
  },
  {
    id: 2,
    name: "Fisch",
    img: "/img/group/fisch_category.png",
    count: 20,
  },
  {
    id: 3,
    name: "PC Executor",
    img: "/img/group/pcexecutor_2cate.png",
    count: 8,
  },
  {
    id: 4,
    name: "AV Premium",
    img: "/img/group/av_cate.png",
    count: 15,
  },
  {
    id: 5,
    name: "อื่นๆ",
    img: "/img/group/1720545441850.jpg",
    count: 12,
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">หน้าแรก</Link>
            <span>/</span>
            <span className="text-foreground">หมวดหมู่สินค้าทั้งหมด</span>
          </nav>

          <h1 className="text-2xl font-bold mb-6">หมวดหมู่สินค้าทั้งหมด</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/category/${cat.id}`}>
                  <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all group">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Categories;
