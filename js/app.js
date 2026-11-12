const { useState, useEffect, useRef } = React;

// Lucide Icon Helper Component + SVG Fallback for Brands like TikTok
function Icon({ name, className = "w-5 h-5", ...props }) {
  const iconRef = useRef(null);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [name]);

  if (name === "tiktok") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.69a6.34 6.34 0 0 0 10.82 4.48 6.27 6.27 0 0 0 1.86-4.5V9.03a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.86-.46z"/>
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    );
  }

  return <i data-lucide={name} className={className} ref={iconRef} {...props}></i>;
}

// ==================== NAVBAR COMPONENT ====================
function Navbar({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'skills', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: "Beranda", id: "hero" },
    { href: "#about", label: "Tentang", id: "about" },
    { href: "#skills", label: "Keahlian", id: "skills" },
    { href: "#education", label: "Pendidikan", id: "education" },
    { href: "#contact", label: "Kontak", id: "contact" },
    { href: "tugas-sistem-operasi.html", label: "Tugas Sistem Operasi", id: "os-task" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? darkMode 
          ? 'bg-noir/85 backdrop-blur-md border-b border-surface-border shadow-xl shadow-noir/50' 
          : 'bg-pearl/90 backdrop-blur-md border-b border-surface-lightBorder shadow-md'
        : 'bg-transparent pt-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Text-only Name Identity (Tanpa Logo Box) */}
          <a href="#hero" className="flex flex-col group">
            <span className={`text-base sm:text-lg font-bold tracking-tight transition-colors line-clamp-1 ${
              darkMode ? 'text-pearl group-hover:text-ocean' : 'text-midnight group-hover:text-ocean'
            }`}>
              Muhammad Wandi Saputra Nurhasan
            </span>
            <span className="text-[11px] uppercase tracking-widest text-ocean font-medium">
              Photographer • Videographer • Playback Engineer
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? darkMode
                        ? 'text-ocean font-semibold bg-midnight/30'
                        : 'text-midnight font-bold bg-midnight/10'
                      : darkMode
                        ? 'text-pearl/75 hover:text-pearl hover:bg-white/5'
                        : 'text-midnight/70 hover:text-midnight hover:bg-black/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-ocean rounded-full"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                darkMode
                  ? 'bg-surface-card border-surface-border text-ocean hover:text-pearl hover:border-ocean/60'
                  : 'bg-white border-surface-lightBorder text-midnight hover:border-ocean'
              }`}
              title={darkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Icon name="sun" className="w-5 h-5 text-amber-300" />
              ) : (
                <Icon name="moon" className="w-5 h-5 text-midnight" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl border transition-colors ${
                darkMode
                  ? 'bg-surface-card border-surface-border text-pearl'
                  : 'bg-white border-surface-lightBorder text-midnight'
              }`}
              aria-label="Menu"
            >
              <Icon name={mobileMenuOpen ? "x" : "menu"} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden py-4 px-3 mt-2 rounded-2xl border shadow-2xl transition-all duration-300 ${
            darkMode
              ? 'bg-surface-dark border-surface-border text-pearl'
              : 'bg-surface-lightCard border-surface-lightBorder text-midnight'
          }`}>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-ocean/20 text-ocean font-semibold'
                      : darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-surface-border/50 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl bg-ocean text-noir font-semibold text-sm"
                >
                  Hubungi Saya
                </a>
              </div>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
}

// ==================== HERO SECTION (Clean Typography Centered, No Photo) ====================
function HeroSection({ data, darkMode }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % data.profile.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [data.profile.roles.length]);

  return (
    <section id="hero" className="relative min-h-[85vh] pt-36 pb-24 flex items-center overflow-hidden">
      {/* Background Decorative Radial Gradient & Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-midnight/40 via-ocean/20 to-transparent rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse-glow"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-ocean/15 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
        
        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium border mb-8 ${
          darkMode 
            ? 'bg-surface-card border-surface-border text-pearl/90' 
            : 'bg-white border-surface-lightBorder text-midnight'
        }`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ocean"></span>
          </span>
          <span>{data.profile.availability}</span>
        </div>

        {/* Editorial Heading: Times Roman style serif + Bold sans */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="font-serif italic font-normal block text-ocean text-2xl sm:text-3xl md:text-4xl mb-2">
            Halo, saya
          </span>
          <span className={`block uppercase tracking-tight ${
            darkMode ? 'text-pearl' : 'text-midnight'
          }`}>
            {data.profile.name}
          </span>
        </h1>

        {/* Dynamic Role Rotator */}
        <div className="inline-flex items-center gap-3 text-xl sm:text-2xl font-semibold mb-6 px-6 py-2 rounded-2xl border border-ocean/30 bg-ocean/10">
          <span className="text-ocean font-mono">&gt;</span>
          <span className={`transition-all duration-300 ${
            darkMode ? 'text-pearl' : 'text-midnight'
          }`}>
            {data.profile.roles[roleIndex]}
          </span>
        </div>

        {/* Short Bio Description */}
        <p className={`text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-10 ${
          darkMode ? 'text-pearl/80' : 'text-midnight/80'
        }`}>
          {data.profile.shortBio}
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 w-full sm:w-auto">
          <a
            href="tugas-sistem-operasi.html"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-ocean hover:bg-ocean/90 text-noir font-bold text-sm shadow-xl shadow-ocean/25 hover:shadow-ocean/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Icon name="terminal" className="w-4 h-4" />
            <span>Tugas Sistem Operasi</span>
          </a>

          <a
            href="#skills"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300 hover:-translate-y-0.5 ${
              darkMode
                ? 'border-surface-border bg-surface-card hover:bg-midnight/50 text-pearl hover:border-ocean/60'
                : 'border-surface-lightBorder bg-white hover:bg-gray-50 text-midnight hover:border-ocean'
            }`}
          >
            <span>Eksplorasi Keahlian</span>
            <Icon name="arrow-right" className="w-4 h-4 text-ocean" />
          </a>

          <a
            href="#contact"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300 hover:-translate-y-0.5 ${
              darkMode
                ? 'border-surface-border bg-surface-card hover:bg-midnight/50 text-pearl hover:border-ocean/60'
                : 'border-surface-lightBorder bg-white hover:bg-gray-50 text-midnight hover:border-ocean'
            }`}
          >
            <span>Hubungi Saya</span>
            <Icon name="mail" className="w-4 h-4 text-ocean" />
          </a>
        </div>

        {/* Social Badges with Real Logos */}
        <div className="flex items-center gap-4 pt-4">
          <a
            href={data.profile.socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-border hover:border-ocean text-ocean text-xs font-semibold transition-all hover:scale-105"
          >
            <Icon name="instagram" className="w-4 h-4" />
            <span>Instagram</span>
          </a>
          <a
            href={data.profile.socials[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-border hover:border-ocean text-ocean text-xs font-semibold transition-all hover:scale-105"
          >
            <Icon name="tiktok" className="w-4 h-4" />
            <span>TikTok</span>
          </a>
        </div>

      </div>
    </section>
  );
}

// ==================== ABOUT ME SECTION ====================
function AboutSection({ data, darkMode }) {
  return (
    <section id="about" className={`py-24 border-t ${
      darkMode ? 'border-surface-border/50 bg-surface-darker/60' : 'border-surface-lightBorder/60 bg-surface-light/40'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-ocean bg-ocean/10 border border-ocean/30 mb-3">
            {data.about.badge}
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? 'text-pearl' : 'text-midnight'
          }`}>
            {data.about.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-ocean to-midnight mx-auto rounded-full"></div>
        </div>

        {/* Content Box */}
        <div className={`p-8 sm:p-12 rounded-3xl border shadow-xl ${
          darkMode ? 'bg-surface-card border-surface-border' : 'bg-white border-surface-lightBorder'
        }`}>
          <div className="space-y-6">
            {data.about.paragraphs.map((p, idx) => (
              <p key={idx} className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-pearl/85' : 'text-midnight/85'
              }`}>
                {p}
              </p>
            ))}
          </div>

          <div className={`mt-8 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            darkMode ? 'border-surface-border/60' : 'border-surface-lightBorder'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ocean/20 text-ocean flex items-center justify-center">
                <Icon name="map-pin" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-ocean font-mono uppercase">Domisili</p>
                <p className="text-sm font-bold">{data.profile.location}</p>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ocean hover:underline"
            >
              <span>Hubungi Saya</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==================== SKILLS & TECHNOLOGIES SECTION ====================
function SkillsSection({ data, darkMode }) {
  const [selectedCat, setSelectedCat] = useState(data.skills.categories[0].id);

  const activeCategory = data.skills.categories.find(c => c.id === selectedCat) || data.skills.categories[0];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-ocean bg-ocean/10 border border-ocean/30 mb-3">
            {data.skills.badge}
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? 'text-pearl' : 'text-midnight'
          }`}>
            {data.skills.title}
          </h2>
          <p className={`text-base sm:text-lg ${
            darkMode ? 'text-pearl/70' : 'text-midnight/70'
          }`}>
            {data.skills.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-ocean to-midnight mx-auto rounded-full mt-4"></div>
        </div>

        {/* Category Pills Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {data.skills.categories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-ocean text-noir border-ocean shadow-lg shadow-ocean/20'
                    : darkMode
                      ? 'bg-surface-card border-surface-border text-pearl/80 hover:text-pearl hover:border-ocean/50'
                      : 'bg-white border-surface-lightBorder text-midnight hover:border-ocean'
                }`}
              >
                <Icon name={cat.icon} className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Detail Card */}
        <div className={`p-6 sm:p-10 rounded-3xl border mb-8 ${
          darkMode ? 'bg-surface-card/60 border-surface-border' : 'bg-white border-surface-lightBorder shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-border/50">
            <div>
              <h3 className={`text-xl sm:text-2xl font-bold flex items-center gap-3 ${
                darkMode ? 'text-pearl' : 'text-midnight'
              }`}>
                <span className="p-2.5 rounded-xl bg-ocean/20 text-ocean">
                  <Icon name={activeCategory.icon} className="w-6 h-6" />
                </span>
                {activeCategory.name}
              </h3>
              <p className={`text-sm mt-1.5 ${
                darkMode ? 'text-pearl/70' : 'text-midnight/70'
              }`}>
                {activeCategory.description}
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-midnight/30 border border-ocean/30 text-ocean w-fit">
              {activeCategory.items.length} Instrumen Utama
            </span>
          </div>

          {/* Skill Progress Bar Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCategory.items.map((skill, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all duration-200 hover:border-ocean/60 ${
                  darkMode ? 'bg-noir/40 border-surface-border' : 'bg-pearl/50 border-surface-lightBorder'
                }`}
              >
                <div className="flex items-center justify-between text-sm font-medium mb-2">
                  <span className={`font-semibold ${
                    darkMode ? 'text-pearl' : 'text-midnight'
                  }`}>
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ocean font-mono">{skill.exp}</span>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-ocean/20 text-ocean">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-2 rounded-full bg-surface-border/40 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-ocean to-midnight rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ==================== EDUCATION SECTION (SD, SMP, SMK Sesuai Permintaan) ====================
function EducationSection({ data, darkMode }) {
  return (
    <section id="education" className={`py-24 border-t ${
      darkMode ? 'border-surface-border/50 bg-surface-darker/60' : 'border-surface-lightBorder/60 bg-surface-light/40'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-ocean bg-ocean/10 border border-ocean/30 mb-3">
            {data.education.badge}
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? 'text-pearl' : 'text-midnight'
          }`}>
            {data.education.title}
          </h2>
          <p className={`text-base sm:text-lg ${
            darkMode ? 'text-pearl/70' : 'text-midnight/70'
          }`}>
            {data.education.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-ocean to-midnight mx-auto rounded-full mt-4"></div>
        </div>

        {/* Education Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-ocean/40 space-y-8">
          {data.education.items.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-ocean border-4 border-noir group-hover:scale-125 transition-transform"></div>
              <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 hover:border-ocean ${
                darkMode ? 'bg-surface-card border-surface-border' : 'bg-white border-surface-lightBorder'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-ocean font-bold px-3 py-1 rounded-full bg-ocean/10 border border-ocean/30">
                    {item.year}
                  </span>
                  <span className="text-xs text-ocean font-mono uppercase tracking-wider flex items-center gap-1">
                    <Icon name="check-circle" className="w-3.5 h-3.5 text-ocean" />
                    {item.status}
                  </span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                  darkMode ? 'text-pearl' : 'text-midnight'
                }`}>
                  {item.institution}
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-pearl/80' : 'text-midnight/80'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ==================== CONTACT SECTION (Tanpa Formulir Kirim Pesan, Logo Asli IG & TikTok) ====================
function ContactSection({ data, darkMode }) {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-ocean bg-ocean/10 border border-ocean/30 mb-3">
            {data.contact.badge}
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? 'text-pearl' : 'text-midnight'
          }`}>
            {data.contact.title}
          </h2>
          <p className={`text-base sm:text-lg ${
            darkMode ? 'text-pearl/70' : 'text-midnight/70'
          }`}>
            {data.contact.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-ocean to-midnight mx-auto rounded-full mt-4"></div>
        </div>

        {/* Focused Contact Cards Grid (Email, Instagram, TikTok, Domisili) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Card Email */}
          <div className={`p-8 rounded-3xl border flex items-start gap-5 transition-all duration-300 hover:border-ocean hover:-translate-y-1 ${
            darkMode ? 'bg-surface-card border-surface-border' : 'bg-white border-surface-lightBorder shadow-md'
          }`}>
            <div className="w-14 h-14 rounded-2xl border border-surface-border/60 flex items-center justify-center shrink-0">
              <Icon name="mail" className="w-7 h-7" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-mono uppercase tracking-wider text-ocean font-bold mb-1">
                Alamat Email
              </p>
              <a
                href={`mailto:${data.contact.info.email}`}
                className="text-base sm:text-lg font-bold hover:underline block truncate"
              >
                {data.contact.info.email}
              </a>
              <p className={`text-xs mt-1 ${darkMode ? 'text-pearl/60' : 'text-midnight/60'}`}>
                Klik untuk mengirim email langsung
              </p>
            </div>
          </div>

          {/* Card Domisili */}
          <div className={`p-8 rounded-3xl border flex items-start gap-5 transition-all duration-300 hover:border-ocean hover:-translate-y-1 ${
            darkMode ? 'bg-surface-card border-surface-border' : 'bg-white border-surface-lightBorder shadow-md'
          }`}>
            <div className="w-14 h-14 rounded-2xl border border-surface-border/60 flex items-center justify-center shrink-0">
              <Icon name="map-pin" className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-ocean font-bold mb-1">
                Domisili
              </p>
              <p className="text-base sm:text-lg font-bold">
                {data.contact.info.location}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-pearl/60' : 'text-midnight/60'}`}>
                Jawa Barat, Indonesia
              </p>
            </div>
          </div>

          {/* Card Instagram */}
          <a
            href={data.contact.info.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-3xl border flex items-start gap-5 transition-all duration-300 hover:border-ocean hover:-translate-y-1 group ${
              darkMode ? 'bg-surface-card border-surface-border' : 'bg-white border-surface-lightBorder shadow-md'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl border border-surface-border/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Icon name="instagram" className="w-7 h-7" />
            </div>
            <div className="overflow-hidden flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono uppercase tracking-wider text-ocean font-bold mb-1">
                  Instagram Resmi
                </p>
                <Icon name="external-link" className="w-4 h-4 text-ocean" />
              </div>
              <p className="text-base sm:text-lg font-bold group-hover:underline truncate">
                @{data.contact.info.instagram}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-pearl/60' : 'text-midnight/60'}`}>
                Buka profil Instagram
              </p>
            </div>
          </a>

          {/* Card TikTok */}
          <a
            href={data.contact.info.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-3xl border flex items-start gap-5 transition-all duration-300 hover:border-ocean hover:-translate-y-1 group ${
              darkMode ? 'bg-surface-card border-surface-border' : 'bg-white border-surface-lightBorder shadow-md'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl border border-surface-border/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Icon name="tiktok" className="w-7 h-7" />
            </div>
            <div className="overflow-hidden flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono uppercase tracking-wider text-ocean font-bold mb-1">
                  TikTok Resmi
                </p>
                <Icon name="external-link" className="w-4 h-4 text-ocean" />
              </div>
              <p className="text-base sm:text-lg font-bold group-hover:underline truncate">
                {data.contact.info.tiktok}
              </p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-pearl/60' : 'text-midnight/60'}`}>
                Buka profil TikTok
              </p>
            </div>
          </a>

        </div>

        {/* Quick Email Direct CTA Banner */}
        <div className={`p-8 rounded-3xl border text-center ${
          darkMode ? 'bg-midnight/30 border-surface-border' : 'bg-pearl border-surface-lightBorder'
        }`}>
          <h3 className="text-xl font-bold mb-2">Ingin Berdiskusi Seputar Proyek?</h3>
          <p className={`text-sm mb-6 max-w-lg mx-auto ${darkMode ? 'text-pearl/75' : 'text-midnight/75'}`}>
            Kirimkan pesan melalui email atau kunjungi media sosial Instagram & TikTok saya untuk terhubung langsung.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${data.contact.info.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ocean hover:bg-ocean/90 text-noir font-bold text-sm shadow-lg shadow-ocean/20 transition-all hover:-translate-y-0.5"
            >
              <Icon name="mail" className="w-4 h-4" />
              <span>Kirim Email Langsung</span>
            </a>
            <a
              href={data.contact.info.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-ocean/40 hover:border-ocean text-ocean font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              <Icon name="instagram" className="w-4 h-4" />
              <span>DM Instagram</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==================== FOOTER COMPONENT ====================
function Footer({ data, darkMode }) {
  return (
    <footer className={`border-t py-12 ${
      darkMode ? 'border-surface-border bg-noir text-pearl' : 'border-surface-lightBorder bg-pearl text-midnight'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-surface-border/40">
          
          {/* Identity (Text only, no logo) */}
          <div className="text-center md:text-left">
            <p className="font-bold text-base sm:text-lg">{data.profile.name}</p>
            <p className="text-xs text-ocean font-mono mt-0.5">
              Photographer • Videographer • Playback Engineer • {data.profile.location}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <a href="#hero" className="hover:text-ocean transition-colors">Beranda</a>
            <a href="#about" className="hover:text-ocean transition-colors">Tentang</a>
            <a href="#skills" className="hover:text-ocean transition-colors">Keahlian</a>
            <a href="#education" className="hover:text-ocean transition-colors">Pendidikan</a>
            <a href="#contact" className="hover:text-ocean transition-colors">Kontak</a>
            <a href="tugas-sistem-operasi.html" className="text-ocean hover:underline font-semibold transition-colors">Tugas Sistem Operasi</a>
          </div>

          {/* Social Links dengan Logo Instagram & TikTok */}
          <div className="flex items-center gap-3">
            <a
              href={data.contact.info.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 border-surface-border hover:border-ocean text-ocean transition-all hover:scale-105"
              title="Instagram"
            >
              <Icon name="instagram" className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href={data.contact.info.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 border-surface-border hover:border-ocean text-ocean transition-all hover:scale-105"
              title="TikTok"
            >
              <Icon name="tiktok" className="w-4 h-4" />
              <span>TikTok</span>
            </a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-center sm:text-left text-ocean/80">
          <p>© {new Date().getFullYear()} {data.profile.name}. Seluruh hak cipta dilindungi.</p>
          <p className="font-mono">Palet: Midnight (#122C4F), Noir (#000000), Pearl (#FBF9E4) & Ocean (#5B88B2).</p>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN ROOT APP ====================
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const data = window.PORTFOLIO_DATA;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('theme-light');
      document.body.className = "bg-noir text-pearl font-sans antialiased selection:bg-ocean selection:text-noir transition-colors duration-300";
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('theme-light');
      document.body.className = "bg-pearl text-midnight font-sans antialiased selection:bg-ocean selection:text-noir transition-colors duration-300";
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-ocean selection:text-noir">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow">
        <HeroSection data={data} darkMode={darkMode} />
        <AboutSection data={data} darkMode={darkMode} />
        <SkillsSection data={data} darkMode={darkMode} />
        <EducationSection data={data} darkMode={darkMode} />
        <ContactSection data={data} darkMode={darkMode} />
      </main>
      <Footer data={data} darkMode={darkMode} />
    </div>
  );
}

// Render root React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
