import { useState } from "react";

function JsxDemo() {
  const [name, setName] = useState("Lia");

  return (
    <div className="demo-stack">
      <label className="field-label" htmlFor="name-input">Seu nome para o JSX</label>
      <input
        id="name-input"
        className="text-field"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={24}
        placeholder="Digite seu nome"
      />
      <div className="demo-output demo-greeting">
        <span className="output-label">SAÍDA DO COMPONENTE</span>
        <p>Olá, <strong>{name.trim() || "pessoa curiosa"}</strong>.<br />Que bom ter você por aqui.</p>
        <span className="output-code">{"<Saudacao nome={nome} />"}</span>
      </div>
    </div>
  );
}

function ComponentDemo() {
  const [pieces, setPieces] = useState([
    { id: "header", title: "Cabeçalho" },
    { id: "content", title: "Conteúdo" },
    { id: "footer", title: "Rodapé" },
  ]);

  return (
    <div className="component-demo">
      <div className="component-tree" aria-label="Árvore de componentes de exemplo">
        <div className="tree-root">Página</div>
        <div className="tree-children">
          {pieces.map((piece, index) => (
            <div className="tree-piece" key={piece.id}>
              <span className="tree-connector" />
              <span className={`tree-leaf tree-leaf--${index + 1}`}>{piece.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="component-demo-actions">
        <p>A árvore cresce com pequenos componentes reutilizáveis.</p>
        <button
          className="small-action"
          onClick={() => setPieces((current) => current.some((piece) => piece.id === "card") ? current : [...current.slice(0, 2), { id: "card", title: "Cartão" }, ...current.slice(2)])}
          disabled={pieces.some((piece) => piece.id === "card")}
        >
          {pieces.some((piece) => piece.id === "card") ? "Cartão adicionado ✓" : "Adicionar um cartão +"}
        </button>
      </div>
    </div>
  );
}

function PropsDemo() {
  const profiles = [
    { name: "Lia", role: "Coleciona boas ideias", color: "orange", initials: "L." },
    { name: "Caio", role: "Transforma café em código", color: "blue", initials: "C." },
    { name: "Nina", role: "Curiosa por natureza", color: "green", initials: "N." },
  ];
  const [profile, setProfile] = useState(0);
  const current = profiles[profile];

  return (
    <div className="props-demo">
      <div className={`profile-card profile-card--${current.color}`}>
        <span className="profile-avatar">{current.initials}</span>
        <span className="output-label">RECEBIDO VIA PROPS</span>
        <strong>{current.name}</strong>
        <span>{current.role}</span>
        <code>{`<Perfil nome="${current.name}" />`}</code>
      </div>
      <div className="profile-switcher">
        <p>Um componente, três conjuntos de dados.</p>
        <div className="avatar-options" aria-label="Escolher perfil de exemplo">
          {profiles.map((item, index) => (
            <button
              key={item.name}
              className={`avatar-option ${profile === index ? "is-active" : ""}`}
              onClick={() => setProfile(index)}
              aria-label={`Exibir perfil de ${item.name}`}
              aria-pressed={profile === index}
            >
              {item.initials}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VirtualDomDemo() {
  const [count, setCount] = useState(0);
  const [lastChange, setLastChange] = useState("O estado está quietinho.");

  function updateCount(amount) {
    const next = count + amount;
    setCount(next);
    setLastChange(`React percebeu: ${count} → ${next}`);
  }

  return (
    <div className="counter-demo">
      <span className="output-label">ESTADO ATUAL</span>
      <div className="counter-number" aria-live="polite">{String(count).padStart(2, "0")}</div>
      <p className="counter-note">{lastChange}</p>
      <div className="counter-controls">
        <button onClick={() => updateCount(-1)} aria-label="Diminuir contador">−</button>
        <span>passos</span>
        <button onClick={() => updateCount(1)} aria-label="Aumentar contador">+</button>
      </div>
      <button className="reset-button" onClick={() => { setCount(0); setLastChange("Contador reiniciado."); }}>
        começar de novo
      </button>
    </div>
  );
}

function ListsDemo() {
  const starterItems = [
    { id: 1, text: "Esboçar componentes", done: true },
    { id: 2, text: "Passar as primeiras props", done: false },
    { id: 3, text: "Dar vida à interface", done: false },
  ];
  const [items, setItems] = useState(starterItems);
  const [filter, setFilter] = useState("Tudo");

  const visibleItems = items.filter((item) => {
    if (filter === "Pendentes") return !item.done;
    if (filter === "Feitos") return item.done;
    return true;
  });

  function toggleItem(id) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  }

  function addItem() {
    const nextId = Math.max(0, ...items.map((item) => item.id)) + 1;
    setItems((current) => [...current, { id: nextId, text: `Novo experimento ${nextId - 3}`, done: false }]);
  }

  return (
    <div className="list-demo">
      <div className="list-toolbar">
        <div className="list-filters" aria-label="Filtrar tarefas">
          {["Tudo", "Pendentes", "Feitos"].map((option) => (
            <button
              key={option}
              className={filter === option ? "is-active" : ""}
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
            >
              {option}
            </button>
          ))}
        </div>
        <button className="small-action" onClick={addItem}>+ tarefa</button>
      </div>
      {visibleItems.length > 0 ? (
        <ul className="task-list">
          {visibleItems.map((item) => (
            <li key={item.id}>
              <button className={`task-row ${item.done ? "is-done" : ""}`} onClick={() => toggleItem(item.id)}>
                <span className="task-check" aria-hidden="true">{item.done ? "✓" : ""}</span>
                <span>{item.text}</span>
                <code>key: {item.id}</code>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-list">Nada por aqui neste filtro. Experimente outra aba.</p>
      )}
      <p className="list-footnote">Cada item tem um id único, usado como sua <code>key</code>.</p>
    </div>
  );
}

function ConditionalDemo() {
  const states = ["Pronto", "Carregando", "Vazio", "Erro"];
  const [state, setState] = useState("Pronto");

  return (
    <div className="conditional-demo">
      <div className="state-tabs" aria-label="Simular um estado">
        {states.map((option) => (
          <button
            key={option}
            className={state === option ? "is-active" : ""}
            onClick={() => setState(option)}
            aria-pressed={state === option}
          >
            {option}
          </button>
        ))}
      </div>
      <div className={`state-output state-output--${state.toLowerCase()}`} aria-live="polite">
        {state === "Pronto" && <>
          <span className="state-symbol">✓</span>
          <div><strong>Seu espaço está pronto.</strong><p>Os dados chegaram e a página pode mostrá-los.</p></div>
        </>}
        {state === "Carregando" && <>
          <span className="state-spinner" aria-hidden="true" />
          <div><strong>Buscando novidades…</strong><p>Enquanto espera, a interface continua explicando o que acontece.</p></div>
        </>}
        {state === "Vazio" && <>
          <span className="state-symbol">∅</span>
          <div><strong>Nenhum resultado por enquanto.</strong><p>Tente ajustar os filtros e faça uma nova busca.</p></div>
        </>}
        {state === "Erro" && <>
          <span className="state-symbol">!</span>
          <div><strong>Algo saiu do roteiro.</strong><p>Uma mensagem clara ajuda a pessoa a encontrar o próximo passo.</p></div>
        </>}
      </div>
      <p className="conditional-note">Mesmo componente, quatro respostas possíveis para o estado.</p>
    </div>
  );
}

function StateDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="simple-demo">
      <span className="output-label">ESTADO ATUAL</span>
      <strong className="demo-big-number">{count}</strong>
      <p>O valor muda e a interface acompanha a atualização.</p>
      <div className="demo-actions">
        <button className="small-action" onClick={() => setCount((value) => Math.max(0, value - 1))}>− diminuir</button>
        <button className="small-action" onClick={() => setCount((value) => value + 1)}>+ aumentar</button>
      </div>
    </div>
  );
}

function FormDemo() {
  const [name, setName] = useState("");
  return (
    <div className="simple-demo">
      <label className="field-label" htmlFor="form-name">Seu nome</label>
      <input id="form-name" className="text-field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Digite para validar" />
      <p className="demo-feedback">{name.trim() ? `Olá, ${name.trim()}! Formulário válido.` : "Digite pelo menos um nome para continuar."}</p>
    </div>
  );
}

function EffectDemo() {
  const [visits, setVisits] = useState(0);
  return (
    <div className="simple-demo">
      <span className="output-label">EFEITO SINCRONIZADO</span>
      <p className="demo-feedback">O título da página poderia acompanhar este contador.</p>
      <button className="small-action" onClick={() => setVisits((value) => value + 1)}>Registrar visita ({visits})</button>
    </div>
  );
}

function ApiDemo() {
  const [status, setStatus] = useState("idle");
  function loadData() {
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 700);
  }
  return (
    <div className="simple-demo">
      <span className="output-label">RESPOSTA DA API</span>
      <p className="demo-feedback">
        {status === "idle" && "Clique para simular uma busca."}
        {status === "loading" && "Carregando dados…"}
        {status === "success" && "✓ 11 conceitos encontrados."}
      </p>
      <button className="small-action" onClick={loadData} disabled={status === "loading"}>Buscar conceitos</button>
    </div>
  );
}

function RouterDemo() {
  const [route, setRoute] = useState("/");
  return (
    <div className="simple-demo">
      <div className="route-tabs">
        {["/", "/aulas", "/sobre"].map((item) => (
          <button key={item} className={route === item ? "is-active" : ""} onClick={() => setRoute(item)}>{item}</button>
        ))}
      </div>
      <p className="demo-feedback">Rota atual: <strong>{route}</strong></p>
    </div>
  );
}

const demos = {
  jsx: JsxDemo,
  componentes: ComponentDemo,
  props: PropsDemo,
  "virtual-dom": VirtualDomDemo,
  listas: ListsDemo,
  condicional: ConditionalDemo,
  state: StateDemo,
  formularios: FormDemo,
  "use-effect": EffectDemo,
  apis: ApiDemo,
  "react-router": RouterDemo,
};

export default function DemoPanel({ conceptId }) {
  const Demo = demos[conceptId] || StateDemo;
  return (
    <section className={`demo-panel demo-panel--${conceptId}`} aria-label={`Experimento de ${conceptId}`}>
      <div className="demo-heading">
        <span className="demo-dot" />
        <span>experimento interativo</span>
        <span className="demo-live">ao vivo</span>
      </div>
      <Demo />
    </section>
  );
}
