import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const topProducts = [
  { id: 1, name: "Blox Fruit V4 T1 Human", price: 89, img: "/img/product/v4t1_human.png", stock: 5 },
  { id: 2, name: "Blox Fruit V4 T1 Mink", price: 99, img: "/img/product/v4t1_mink.png", stock: 3 },
  { id: 3, name: "Blox Fruit V4 T1 Fish", price: 89, img: "/img/product/v4t1_fish.png", stock: 7 },
  { id: 4, name: "Blox Fruit V4 T1 Cyborg", price: 95, img: "/img/product/v4t1_cyborg.png", stock: 2 },
  { id: 5, name: "Blox Fruit V4 T1 Ghoul", price: 95, img: "/img/product/v4t1_ghoul.png", stock: 4 },
  { id: 6, name: "Blox Fruit V4 T1 Angel", price: 99, img: "/img/product/v4t1_angel.png", stock: 0 },
  { id: 7, name: "Netflix Premium 6M", price: 199, img: "/img/product/6m.png", stock: 10 },
  { id: 8, name: "Netflix+Disney+ 6M", price: 299, img: "/img/product/6m_dg.png", stock: 5 },
  { id: 9, name: "Fisch ไอดี 1", price: 59, img: "/img/product/1fisch.png", stock: 8 },
  { id: 10, name: "Fisch ไอดี 2", price: 79, img: "/img/product/2fisch.png", stock: 6 },
  { id: 11, name: "AV 10K", price: 150, img: "/img/product/av_10k.png", stock: 3 },
  { id: 12, name: "AV 20K", price: 250, img: "/img/product/av_20k.png", stock: 4 },
];

const ProductsSection = () => {
  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">สินค้าแนะนำ</h2>
        <Link to="/categories" className="px-4 py-2 border border-primary/50 text-primary text-sm rounded-lg hover:bg-primary/10 transition-colors">
          ดูเพิ่มเติม
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {topProducts.map((product, i) => (
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
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-xs font-bold text-foreground line-clamp-2">{product.name}</h3>
                  <p className="text-sm font-bold text-primary mt-1">{product.price.toFixed(2)} บาท</p>
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
