import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const Products = () => {
  const { categoryId } = useParams();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: async () => {
      let query = supabase.from("products").select("*").order("id");
      if (categoryId) {
        query = query.eq("category_id", Number(categoryId));
      }
      const { data, error } = await query;
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
            <Link to="/categories" className="hover:text-foreground transition-colors">หมวดหมู่ทั้งหมด</Link>
            <span>/</span>
            <span className="text-foreground">สินค้า</span>
          </nav>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-2 space-y-2">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))
              : products?.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link to={`/shop/${product.id}`}>
                      <div className="bg-card rounded-xl border border-border hover:border-primary/50 transition-all overflow-hidden group">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2">
                          <h3 className="text-xs font-bold text-foreground line-clamp-2">{product.name}</h3>
                          <p className="text-sm font-bold text-primary mt-1">{Number(product.price).toFixed(2)} บาท</p>
                          {product.stock > 0 ? (
                            <button className="w-full mt-2 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">
                              ซื้อสินค้า
                            </button>
                          ) : (
                            <button disabled className="w-full mt-2 py-1.5 bg-muted text-muted-foreground text-xs font-bold rounded-lg cursor-not-allowed">
                              สินค้าหมด
                            </button>
                          )}
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

export default Products;
