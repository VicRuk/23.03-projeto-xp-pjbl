# Yup - Sistema de Gestão de Cookies

## Informações Institucionais
- **Disciplina:** Projeto Experiência Criativa: Inovando Colaborativamente
- **Autor:** Victor Ryuki Tamezava
- **Usuário GitHub:** `@VicRuk`

---

## 1. Objetivo do Projeto

Este projeto consiste no desenvolvimento individual de um sistema web completo utilizando **React** no frontend, **Node.js com Express** no backend e **MySQL** como banco de dados. O sistema é um CRUD (Create, Read, Update, Delete) funcional focado na gestão de um catálogo de produtos para uma loja de cookies. O projeto foi estruturado mantendo a separação clara entre a API (backend) e a Interface de Utilizador (frontend), focando em boas práticas, validações e usabilidade.

---

## 2. Funcionalidades
- **Gerenciamento de Produtos (CRUD Completo):** É possível listar, visualizar detalhes, cadastrar, editar e excluir cookies do catálogo.
- **Listagem Otimizada:** A tela principal exibe os produtos com funcionalidade de busca e paginação implementada no frontend.
- **Tratamento de Erros e Validações:** A API valida os dados recebidos (ex: preço válido, campos obrigatórios) e o frontend exibe alertas caso o backend retorne erros ou o banco fique indisponível.
- **Integração Frontend/Backend:** Comunicação feita de forma assíncrona utilizando `Axios`, com rotas de API tratadas via CORS.
- **Identidade e Layout:** Interface responsiva com design moderno e o nome do aluno visível no rodapé do sistema.

---

## 3. Estrutura do Repositório

O projeto possui uma arquitetura de pastas clara e modularizada:

```bash
.
├── backend/               # Servidor Node.js + Express
│   ├── Controllers/       # Funções de lógica de negócio e queries (cookies.js)
│   ├── Routes/            # Definição dos endpoints da API (cookies.js)
│   ├── db.js              # Configuração da conexão com o MySQL
│   ├── index.js           # Ponto de entrada do servidor (Porta 8800)
│   └── package.json       # Dependências do backend
├── frontend/              # Interface de Utilizador React
│   ├── public/            # Imagens dos cookies (cookieT.png, cookieRV.png, etc) e index.html
│   ├── src/
│   │   ├── components/    # Componentes de tela (CookieList, CookieForm, CookieDetail)
│   │   ├── App.js         # Configuração de Rotas (React Router) e layout principal
│   │   └── App.css        # Estilizações customizadas
│   └── package.json       # Dependências do frontend
├── sql/                   # Banco de Dados
│   └── yup.sql            # Script de criação da tabela e população inicial
└── README.md              # Documentação do projeto
```

---

## 4. Como Executar
### 4.1. Configurando o Banco de Dados (MySQL)
1. Abra o gestor MySQL (ex: MySQL Workbench).
2. Crie um banco de dados (schema) chamado `yup`.
3. Importe o ficheiro `sql/yup.sql` para dentro deste banco. Ele criará a tabela `cookie` com os campos necessários (`id`, `nome`, `descricao`, `preco`, `quantidade_estoque`, `imagem`) e inserirá os dados iniciais.
4. Se necessário, abra o ficheiro `backend/db.js` e ajuste a senha de acordo com a sua máquina local.

### 4.2. Executando o Backend (API)
Abra um terminal, navega até a pasta `backend` e execute:
```bash
cd backend
npm install
npm start
```
O servidor funcionará em `http://localhost:8800`.

### 4.3. Executando o Frontend (React)
Abra um novo terminal, navegue até a pasta `frontend` e execute:
```bash
cd frontend
npm install
npm start
```
A aplicação abrirá automaticamente no navegador em `http://localhost:3000`.

---

## 5. Endpoints da API (Backend)

O servidor Node.js expõe uma API RESTful completa na porta `8800`. Os seguintes endpoints estão disponíveis:

| Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Retorna a lista completa de cookies. |
| `GET` | `/:id` | Retorna os detalhes de um cookie específico pelo ID. |
| `POST` | `/` | Recebe um JSON no `body` e adiciona um novo cookie. |
| `PUT` | `/:id` | Atualiza os dados de um cookie existente especificado pelo ID. |
| `DELETE` | `/:id` | Remove o cookie do banco de dados. |
