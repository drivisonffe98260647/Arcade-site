"use client";

import { useState } from "react";
import {
  Bell, ChevronDown, Gift, Home, Menu, MessageCircle, Search,
  UserRound, Wallet, Zap, Trophy, X, Star, Gamepad2
} from "lucide-react";

const games = [
  { name: "Fortune Tiger", emoji: "🐯", tone: "orange", tag: "PG" },
  { name: "Fortune Rabbit", emoji: "🐰", tone: "pink", tag: "PG" },
  { name: "Fortune Dragon", emoji: "🐲", tone: "purple", tag: "PG" },
  { name: "Fortune Ox", emoji: "🐂", tone: "gold", tag: "PG" },
  { name: "Lucky Panda", emoji: "🐼", tone: "blue", tag: "HOT" },
  { name: "Candy Boom", emoji: "🍬", tone: "pink", tag: "NEW" },
  { name: "Golden Fish", emoji: "🐠", tone: "cyan", tag: "PG" },
  { name: "Magic Gems", emoji: "💎", tone: "violet", tag: "HOT" }
];

const categories = [
  { label: "Popular", icon: "🔥" },
  { label: "PG", icon: "PG" },
  { label: "Arcade", icon: "⚡" },
  { label: "Torneios", icon: "🏆" }
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState("Popular");
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="icon-btn" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
          <Menu size={30} />
        </button>

        <div className="brand">
          <span className="brand-main">ARCADE</span>
          <span className="brand-dot">.PLAY</span>
        </div>

        <div className="top-actions">
          <button className="login-btn" onClick={() => notify("Demo: tela de login")}>ENTRAR</button>
          <button className="register-btn" onClick={() => notify("Demo: tela de cadastro")}>REGISTRO</button>
          <button className="icon-btn search-btn" onClick={() => setSearchOpen(v => !v)}>
            <Search size={26} />
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel">
          <Search size={20} />
          <input autoFocus placeholder="Buscar jogo..." />
          <button onClick={() => setSearchOpen(false)}><X size={20} /></button>
        </div>
      )}

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">CONVIDE 1 AMIGO</span>
          <h1>Ganhe até <strong>R$ 50</strong></h1>
          <p>Promoções e recompensas para usuários do demo.</p>
          <button onClick={() => notify("Demo: promoção selecionada")}>VER PROMOÇÃO</button>
        </div>
        <div className="hero-art">🎁</div>
        <div className="spark s1">✦</div>
        <div className="spark s2">✦</div>
        <div className="spark s3">✧</div>
      </section>

      <section className="promo-grid">
        <PromoCard icon="🎰" title="Recompensas" value="ATÉ R$ 777" />
        <PromoCard icon="💎" title="Bônus diário" value="30% CASHBACK" />
        <PromoCard icon="🐉" title="Arcade VIP" value="R$ 60,00" />
        <PromoCard icon="🪙" title="Bônus semanal" value="40% EXTRA" />
      </section>

      <div className="ticker">
        <MessageCircle size={19} />
        <span>Novidades e promoções • Confira os jogos em destaque • Interface demonstrativa</span>
      </div>

      <section className="category-bar">
        {categories.map((category) => (
          <button
            key={category.label}
            className={active === category.label ? "category active" : "category"}
            onClick={() => setActive(category.label)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </section>

      <section className="games-section">
        <div className="section-heading">
          <div>
            <span className="flame">🔥</span>
            <h2>{active}</h2>
          </div>
          <button onClick={() => notify("Demo: mostrando todos os jogos")}>100 <span>Todos</span></button>
        </div>

        <div className="games-grid">
          {games.map((game) => (
            <button
              className={`game-card ${game.tone}`}
              key={game.name}
              onClick={() => notify(`${game.name}: demo selecionado`)}
            >
              <span className="game-tag">{game.tag}</span>
              <span className="game-emoji">{game.emoji}</span>
              <strong>{game.name}</strong>
              <small>JOGAR DEMO</small>
            </button>
          ))}
        </div>
      </section>

      <div className="mystery">
        <div className="mystery-icon">🎁</div>
        <div>
          <strong>Caixa surpresa</strong>
          <span>Próxima rodada em 00:55:43</span>
        </div>
      </div>

      <div className="support" onClick={() => notify("Demo: suporte")}>
        <MessageCircle size={29} />
      </div>

      <nav className="bottom-nav">
        <NavItem icon={<Home />} label="Início" active onClick={() => window.scrollTo({top: 0, behavior: "smooth"})} />
        <NavItem icon={<Gift />} label="Promoção" onClick={() => notify("Demo: promoções")} />
        <NavItem icon={<Wallet />} label="Depósito" center onClick={() => notify("Demo: pagamentos desativados")} />
        <NavItem icon={<Zap />} label="Jogos" onClick={() => document.querySelector(".games-section")?.scrollIntoView({behavior:"smooth"})} />
        <NavItem icon={<UserRound />} label="Perfil" onClick={() => notify("Demo: perfil")} />
      </nav>

      {menuOpen && (
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <aside className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-head">
              <div className="brand"><span className="brand-main">ARCADE</span><span className="brand-dot">.PLAY</span></div>
              <button className="icon-btn" onClick={() => setMenuOpen(false)}><X /></button>
            </div>
            <div className="drawer-user">
              <div className="avatar"><UserRound /></div>
              <div><strong>Visitante</strong><span>Entre para acessar seu perfil</span></div>
            </div>
            {["Início", "Jogos", "Promoções", "Torneios", "Ajuda"].map(item => (
              <button className="drawer-link" key={item} onClick={() => { setMenuOpen(false); notify(`Demo: ${item}`); }}>
                <Gamepad2 size={20} /> {item} <ChevronDown size={17} />
              </button>
            ))}
          </aside>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

function PromoCard({ icon, title, value }: { icon: string; title: string; value: string }) {
  return (
    <button className="promo-card">
      <span>{icon}</span>
      <div><small>{title}</small><strong>{value}</strong></div>
    </button>
  );
}

function NavItem({
  icon, label, active, center, onClick
}: { icon: React.ReactNode; label: string; active?: boolean; center?: boolean; onClick?: () => void }) {
  return (
    <button className={`nav-item ${active ? "nav-active" : ""} ${center ? "nav-center" : ""}`} onClick={onClick}>
      <span>{icon}</span><small>{label}</small>
    </button>
  );
}