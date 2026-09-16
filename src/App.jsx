import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Info,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";

const services = [
  {
    id: "electricity",
    title: "Elektrik",
    subtitle: "Elektrik faturası",
    icon: "⚡",
    className: "electricity",
    description: "Elektrik hizmetiniz için kurumunuzun resmî ödeme kanalına ulaşın.",
    links: [
      { name: "e-Devlet", url: "https://www.turkiye.gov.tr/" },
      { name: "EPDK", url: "https://www.epdk.gov.tr/" }
    ]
  },
  {
    id: "water",
    title: "Su",
    subtitle: "Su faturası",
    icon: "💧",
    className: "water",
    description: "Su faturası işlemleriniz için ilgili belediye ve kurum kanallarına ulaşın.",
    links: [
      { name: "e-Devlet", url: "https://www.turkiye.gov.tr/" }
    ]
  },
  {
    id: "gas",
    title: "Doğalgaz",
    subtitle: "Doğalgaz faturası",
    icon: "🔥",
    className: "gas",
    description: "Doğalgaz hizmetiniz için güvenilir resmî kanallara yönlendirme.",
    links: [
      { name: "e-Devlet", url: "https://www.turkiye.gov.tr/" }
    ]
  },
  {
    id: "internet",
    title: "İnternet",
    subtitle: "İnternet faturası",
    icon: "🌐",
    className: "internet",
    description: "İnternet sağlayıcınızın resmî ödeme veya müşteri hizmetleri kanalına ulaşın.",
    links: [
      { name: "Türk Telekom", url: "https://www.turktelekom.com.tr/" },
      { name: "Turkcell", url: "https://www.turkcell.com.tr/" },
      { name: "Vodafone", url: "https://www.vodafone.com.tr/" }
    ]
  },
  {
    id: "hgs",
    title: "HGS",
    subtitle: "Geçiş ve bakiye",
    icon: "🚗",
    className: "hgs",
    description: "HGS ile ilgili işlemler için resmî kanallara hızlıca ulaşın.",
    links: [
      { name: "PTT HGS", url: "https://hgsmusteri.pttavm.com/" }
    ]
  },
  {
    id: "mobile",
    title: "GSM",
    subtitle: "Telefon işlemleri",
    icon: "📱",
    className: "mobile",
    description: "Mobil hat ve operatör işlemleriniz için resmî kanallara gidin.",
    links: [
      { name: "Turkcell", url: "https://www.turkcell.com.tr/" },
      { name: "Türk Telekom", url: "https://www.turktelekom.com.tr/" },
      { name: "Vodafone", url: "https://www.vodafone.com.tr/" }
    ]
  },
  {
    id: "tax",
    title: "Vergi",
    subtitle: "Vergi işlemleri",
    icon: "🏛️",
    className: "tax",
    description: "Vergi işlemleri için resmî devlet kanallarına ulaşın.",
    links: [
      { name: "e-Devlet", url: "https://www.turkiye.gov.tr/" },
      { name: "GİB", url: "https://www.gib.gov.tr/" }
    ]
  },
  {
    id: "other",
    title: "Diğer",
    subtitle: "Diğer işlemler",
    icon: "✨",
    className: "other",
    description: "Yakında daha fazla ödeme ve kamu hizmeti kategorisi eklenecek.",
    links: [
      { name: "e-Devlet", url: "https://www.turkiye.gov.tr/" }
    ]
  }
];

