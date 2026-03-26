import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", email, username, password);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-glass rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <img
              src="/img/logo/1720545453403.jpg"
              alt="Maruai789"
              className="w-24 h-24 rounded-full border-2 border-primary mx-auto mb-4 object-cover"
            />
            <h1 className="text-2xl font-bold text-foreground">สร้างบัญชีใหม่</h1>
            <p className="text-sm text-muted-foreground mt-2">
              ฉันมีบัญชีแล้ว,{" "}
              <Link to="/login" className="text-primary hover:underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                <Mail size={14} /> E-mail (อีเมล)
              </label>
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={50}
                className="bg-secondary border-border"
              />
            </div>

            <div>
              <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                <User size={14} /> Username (ชื่อผู้ใช้)
              </label>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={50}
                className="bg-secondary border-border"
              />
            </div>

            <div>
              <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                <Lock size={14} /> Password (รหัสผ่าน)
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={20}
                  className="bg-secondary border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-foreground flex items-center gap-2 mb-2">
                <Lock size={14} /> Re - Password (ยืนยันรหัสผ่าน)
              </label>
              <div className="relative">
                <Input
                  type={showRePassword ? "text" : "password"}
                  placeholder="Re - Password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  maxLength={20}
                  className="bg-secondary border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Link to="/policy" className="text-xs text-primary hover:underline block">
              นโยบายความเป็นส่วนตัว
            </Link>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              <UserPlus size={16} className="mr-2" />
              สร้างบัญชี
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-border text-foreground hover:bg-secondary"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
              Google Login
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
