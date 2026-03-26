import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12 px-6 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src="/img/logo/1720545452182_logo.png" alt="Maruai789" className="h-8" />
          </Link>
          <p className="text-xs text-muted-foreground mt-1">ศูนย์รวมไอดีเกมและสตรีมมิ่ง คุณภาพดี ราคาถูก</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/categories" className="hover:text-foreground transition-colors">สินค้า</Link>
          <Link to="/topup" className="hover:text-foreground transition-colors">เติมเงิน</Link>
          <a href="https://lin.ee/CeZmjXV" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LINE</a>
          <a href="https://www.facebook.com/maruai789" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Facebook</a>
          <a href="https://www.instagram.com/maruai789" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © 2024 Maruai789. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
