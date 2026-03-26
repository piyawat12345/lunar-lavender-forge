const FooterSection = () => {
  return (
    <footer id="contact" className="border-t border-border py-12 px-6 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-lg font-bold text-gradient-primary">Maruai789</span>
          <p className="text-xs text-muted-foreground mt-1">ศูนย์รวมไอดีเกมและสตรีมมิ่ง คุณภาพดี ราคาถูก</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">นโยบาย</a>
          <a href="#" className="hover:text-foreground transition-colors">เงื่อนไข</a>
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
