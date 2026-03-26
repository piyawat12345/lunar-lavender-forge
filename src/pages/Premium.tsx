import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";

const premiumProducts = [
  { id: 7, name: "Netflix Premium 6 เดือน", price: 199, img: "/img/product/6m.png", stock: 10 },
  { id: 8, name: "Netflix + Disney+ 6 เดือน", price: 299, img: "/img/product/6m_dg.png", stock: 5 },
  { id: 13, name: "Netflix CDK 6 เดือน", price: 249, img: "/img/product/6m_cdk.png", stock: 3 },
  { id: 14, name: "Netflix + Disney+ CDK", price: 349, img: "/img/product/6m_dg_cdk.png", stock: 7 },
  { id: 11, name: "AV 10K", price: 150, img: "/img/product/av_10k.png", stock: 3 },
  { id: 12, name: "AV 20K", price: 250, img: "/img/product/av_20k.png", stock: 4 },
  { id: 15, name: "AV 50K", price: 450, img: "/img/product/av_50k.png", stock: 2 },
];

const Premium = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">หน้าแรก</Link>
            <span>/</span>
            <span className="text-foreground">สินค้า แอพดูหนัง</span>
          </nav>

          <h1 className="text-2xl font-bold mb-6">สินค้า แอพดูหนัง & พรีเมี่ยม</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {premiumProducts.map((product, i) => (
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
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-xs font-bold text-foreground line-clamp-2">{product.name}</h3>
                      <p className="text-sm font-bold text-primary mt-1">{product.price.toFixed(2)} บาท</p>
                      {product.stock > 0 ? (
                        <button className="w-full mt-2 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg">
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

export default Premium;
