import { useEffect, useMemo, useState } from "react";
import Brand from "./components/Brand.jsx";
import ConceptCard from "./components/ConceptCard.jsx";
import DemoPanel from "./components/DemoPanel.jsx";
import { concepts } from "./data/concepts.js";

const STORAGE_KEY = "react-em-campo-progress";
const categories = ["Tudo", ...new Set(concepts.map((concept) => concept.category))];
const conceptTotal = String(concepts.length).padStart(2, "0");

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((id) => concepts.some((concept) => concept.id === id)) : [];
  } catch (error) {
    console.error("Não foi possível ler o progresso salvo.", error);
    return [];
  }
}

function Header({ onHome, onProgress, learnedCount }) {
  return (
    <header className="site-header">
      <Brand onHome={onHome} />
      <div className="header-note"><span className="header-pulse" /> caderno de interfaces reativas</div>
      <button className="header-progress" onClick={onProgress}>
        <span>progresso</span>
        <strong>{String(learnedCount).padStart(2, "0")}<small> / {conceptTotal}</small></strong>
      </button>
    </header>
  );
}

function Hero({ learnedCount }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow"><span>FRONT-END · AULA 08</span><span className="eyebrow-line" /></p>
        <h1>Interfaces<br />em <em>movimento.</em></h1>
        <p className="hero-description">
          Onze ideias para entender como o React pensa — com espaço para experimentar cada uma delas.
        </p>
        <a className="hero-link" href="#conceitos">Entrar no laboratório <span>↓</span></a>
      </div>
      <div className="hero-visual" aria-label="Ilustração abstrata de uma interface em camadas">
        <div className="visual-topline"><span>FIG. 08 — ÁRVORE DE INTERFACE</span><span>● LIVE</span></div>
        <div className="orbit orbit--outer" />
        <div className="orbit orbit--inner" />
        <div className="visual-core"><span>R</span><i>↗</i></div>
        <span className="orbit-label orbit-label--one">estado</span>
        <span className="orbit-label orbit-label--two">componente</span>
        <span className="orbit-label orbit-label--three">interface</span>
        <div className="visual-caption">
          <span>01—{conceptTotal}</span>
          <span>{learnedCount === concepts.length ? "Caderno completo." : `${concepts.length - learnedCount} ideias esperando por você.`}</span>
        </div>
      </div>
      <div className="hero-bottom"><span>UM GUIA VISUAL E INTERATIVO</span><span>ROLE PARA EXPLORAR&nbsp; ↘</span></div>
    </section>
  );
}

function Catalog({ learned, onOpen, onToggleLearned }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tudo");
  const [showLearned, setShowLearned] = useState(false);

  const filteredConcepts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return concepts.filter((concept) => {
      const matchesCategory = category === "Tudo" || concept.category === category;
      const searchableText = `${concept.title} ${concept.short} ${concept.category} ${concept.description}`.toLocaleLowerCase("pt-BR");
      const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesProgress = !showLearned || learned.includes(concept.id);
      return matchesCategory && matchesSearch && matchesProgress;
    });
  }, [category, learned, query, showLearned]);

  return (
    <section className="catalog" id="conceitos">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span>O MAPA</span><span className="eyebrow-line" /></p>
          <h2>{concepts.length} peças.<br /><em>Um jeito novo de pensar.</em></h2>
        </div>
        <p className="section-aside">Passe o mouse, escolha um tema e mexa no que aparece. É assim que a teoria começa a fazer sentido.</p>
      </div>
      <div className="catalog-tools">
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar um conceito..."
            aria-label="Buscar conceitos"
          />
          {query && <button onClick={() => setQuery("")} aria-label="Limpar busca">×</button>}
        </label>
        <div className="category-filters" aria-label="Filtrar por categoria">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "is-active" : ""}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          className={`learned-filter ${showLearned ? "is-active" : ""}`}
          onClick={() => setShowLearned((current) => !current)}
          aria-pressed={showLearned}
        >
          ✓ <span>meu caderno</span>
        </button>
      </div>
      {filteredConcepts.length > 0 ? (
        <div className="concept-grid">
          {filteredConcepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              index={concepts.findIndex((item) => item.id === concept.id)}
              isLearned={learned.includes(concept.id)}
              onOpen={onOpen}
              onToggleLearned={onToggleLearned}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <span>∅</span>
          <p>{showLearned ? "Seu caderno ainda está vazio." : "Nenhum conceito encontrado."}</p>
          <button onClick={() => { setQuery(""); setCategory("Tudo"); setShowLearned(false); }}>Ver todos os conceitos</button>
        </div>
      )}
      <p className="catalog-count">
        <span>{String(filteredConcepts.length).padStart(2, "0")} REGISTROS</span>
        <span>Marque ✓ para guardar um conceito no seu caderno.</span>
      </p>
    </section>
  );
}

