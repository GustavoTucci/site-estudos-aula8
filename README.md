# React em campo

## Descrição

**React em campo** é um laboratório visual e interativo para estudar conceitos fundamentais do React na Aula 08 de Front-end. A aplicação apresenta um mapa com 11 temas e permite abrir experimentos práticos para observar como cada conceito altera uma interface.

Em vez de apenas consultar definições, a pessoa pode interagir com os exemplos, testar diferentes estados e acompanhar o próprio progresso de aprendizagem no navegador.

## Funcionalidades

- Catálogo com 11 conceitos de React, organizados por categoria.
- Busca por texto em títulos, descrições e categorias.
- Filtros por categoria e opção para exibir somente os conceitos salvos no caderno.
- Cartões com resumo, categoria, numeração e acesso ao experimento correspondente.
- Página de detalhes para cada conceito, com descrição, demonstração interativa, código de exemplo e resumo principal.
- Experimentos práticos de JSX, composição de componentes, props, Virtual DOM, listas e `keys`, renderização condicional, `state`, formulários, `useEffect`, consumo de APIs e React Router.
- Marcação de conceitos como estudados, com contador de progresso.
- Persistência do progresso no navegador usando `localStorage`.
- Navegação entre conceitos pelos botões “anterior” e “próximo”.
- Atalho `Esc` para sair da página de detalhes e voltar ao mapa.
- Estados vazios para buscas sem resultado e para o caderno ainda não preenchido.
- Layout responsivo para diferentes tamanhos de tela.

## Conceitos utilizados

### Conceitos de React

- **JSX:** sintaxe que permite descrever a estrutura da interface dentro do JavaScript, incluindo expressões entre chaves.
- **Componentes:** divisão da interface em partes reutilizáveis, como cabeçalho, cartões, rodapé e painel de demonstração.
- **Props:** dados e funções enviados de componentes pais para componentes filhos.
- **Virtual DOM e reconciliação:** quando os dados mudam, o React compara a nova descrição da interface com a anterior e aplica as atualizações necessárias no DOM.
- **Listas e `keys`:** uso de `map()` para transformar arrays em elementos JSX e de chaves estáveis para identificar cada item.
- **Renderização condicional:** exibição de conteúdos diferentes conforme o estado da aplicação, os filtros e os resultados da busca.
- **State e `useState`:** armazenamento de informações que mudam durante a interação, como contadores, campos de formulário, filtros e itens concluídos.
- **Formulários controlados:** campos cujo valor é controlado pelo state do React, permitindo validar e responder às entradas da pessoa usuária.
- **`useEffect`:** execução de efeitos após a renderização, como salvar o progresso no navegador e registrar ou remover listeners de teclado.
- **Consumo de APIs:** representação dos estados de carregamento, sucesso e erro ao trabalhar com dados externos.
- **React Router:** conceito de associação entre URLs e componentes para navegação em aplicações de página única (SPA).

### Recursos e padrões usados no projeto

- **`useMemo`:** memorização da lista filtrada de conceitos para evitar cálculos desnecessários durante as renderizações.
- **`localStorage`:** armazenamento local do progresso para que os conceitos marcados continuem salvos após recarregar a página.
- **Composição de componentes:** construção da tela a partir de componentes menores e especializados.
- **Eventos e acessibilidade:** uso de eventos de clique e teclado, `aria-label` e `aria-pressed` para melhorar a interação com os controles.
- **ES Modules:** organização do código em módulos JavaScript com `import` e `export`.

## Tecnologias

- React 19
- React DOM
- Vite
- JavaScript com ES Modules
- HTML semântico
- CSS responsivo

## Como executar

É necessário ter o Node.js 20.19+ ou 22.12+ instalado.

```bash
npm install
npm run dev
```

O Vite informará no terminal o endereço local da aplicação.

Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura principal

```text
src/
├── components/
│   ├── Brand.jsx
│   ├── ConceptCard.jsx
│   └── DemoPanel.jsx
├── data/
│   └── concepts.js
├── App.jsx
├── main.jsx
└── styles.css
```

- [`App.jsx`](./src/App.jsx): organiza as telas, o catálogo, a navegação e o progresso.
- [`ConceptCard.jsx`](./src/components/ConceptCard.jsx): exibe cada conceito no catálogo.
- [`DemoPanel.jsx`](./src/components/DemoPanel.jsx): renderiza os experimentos interativos.
- [`concepts.js`](./src/data/concepts.js): reúne os dados, descrições e exemplos de código dos conceitos.
- [`styles.css`](./src/styles.css): define o visual e o comportamento responsivo.

## Referências

- [Documentação oficial do React](https://react.dev/learn)
- [Projeto React de referência](https://github.com/deivisontakatu/projeto-react)
- [Aplicação de referência](https://projeto-react-five-swart.vercel.app/)

O projeto foi inspirado nos conceitos e no formato didático das referências, com identidade visual e experiências próprias.
