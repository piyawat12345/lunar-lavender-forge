import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Store, Film, Gamepad2, Coins, Package, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const productLinks = [
  { label: "สินค้า Roblox", href: "/categories", icon: Gamepad2 },
  { label: "สินค้า แอพดูหนัง", href: "/premium", icon: Film },
];

const navLinks = [
  { label: "หน้าแรก", href: "/" },
  { label: "สินค้าทั้งหมด", href: "/products", dropdown: productLinks, icon: Store },
  { label: "เติมเงิน", href: "/topup" },
  { label: "คลังเก็บของ", href: "/inventory" },
  { label: "ติดต่อ", href: "https://lin.ee/CeZmjXV", external: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("ออกจากระบบสำเร็จ");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-glass navbar-gradient-border"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/img/logo/1720545452182_logo.png" alt="Maruai789" className="h-10" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6" ref={dropdownRef}>
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon && <link.icon size={15} />}
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen === link.label ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl overflow-hidden shadow-lg"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => setDropdownOpen(null)}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          <item.icon size={16} className="text-primary" />
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            )
          )}

          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center gap-3">
              {profile && (
                <span className="text-xs text-primary font-medium">
                  {Number(profile.credit).toFixed(2)} เครดิต
                </span>
              )}
              <Link to="/profile">
                <Button size="sm" variant="outline" className="rounded-full px-4 border-border gap-2">
                  <User size={14} />
                  {profile?.username || "โปรไฟล์"}
                </Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={handleLogout} className="rounded-full px-3 text-muted-foreground hover:text-destructive">
                <LogOut size={14} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/register">
                <Button size="sm" variant="outline" className="rounded-full px-5 border-border text-foreground hover:bg-secondary">
                  สมัครสมาชิก
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="btn-gradient-primary text-primary-foreground rounded-full px-6">
                  เข้าสู่ระบบ
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-glass border-t border-border"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                      className="flex items-center justify-between w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {link.icon && <link.icon size={15} />}
                        {link.label}
                      </span>
                      <ChevronDown size={14} className={`transition-transform ${dropdownOpen === link.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-6"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              onClick={() => { setOpen(false); setDropdownOpen(null); }}
                              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <item.icon size={14} className="text-primary" />
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
                {user ? (
                  <>
                    {profile && (
                      <p className="text-xs text-primary font-medium text-center mb-1">
                        {Number(profile.credit).toFixed(2)} เครดิต
                      </p>
                    )}
                    <Link to="/profile" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="rounded-full w-full border-border gap-2">
                        <User size={14} />
                        {profile?.username || "โปรไฟล์"}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => { handleLogout(); setOpen(false); }}
                      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                    >
                      <LogOut size={14} className="mr-2" />
                      ออกจากระบบ
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/register" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="rounded-full w-full border-border text-foreground hover:bg-secondary">
                        สมัครสมาชิก
                      </Button>
                    </Link>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button className="btn-gradient-primary text-primary-foreground rounded-full w-full">
                        เข้าสู่ระบบ
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