function App() {
  const [intro, setIntro] = useState(true);
  const [modal, setModal] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  const filteredServices = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    if (!q) return services;
    return services.filter((s) =>
      `${s.title} ${s.subtitle}`.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [query]);

  const openService = (service) => {
    setSelectedService(service);
    setModal("service");
  };

  const closeModal = () => {
    setModal(null);
    setSelectedService(null);
  };

  return (
    <div className="app-shell">
      {intro && (
        <div className="splash" aria-label="Uygulama açılıyor">
          <div className="splash-orb orb-one" />
          <div className="splash-orb orb-two" />
          <div className="logo-mark splash-logo">
            <span>₺</span>
          </div>
          <div className="splash-name">Ödeme Kolay</div>
          <div className="splash-line" />
          <p>Ödemeye giden kolay yol</p>
        </div>
      )}

      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="logo-mark"><span>₺</span></div>
            <div>
              <strong>Ödeme Kolay</strong>
              <small>Tek yerde, kolayca.</small>
            </div>
          </button>

          <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`}>
            <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              Hizmetler
            </button>
            <button onClick={() => setModal("about")}>Hakkımızda</button>
            <button onClick={() => setModal("security")}>Güvenlik</button>
          </nav>

          <button className="menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Menü">
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow glow-a" />
          <div className="hero-glow glow-b" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={16} /> Ödemelere giden kısa yol</div>
              <h1>Ödemelerini<br /><span>kolaylaştır.</span></h1>
              <p>
                Elektrik, su, doğalgaz, internet, HGS ve daha fazlası.
                Aradığın hizmeti seç, güvenilir resmî kanala kolayca ulaş.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Hizmetleri Gör <ArrowRight size={18} />
                </button>
                <button className="ghost-button" onClick={() => setModal("about")}>
                  Nasıl çalışır?
                </button>
              </div>

              <div className="trust-row">
                <span><ShieldCheck size={17} /> Kart bilgisi saklamaz</span>
                <span><CheckCircle2 size={17} /> Ödeme aracısı değiliz</span>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="visual-card back-card card-a">
                <span>💧</span>
              </div>
              <div className="visual-card back-card card-b">
                <span>⚡</span>
              </div>
              <div className="visual-main-card">
                <div className="visual-top">
                  <span>Bugün</span>
                  <span className="status-dot">● Hazır</span>
                </div>
                <div className="visual-balance">
                  <small>Ödeme merkeziniz</small>
                  <strong>8 hizmet</strong>
                </div>
                <div className="mini-service-grid">
                  {services.slice(0, 6).map((s) => (
                    <div key={s.id} className="mini-service">
                      <span>{s.icon}</span>
                      <small>{s.title}</small>
                    </div>
                  ))}
                </div>
                <div className="visual-footer">
                  <ShieldCheck size={18} />
                  Resmî kanallara yönlendirme
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Hizmetler</div>
                <h2>Ne ödemek istiyorsun?</h2>
                <p>Bir kategori seç ve ilgili resmî ödeme kanalına ilerle.</p>
              </div>
              <div className="search-box">
                <Search size={19} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Hizmet ara..."
                  aria-label="Hizmet ara"
                />
              </div>
            </div>

            <div className="service-grid">
              {filteredServices.map((service, index) => (
                <button
                  key={service.id}
                  className={`service-card ${service.className}`}
                  style={{ "--delay": `${index * 55}ms` }}
                  onClick={() => openService(service)}
                >
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-text">
                    <strong>{service.title}</strong>
                    <span>{service.subtitle}</span>
                  </div>
                  <ChevronRight className="service-arrow" size={21} />
                </button>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="empty-state">
                <Search size={28} />
                <strong>Hizmet bulunamadı</strong>
                <span>Farklı bir kelime deneyebilirsin.</span>
              </div>
            )}
          </div>
        </section>

        <section className="how-section">
          <div className="container">
            <div className="how-card">
              <div>
                <div className="eyebrow">Basit ve anlaşılır</div>
                <h2>Üç adımda doğru yere ulaş.</h2>
                <p>Ödeme Kolay ödeme almaz. Seni seçtiğin hizmetin resmî veya yetkili kanalına yönlendirir.</p>
              </div>
              <div className="steps">
                <div className="step"><b>01</b><span>Hizmeti seç</span></div>
                <div className="step"><b>02</b><span>Kurumu seç</span></div>
                <div className="step"><b>03</b><span>Resmî siteye git</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div>
            <div className="footer-brand"><div className="logo-mark"><span>₺</span></div><strong>Ödeme Kolay</strong></div>
            <p>Ödeme kanallarına daha kolay ulaşmanız için tasarlanmış bağımsız bir yönlendirme uygulaması.</p>
          </div>
          <div className="footer-links">
            <button onClick={() => setModal("about")}>Hakkımızda</button>
            <button onClick={() => setModal("security")}>Güvenlik</button>
            <button onClick={() => setModal("help")}>Yardım</button>
          </div>
          <small>© {new Date().getFullYear()} Ödeme Kolay</small>
        </div>
      </footer>

      {modal === "about" && (
        <Modal title="Hakkımızda" icon={<Info /> } onClose={closeModal}>
          <div className="modal-hero">
            <div className="modal-logo"><span>₺</span></div>
            <div>
              <strong>Ödeme Kolay nedir?</strong>
              <p>Farklı ödeme ve kamu hizmetlerine ulaşmayı tek bir sade arayüzden kolaylaştıran bağımsız bir yönlendirme uygulamasıdır.</p>
            </div>
          </div>
          <div className="info-box">
            <CheckCircle2 size={20} />
            <p>Uygulama ödeme işlemini kendi içinde gerçekleştirmez. Kullanıcıyı seçtiği hizmetin resmî veya yetkili kanalına yönlendirir.</p>
          </div>
          <p className="legal-text">
            Marka adları, logolar ve kurumlara ait içerikler ilgili hak sahiplerine aittir.
            Bu uygulama, açıkça belirtilmediği sürece listelenen kurumların resmî uygulaması değildir.
            Kullanıcı, yönlendirildiği dış sitedeki işlemlerden ilgili sitenin koşulları çerçevesinde sorumludur.
          </p>
        </Modal>
      )}

      {modal === "security" && (
        <Modal title="Güvenlik" icon={<ShieldCheck />} onClose={closeModal}>
          <div className="security-list">
            <div><ShieldCheck /><div><strong>Kart bilgisi istemiyoruz</strong><span>Uygulama içinde kart veya banka bilgisi girilmez.</span></div></div>
            <div><ExternalLink /><div><strong>Dış siteye açık yönlendirme</strong><span>Butona bastığında ilgili kurumun sitesine geçtiğin açıkça belirtilir.</span></div></div>
            <div><CircleHelp /><div><strong>Bilgilendirme</strong><span>Siteye geçmeden önce hangi kurumun sayfasına gideceğini görebilirsin.</span></div></div>
          </div>
        </Modal>
      )}

      {modal === "help" && (
        <Modal title="Yardım" icon={<CircleHelp />} onClose={closeModal}>
          <div className="help-copy">
            <p><strong>Nasıl kullanılır?</strong></p>
            <p>1. Ana sayfadan hizmeti seç.</p>
            <p>2. Açılan pencereden ilgili kurumu seç.</p>
            <p>3. “Resmî siteye git” butonuna bas.</p>
            <p>Ödeme işlemi Ödeme Kolay dışında, yönlendirildiğin kurumun kendi sayfasında gerçekleşir.</p>
          </div>
        </Modal>
      )}

      {modal === "service" && selectedService && (
        <Modal title={selectedService.title} icon={<span className="modal-service-icon">{selectedService.icon}</span>} onClose={closeModal}>
          <p className="service-description">{selectedService.description}</p>
          <div className="redirect-warning">
            <ExternalLink size={19} />
            <span>Devam ettiğinde Ödeme Kolay dışındaki bir web sitesine yönlendirileceksin.</span>
          </div>
          <div className="provider-list">
            {selectedService.links.map((link) => (
              <a
                key={link.name}
                className="provider-button"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.name}</span>
                <ExternalLink size={18} />
              </a>
            ))}
          </div>
          <p className="tiny-note">
            Lütfen adres çubuğundaki alan adını kontrol et ve yalnızca güvendiğin resmî sayfalarda işlem yap.
          </p>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, icon, children, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-title-icon">{icon}</div>
            <h3>{title}</h3>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Kapat"><X /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default App;