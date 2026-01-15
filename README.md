# 📝 Blog com Autenticação - Projeto Full Stack

Um blog completo desenvolvido com **Node.js**, **Express**, **React** e **SQLite**, incluindo sistema de autenticação, criação de posts e comentários.

## 🎯 Objetivo do Projeto

Construir um pequeno blog com autenticação básica onde usuários podem criar posts e comentários, demonstrando o uso de tecnologias modernas de desenvolvimento web full stack.

## ✨ Funcionalidades

### Páginas Principais
- **Todos os Posts** - Lista paginada de posts publicados
- **Criar Post** - Formulário para criação de novos posts (requer autenticação)
- **Post Individual** - Visualização completa do post com seção de comentários
- **Cadastro** - Registro de novos usuários
- **Login** - Autenticação de usuários existentes

### Recursos Implementados
- ✅ Autenticação JWT (JSON Web Token)
- ✅ Criptografia de senhas com bcrypt
- ✅ CRUD completo de posts
- ✅ Sistema de comentários
- ✅ Validação de formulários (cliente e servidor)
- ✅ Tratamento de erros
- ✅ Paginação de posts
- ✅ Rotas protegidas
- ✅ Design responsivo

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web minimalista
- **Sequelize** - ORM para Node.js
- **SQLite** - Banco de dados relacional leve
- **bcryptjs** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **cors** - Habilitação de CORS
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React** - Biblioteca para construção de interfaces
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento no cliente
- **Axios** - Cliente HTTP para requisições
- **CSS inline** - Estilização de componentes

## 📁 Estrutura do Projeto

```
blog-project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Configuração do Sequelize
│   │   ├── models/
│   │   │   ├── User.js              # Modelo de usuário
│   │   │   ├── Post.js              # Modelo de post
│   │   │   ├── Comment.js           # Modelo de comentário
│   │   │   └── index.js             # Associações entre modelos
│   │   ├── controllers/
│   │   │   ├── authController.js    # Lógica de autenticação
│   │   │   ├── postController.js    # Lógica de posts
│   │   │   └── commentController.js # Lógica de comentários
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Rotas de autenticação
│   │   │   ├── postRoutes.js        # Rotas de posts
│   │   │   └── commentRoutes.js     # Rotas de comentários
│   │   ├── middleware/
│   │   │   └── auth.js              # Middleware de autenticação JWT
│   │   └── server.js                # Servidor Express
│   ├── .env                         # Variáveis de ambiente
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Barra de navegação
│   │   │   ├── PostCard.jsx         # Card de post
│   │   │   ├── CommentCard.jsx      # Card de comentário
│   │   │   ├── Pagination.jsx       # Componente de paginação
│   │   │   └── PrivateRoute.jsx     # Proteção de rotas
│   │   ├── pages/
│   │   │   ├── AllPosts.jsx         # Página de todos os posts
│   │   │   ├── CreatePost.jsx       # Página de criar post
│   │   │   ├── PostDetail.jsx       # Página de post individual
│   │   │   ├── Register.jsx         # Página de cadastro
│   │   │   └── Login.jsx            # Página de login
│   │   ├── services/
│   │   │   ├── api.js               # Configuração do Axios
│   │   │   ├── authService.js       # Serviço de autenticação
│   │   │   ├── postService.js       # Serviço de posts
│   │   │   └── commentService.js    # Serviço de comentários
│   │   ├── App.jsx                  # Componente principal
│   │   ├── main.jsx                 # Ponto de entrada
│   │   └── index.css                # Estilos globais
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### 1. Clonar o Repositório
```bash
git clone <url-do-repositorio>
cd blog-project
```

### 2. Configurar e Executar o Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente (opcional)
# Edite o arquivo .env se necessário

# Executar em modo de desenvolvimento
npm run dev

# O servidor estará rodando em http://localhost:5000
```

### 3. Configurar e Executar o Frontend

```bash
# Em outro terminal, entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# O frontend estará rodando em http://localhost:5173
```

### 4. Acessar a Aplicação

Abra o navegador e acesse: `http://localhost:5173`

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Criar novo usuário
- `POST /api/auth/login` - Fazer login

### Posts
- `GET /api/posts` - Listar todos os posts (com paginação)
- `GET /api/posts/:id` - Obter post por ID
- `POST /api/posts` - Criar novo post (requer autenticação)

### Comentários
- `GET /api/comments/:postId` - Listar comentários de um post
- `POST /api/comments` - Criar novo comentário (requer autenticação)

## 🗄️ Modelos do Banco de Dados

### User
- `id` (PK) - Identificador único
- `username` (único) - Nome de usuário
- `password` - Senha criptografada
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Post
- `id` (PK) - Identificador único
- `titulo` - Título do post
- `texto` - Conteúdo do post
- `userId` (FK) - Referência ao usuário autor
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Comment
- `id` (PK) - Identificador único
- `texto` - Conteúdo do comentário
- `postId` (FK) - Referência ao post
- `userId` (FK) - Referência ao usuário autor
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

## 🎨 Requisitos Funcionais Implementados

### Frontend

#### 1. Componentização
- ✅ Componentes reutilizáveis (Navbar, PostCard, CommentCard, Pagination)
- ✅ Passagem de estado via props entre componentes pai/filho

#### 2. Hooks
- ✅ `useState` - Gerenciamento de estado local
- ✅ `useEffect` - Efeitos colaterais e carregamento de dados
- ✅ `useParams` - Captura de parâmetros da URL
- ✅ `useNavigate` - Navegação programática

#### 3. Comunicação com API
- ✅ Uso do Axios para requisições HTTP
- ✅ Tratamento de erros em todas as requisições
- ✅ Interceptors para token JWT

#### 4. Validação
- ✅ Validação básica no cliente (campos obrigatórios, tamanhos mínimos)
- ✅ Mensagens de erro amigáveis

#### 5. Boas Práticas de Código
- ✅ Estrutura de pastas clara (`components/`, `pages/`, `services/`)
- ✅ Clean code com nomes significativos
- ✅ Separação de responsabilidades

### Backend

#### 1. Stack
- ✅ Node.js + Express
- ✅ Sequelize ORM + SQLite

#### 2. Endpoints REST
- ✅ Autenticação (register, login)
- ✅ Posts (listar, buscar por ID, criar)
- ✅ Comentários (listar por post, criar)

#### 3. Segurança
- ✅ Senhas criptografadas com bcrypt
- ✅ Autenticação JWT
- ✅ Middleware de proteção de rotas

## 🔒 Segurança

- Senhas nunca são armazenadas em texto plano (bcrypt com salt)
- Tokens JWT com expiração de 7 dias
- Validação de entrada no backend e frontend
- CORS configurado
- Rotas protegidas por middleware de autenticação

## 📝 Notas de Desenvolvimento

- O banco de dados SQLite é criado automaticamente na primeira execução
- Os modelos são sincronizados automaticamente com o banco
- O token JWT é armazenado no localStorage do navegador
- A aplicação redireciona automaticamente para login em caso de token inválido

## 🤝 Contribuindo

Este é um projeto educacional. Sinta-se à vontade para fazer fork e experimentar!

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido como projeto de demonstração de habilidades full stack.

---

**Desenvolvido com ❤️ usando Node.js, Express, React e SQLite**
