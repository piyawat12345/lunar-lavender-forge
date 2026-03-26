import { Home, Store, MessageCircle, UserPlus, Coins, Package } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "หน้าแรก", href: "/" },
  { icon: Store, label: "สินค้า", href: "/categories" },
  { icon: Coins, label: "เติมเงิน", href: "/topup" },
  { icon: Package, label: "คลังของ", href: "/inventory" },
  { icon: MessageCircle, label: "ติดต่อ", href: "https://lin.ee/CeZmjXV", external: true },
];

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="grid grid-cols-5">
        {navItems.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon size={18} />
              <span className="text-[9px] mt-1 font-medium">{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              className="flex flex-col items-center justify-center py-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon size={18} />
              <span className="text-[9px] mt-1 font-medium">{item.label}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
