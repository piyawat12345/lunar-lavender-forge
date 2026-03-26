import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Wallet, Mail, Calendar, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

const Profile = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    await signOut();
    toast.success("ออกจากระบบสำเร็จ");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 md:pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-primary" />
              </div>
              <h1 className="text-xl font-bold">{profile.username}</h1>
              <p className="text-sm text-muted-foreground">สถานะ: {profile.status}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-secondary rounded-xl p-4 flex items-center gap-4">
                <Wallet size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">เครดิตคงเหลือ</p>
                  <p className="text-lg font-bold text-primary">{Number(profile.credit).toFixed(2)} เครดิต</p>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-4 flex items-center gap-4">
                <Mail size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">อีเมล</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-4 flex items-center gap-4">
                <Calendar size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">วันที่สมัคร</p>
                  <p className="text-sm font-medium">{new Date(profile.created_at).toLocaleDateString("th-TH")}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link to="/topup">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                  เติมเงิน
                </Button>
              </Link>
              <Link to="/inventory">
                <Button variant="outline" className="w-full border-border rounded-xl">
                  คลังเก็บของ
                </Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full mt-4 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
            >
              <LogOut size={16} className="mr-2" />
              ออกจากระบบ
            </Button>
          </motion.div>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Profile;
