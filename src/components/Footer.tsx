import { Twitter, Youtube, MessageCircle, Mail, Heart } from "lucide-react";

const Footer = () => {
  const links = {
    서비스: ["마켓플레이스", "크리에이터", "커뮤니티", "요금제"],
    지원: ["FAQ", "문의하기", "이용약관", "개인정보처리방침"],
    리소스: ["아바타 제작 가이드", "API 문서", "파트너십", "블로그"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: MessageCircle, href: "#", label: "Discord" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative pt-20 pb-8 border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-lg">V</span>
              </div>
              <span className="font-display font-bold text-xl gradient-text">VirtuMall</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              버츄얼 아바타의 모든 것. 제작부터 판매까지, 크리에이터와 팬을 연결하는 최고의 플랫폼.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-[0_0_15px_hsl(180_100%_50%/0.3)] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 VirtuMall. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for Virtual Creators
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
