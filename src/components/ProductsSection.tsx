import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsSection = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products-featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id")
        .limit(12);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">สินค้าแนะนำ</h2>
        <Link to="/categories" className="px-4 py-2 border border-primary/50 text-primary text-sm rounded-lg hover:bg-primary/10 transition-colors">
          ดูเพิ่มเติม
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-2 space-y-2">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-7 w-full rounded-lg" />
                </div>
              </div>
            ))
          : products?.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
    </section>
  );
};

export default ProductsSection;
