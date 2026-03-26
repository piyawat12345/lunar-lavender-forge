import { Home, Store, MessageCircle, UserPlus } from "lucide-react";

const navItems = [
  { icon: Home, label: "หน้าแรก", href: "#" },
  { icon: Store, label: "สินค้า", href: "#products" },
  { icon: UserPlus, label: "สมัครสมาชิก", href: "#" },
  { icon: MessageCircle, label: "ติดต่อเรา", href: "https://lin.ee/CeZmjXV", external: true },
];

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="grid grid-cols-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center justify-center py-3 text-muted-foreground hover:text-primary transition-colors"
          >
            <item.icon size={20} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
