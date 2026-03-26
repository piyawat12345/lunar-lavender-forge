import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("id");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">หน้าแรก</Link>
            <span>/</span>
            <span className="text-foreground">หมวดหมู่สินค้าทั้งหมด</span>
          </nav>

          <h1 className="text-2xl font-bold mb-6">หมวดหมู่สินค้าทั้งหมด</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden border border-border">
                    <Skeleton className="w-full h-48" />
                    <div className="p-4"><Skeleton className="h-5 w-1/3" /></div>
                  </div>
                ))
              : categories?.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={`/category/${cat.id}`}>
                      <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all group">
                        <img
                          src={cat.image || "/placeholder.svg"}
                          alt={cat.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-foreground">{cat.name}</h3>
                            <p className="text-sm text-muted-foreground">มีสินค้าทั้งหมด {cat.product_count} ชิ้น</p>
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
