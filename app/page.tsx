"use client";

import { useEffect, useState } from "react";
import {
  Bell, ChevronDown, Gift, Home, Menu, MessageCircle, Search,
  UserRound, Wallet, Zap, Trophy, X, Gamepad2, LogOut, Play
} from "lucide-react";

type Game = {
  name: string;
  emoji: string;
  tone: string;
  tag: string;
  description: string;
};

const games: Game[] = [
  { name: "Fortune Tiger", emoji: "🐯", tone: "orange", tag: "PG", description: "Jogue uma rodada demonstrativa do Fortune Tiger." },
  { name: "Fortune Rabbit", emoji: "🐰", tone: "pink", tag: "PG", description: "Entre na sala demonstrativa do Fortune Rabbit." },
  { name: "Fortune Dragon", emoji: "🐲", tone: "purple", tag: "PG", description: "Teste a experiência demonstrativa do Fortune Dragon." },
  { name: "Fortune Ox", emoji: "🐂", tone: "gold", tag: "PG", description: "Abra o jogo e veja a tela de partida." },
  { name: "Lucky Panda", emoji: "🐼", tone: "blue", tag: "HOT", description: "Jogue a versão demonstrativa do Lucky Panda." },
  { name: "Candy Boom", emoji: "🍬", tone: "pink", tag: "NEW", description: "Abra o Candy Boom em modo demonstração." },
  { name: "Golden Fish", emoji: "🐠", tone: "cyan", tag: "PG", description: "Entre no Golden Fish para jogar a demonstração." },
  { name: "Magic Gems", emoji: "💎", tone: "violet", tag: "HOT", description: "Abra o Magic Gems e comece a demonstração." }
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
  const [auth, setAuth] = useState<"login" | "register" | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("arcade-user"));
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const doLogout = () => {
    localStorage.removeItem("arcade-user");
    setUser(null);
    setMenuOpen(false);
    notify("Você saiu da sua conta.");
  };

  const filteredGames = games.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {user ? (
            <button className="user-pill" onClick={() => setMenuOpen(true)}>
              <UserRound size={16} /> {user}
            </button>
          ) : (
            <>
              <button className="login-btn" onClick={() => setAuth("login")}>ENTRAR</button>
              <button className="register-btn" onClick={() => setAuth("register")}>REGISTRO</button>
            </>
          )}
          <button className="icon-btn search-btn" onClick={() => setSearchOpen(v => !v)} aria-label="Buscar">
            <Search size={26} />
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel">
          <Search size={20} />
          <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar jogo..." />
          <button onClick={() => { setSearch(""); setSearchOpen(false); }}><X size={20} /></button>
        </div>
      )}

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">CONVIDE 1 AMIGO</span>
          <h1>Ganhe até <strong>R$ 50</strong></h1>
          <p>Entre na sua conta para acessar seu perfil e os jogos.</p>
          <button onClick={() => user ? notify("Promoção disponível no seu perfil.") : setAuth("login")}>
            {user ? "VER PROMOÇÃO" : "ENTRAR AGORA"}
          </button>
        </div>
        <div className="hero-art">🎁</div>
        <div className="spark s1">✦</div><div className="spark s2">✦</div><div className="spark s3">✧</div>
      </section>

      <section className="promo-grid">
        <PromoCard icon="🎰" title="Recompensas" value="ATÉ R$ 777" />
        <PromoCard icon="💎" title="Bônus diário" value="30% CASHBACK" />
        <PromoCard icon="🐉" title="Arcade VIP" value="R$ 60,00" />
        <PromoCard icon="🪙" title="Bônus semanal" value="40% EXTRA" />
      </section>

      <div className="ticker">
        <MessageCircle size={19} />
        <span>Novidades e promoções • Escolha um jogo para abrir a tela de partida</span>
      </div>

      <section className="category-bar">
        {categories.map(category => (
          <button key={category.label} className={active === category.label ? "category active" : "category"} onClick={() => setActive(category.label)}>
            <span className="category-icon">{category.icon}</span><span>{category.label}</span>
          </button>
        ))}
      </section>

      <section className="games-section">
        <div className="section-heading">
          <div><span className="flame">🔥</span><h2>{active}</h2></div>
          <button onClick={() => setSearchOpen(true)}>Todos <span>{filteredGames.length} jogos</span></button>
        </div>

        <div className="games-grid">
          {filteredGames.map(game => (
            <button className={`game-card ${game.tone}`} key={game.name} onClick={() => setSelectedGame(game)}>
              <span className="game-tag">{game.tag}</span>
              <span className="game-emoji">{game.emoji}</span>
              <strong>{game.name}</strong>
              <small>▶ JOGAR</small>
            </button>
          ))}
        </div>
      </section>

      <div className="mystery">
        <div className="mystery-icon">🎁</div>
        <div><strong>Caixa surpresa</strong><span>Próxima rodada em 00:55:43</span></div>
      </div>

      <div className="support" onClick={() => notify("Suporte: em breve.")}><MessageCircle size={29} /></div>

      <nav className="bottom-nav">
        <NavItem icon={<Home />} label="Início" active onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        <NavItem icon={<Gift />} label="Promoção" onClick={() => notify("Promoções em breve.")} />
        <NavItem icon={<Wallet />} label="Carteira" center onClick={() => user ? notify("Carteira: em breve.") : setAuth("login")} />
        <NavItem icon={<Zap />} label="Jogos" onClick={() => document.querySelector(".games-section")?.scrollIntoView({ behavior: "smooth" })} />
        <NavItem icon={<UserRound />} label="Perfil" onClick={() => user ? setMenuOpen(true) : setAuth("login")} />
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
              <div>
                <strong>{user || "Visitante"}</strong>
                <span>{user ? "Conta conectada" : "Entre para acessar seu perfil"}</span>
              </div>
            </div>

            {["Início", "Jogos", "Promoções", "Torneios", "Ajuda"].map(item => (
              <button className="drawer-link" key={item} onClick={() => {
                setMenuOpen(false);
                if (item === "Jogos") document.querySelector(".games-section")?.scrollIntoView({ behavior: "smooth" });
                else notify(`${item}: seção em construção.`);
              }}>
                <Gamepad2 size={20} /> {item} <ChevronDown size={17} />
              </button>
            ))}

            {user ? (
              <button className="drawer-link logout" onClick={doLogout}><LogOut size={20} /> Sair</button>
            ) : (
              <button className="drawer-link" onClick={() => { setMenuOpen(false); setAuth("login"); }}><UserRound size={20} /> Entrar / Criar conta</button>
            )}
          </aside>
        </div>
      )}

      {auth && (
        <AuthModal
          mode={auth}
          onClose={() => setAuth(null)}
          onSuccess={(name) => {
            localStorage.setItem("arcade-user", name);
            setUser(name);
            setAuth(null);
            notify(`Bem-vindo, ${name}!`);
          }}
        />
      )}

      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