function ConceptDetail({ concept, learned, onBack, onToggleLearned, onNext }) {
  return (
    <main className="detail-view">
      <button className="back-link" onClick={onBack}>← voltar ao mapa</button>
      <div className="detail-heading">
        <div>
          <p className="eyebrow"><span>{concept.category.toUpperCase()} · CADERNO {concept.number}</span></p>
          <h1>{concept.title}<span className="title-period">.</span></h1>
          <p className="detail-description">{concept.description}</p>
        </div>
        <button
          className={`detail-save ${learned ? "is-saved" : ""}`}
          onClick={() => onToggleLearned(concept.id)}
          aria-pressed={learned}
        >
          <span>{learned ? "✓" : "+"}</span>{learned ? "No meu caderno" : "Guardar no caderno"}
        </button>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <DemoPanel conceptId={concept.id} />
          <div className="takeaway"><span>ANOTE ISSO</span><p>{concept.takeaway}</p><b>✳</b></div>
        </div>
        <aside className="code-note">
          <div className="code-note-heading"><span>UM POUCO DE CÓDIGO</span><span>JSX</span></div>
          <pre><code>{concept.code}</code></pre>
          <div className="code-note-footer"><span>LEIA. EXPERIMENTE. MUDE.</span><span>↙</span></div>
        </aside>
      </div>
      <nav className="detail-pagination" aria-label="Navegar pelos conceitos">
        <span>{concept.number} / {conceptTotal}</span>
        <button onClick={() => onNext(-1)} disabled={concepts[0].id === concept.id}>← anterior</button>
        <button onClick={() => onNext(1)} disabled={concepts.at(-1).id === concept.id}>próximo →</button>
      </nav>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Brand onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      <span>feito para aprender fazendo · senai</span>
      <a href="https://react.dev" target="_blank" rel="noreferrer">continuar explorando ↗</a>
    </footer>
  );
}

export default function App() {
  const [learned, setLearned] = useState(readProgress);
  const [selectedId, setSelectedId] = useState(null);
  const selectedConcept = concepts.find((concept) => concept.id === selectedId);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(learned));
    } catch (error) {
      console.error("Não foi possível salvar o progresso.", error);
    }
  }, [learned]);

  useEffect(() => {
    if (!selectedConcept) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape") setSelectedId(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedConcept]);

  function toggleLearned(id) {
    setLearned((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function returnHome() {
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showCatalog() {
    setSelectedId(null);
    requestAnimationFrame(() => document.getElementById("conceitos")?.scrollIntoView({ behavior: "smooth" }));
  }

  function navigateConcept(direction) {
    const currentIndex = concepts.findIndex((concept) => concept.id === selectedId);
    const nextConcept = concepts[currentIndex + direction];
    if (nextConcept) {
      setSelectedId(nextConcept.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="app-shell">
      <Header onHome={returnHome} onProgress={showCatalog} learnedCount={learned.length} />
      {selectedConcept ? (
        <ConceptDetail
          concept={selectedConcept}
          learned={learned.includes(selectedConcept.id)}
          onBack={returnHome}
          onToggleLearned={toggleLearned}
          onNext={navigateConcept}
        />
      ) : (
        <>
          <Hero learnedCount={learned.length} />
          <Catalog learned={learned} onOpen={setSelectedId} onToggleLearned={toggleLearned} />
          <section className="closing-note">
            <span className="closing-mark">✳</span>
            <p>Aprender React não é decorar sintaxe.<br /><em>É mudar o jeito de construir interfaces.</em></p>
            <a href="https://react.dev/learn" target="_blank" rel="noreferrer">Próxima parada: React.dev ↗</a>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
}