function AuthModal({ mode, onClose, onSuccess }: { mode: "login" | "register"; onClose: () => void; onSuccess: (name: string) => void }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || password.length < 4) {
      alert("Preencha o nome e uma senha com pelo menos 4 caracteres.");
      return;
    }
    onSuccess(name.trim());
  };

  return (
    <div className="modal-backdrop">
      <form className="auth-modal" onSubmit={submit}>
        <button type="button" className="modal-close" onClick={onClose}><X /></button>
        <div className="auth-icon"><UserRound size={28} /></div>
        <h2>{mode === "login" ? "Entrar na Arcade" : "Criar sua conta"}</h2>
        <p>{mode === "login" ? "Acesse seu perfil e continue jogando." : "Crie seu perfil para começar."}</p>
        <label>Usuário<input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" autoFocus /></label>
        <label>Senha<input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" /></label>
        <button className="auth-submit" type="submit">{mode === "login" ? "ENTRAR" : "CRIAR CONTA"}</button>
        <small>Modo demonstração: os dados ficam somente neste navegador.</small>
      </form>
    </div>
  );
}

function GameModal({ game, onClose }: { game: Game; onClose: () => void }) {
  return (
    <div className="modal-backdrop">
      <div className={`game-modal ${game.tone}`}>
        <button className="modal-close" onClick={onClose}><X /></button>
        <div className="game-big-emoji">{game.emoji}</div>
        <span className="game-tag">{game.tag}</span>
        <h2>{game.name}</h2>
        <p>{game.description}</p>
        <div className="fake-game">
          <div className="fake-game-top"><span>ARCADE.PLAY</span><span>CRÉDITOS 100</span></div>
          <div className="slots">
            <span>{game.emoji}</span><span>⭐</span><span>💎</span>
          </div>
          <button className="play-now" onClick={() => alert("Demonstração iniciada!")}><Play size={20} fill="currentColor" /> JOGAR DEMO</button>
        </div>
        <small className="demo-note">Esta é uma demonstração visual. Não há apostas ou dinheiro real.</small>
      </div>
    </div>
  );
}

function PromoCard({ icon, title, value }: { icon: string; title: string; value: string }) {
  return <button className="promo-card"><span>{icon}</span><div><small>{title}</small><strong>{value}</strong></div></button>;
}

function NavItem({ icon, label, active, center, onClick }: { icon: React.ReactNode; label: string; active?: boolean; center?: boolean; onClick?: () => void }) {
  return <button className={`nav-item ${active ? "nav-active" : ""} ${center ? "nav-center" : ""}`} onClick={onClick}><span>{icon}</span><small>{label}</small></button>;
}
