# 🎬 Roteiro do Vídeo Demonstrativo

## Duração Estimada: 5-7 minutos

---

## PARTE 1: INTRODUÇÃO (30 segundos)

**Mostrar na tela:**
- Pasta do projeto no explorador de arquivos
- Estrutura de pastas: `backend/` e `frontend/`

**Narração:**
"Olá! Este é o projeto de blog completo com autenticação desenvolvido com Node.js, Express, React e SQLite. Vou demonstrar o backend e frontend funcionando, além de mostrar as principais funcionalidades no código."

---

## PARTE 2: BACKEND - CÓDIGO (2 minutos)

### 2.1. Estrutura do Backend
**Mostrar:**
- Pasta `backend/src/` no explorador
- Subpastas: `config/`, `models/`, `controllers/`, `routes/`, `middleware/`

### 2.2. Modelos (Models)
**Abrir arquivo:** `backend/src/models/User.js`
**Destacar:**
- Schema do User (id, username, password)
- Hook beforeCreate para hash de senha com bcrypt
- Método comparePassword

**Abrir arquivo:** `backend/src/models/Post.js`
**Destacar:**
- Schema do Post (id, titulo, texto, userId)
- Validações (notEmpty, len)

**Abrir arquivo:** `backend/src/models/Comment.js`
**Destacar:**
- Schema do Comment (id, texto, postId, userId)
- Foreign keys

**Abrir arquivo:** `backend/src/models/index.js`
**Destacar:**
- Associações entre modelos (hasMany, belongsTo)

### 2.3. Controllers
**Abrir arquivo:** `backend/src/controllers/authController.js`
**Destacar:**
- Função `register`: validação, criação de usuário, geração de token JWT
- Função `login`: verificação de credenciais, comparação de senha

**Abrir arquivo:** `backend/src/controllers/postController.js`
**Destacar:**
- Função `getAllPosts`: paginação, include do User
- Função `createPost`: validações, criação do post

### 2.4. Middleware de Autenticação
**Abrir arquivo:** `backend/src/middleware/auth.js`
**Destacar:**
- Verificação do token JWT
- Extração do userId do token
- Tratamento de erros

### 2.5. Rotas
**Abrir arquivo:** `backend/src/routes/postRoutes.js`
**Destacar:**
- Rota GET `/` sem autenticação
- Rota POST `/` com middleware `authMiddleware`

---

## PARTE 3: BACKEND - FUNCIONANDO (1 minuto)

### 3.1. Iniciar Backend
**Mostrar terminal:**
```bash
cd backend
npm run dev
```

**Destacar na saída:**
- ✓ Conexão com banco de dados estabelecida
- ✓ Modelos sincronizados
- 🚀 Servidor rodando na porta 5000

### 3.2. Testar API
**Mostrar terminal ou Postman/Insomnia:**
```bash
curl http://localhost:5000/api/health
```

**Resposta esperada:**
```json
{"status":"OK","message":"API do Blog está funcionando!"}
```

---

## PARTE 4: FRONTEND - CÓDIGO (2 minutos)

### 4.1. Estrutura do Frontend
**Mostrar:**
- Pasta `frontend/src/` no explorador
- Subpastas: `components/`, `pages/`, `services/`

### 4.2. Serviços (Services)
**Abrir arquivo:** `frontend/src/services/api.js`
**Destacar:**
- Configuração do Axios com baseURL
- Interceptor de requisição (adiciona token JWT)
- Interceptor de resposta (trata erro 401)

**Abrir arquivo:** `frontend/src/services/authService.js`
**Destacar:**
- Funções: register, login, logout
- Armazenamento do token no localStorage
- Tratamento de erros

### 4.3. Componentes
**Abrir arquivo:** `frontend/src/components/Navbar.jsx`
**Destacar:**
- Uso de `useNavigate` para navegação
- Verificação de autenticação com `authService.isAuthenticated()`
- Renderização condicional (usuário logado vs não logado)

**Abrir arquivo:** `frontend/src/components/PostCard.jsx`
**Destacar:**
- Props recebidas (post)
- Formatação de data
- Navegação ao clicar no card

### 4.4. Páginas
**Abrir arquivo:** `frontend/src/pages/AllPosts.jsx`
**Destacar:**
- Hooks: `useState`, `useEffect`
- Chamada à API com `postService.getAllPosts()`
- Tratamento de loading e erro
- Renderização de lista de posts

**Abrir arquivo:** `frontend/src/pages/CreatePost.jsx`
**Destacar:**
- Validação de formulário (função `validateForm`)
- Estado local para título e texto
- Submissão com `postService.createPost()`
- Navegação após sucesso

**Abrir arquivo:** `frontend/src/pages/PostDetail.jsx`
**Destacar:**
- Uso de `useParams` para obter ID do post
- Carregamento de post e comentários em paralelo
- Formulário de comentário
- Renderização de lista de comentários

### 4.5. Rotas e Proteção
**Abrir arquivo:** `frontend/src/App.jsx`
**Destacar:**
- Uso de `BrowserRouter`, `Routes`, `Route`
- Componente `PrivateRoute` protegendo `/criar-post`

**Abrir arquivo:** `frontend/src/components/PrivateRoute.jsx`
**Destacar:**
- Verificação de autenticação
- Redirecionamento para login se não autenticado

---

## PARTE 5: FRONTEND - FUNCIONANDO (2 minutos)

### 5.1. Iniciar Frontend
**Mostrar terminal:**
```bash
cd frontend
npm run dev
```

**Destacar na saída:**
- VITE v7.3.1 ready
- Local: http://localhost:5173/

### 5.2. Demonstração na Aplicação Web

**Abrir navegador em http://localhost:5173**

#### 5.2.1. Página Inicial
- Mostrar lista vazia de posts
- Destacar navbar com links

#### 5.2.2. Cadastro
- Clicar em "Cadastro"
- Preencher formulário:
  - Username: `demo`
  - Senha: `123456`
  - Confirmar Senha: `123456`
- Clicar em "Cadastrar"
- Mostrar redirecionamento automático
- Destacar navbar mostrando "Olá, demo"

#### 5.2.3. Criar Post
- Clicar em "Criar Post"
- Preencher formulário:
  - Título: `Demonstração do Blog`
  - Texto: `Este é um post de demonstração do blog desenvolvido com React e Node.js. Aqui podemos escrever sobre diversos assuntos!`
- Clicar em "Criar Post"
- Mostrar post aparecendo na lista

#### 5.2.4. Visualizar Post e Comentar
- Clicar no post criado
- Mostrar conteúdo completo
- Rolar até seção de comentários
- Escrever comentário: `Ótimo post! Muito bem desenvolvido.`
- Clicar em "Comentar"
- Mostrar comentário aparecendo imediatamente

#### 5.2.5. Logout
- Clicar em "Sair"
- Mostrar redirecionamento para login
- Destacar que navbar mudou (sem "Criar Post")

---

## PARTE 6: CÓDIGO ADICIONAL (30 segundos)

### 6.1. Validações
**Mostrar rapidamente:**
- Validação no backend: `backend/src/controllers/postController.js`
- Validação no frontend: `frontend/src/pages/CreatePost.jsx`

### 6.2. Tratamento de Erros
**Mostrar rapidamente:**
- Try-catch nos controllers
- Tratamento de erro nos services do frontend

---

## PARTE 7: ENCERRAMENTO (30 segundos)

**Mostrar:**
- Estrutura final do projeto no explorador
- Arquivo README.md

**Narração:**
"Este projeto demonstra uma aplicação full stack completa com autenticação JWT, CRUD de posts, sistema de comentários, validações, tratamento de erros e boas práticas de código. Todo o código está documentado no README e disponível no repositório Git. Obrigado por assistir!"

---

## DICAS PARA GRAVAÇÃO

1. **Preparação:**
   - Fechar abas desnecessárias do navegador
   - Limpar terminal
   - Ajustar zoom do editor para legibilidade
   - Testar áudio antes de gravar

2. **Durante a gravação:**
   - Falar claramente e em ritmo moderado
   - Pausar entre seções
   - Usar cursor para destacar código importante
   - Não correr nas demonstrações

3. **Edição:**
   - Adicionar legendas com nomes de arquivos
   - Destacar trechos importantes de código
   - Adicionar transições suaves entre seções

4. **Qualidade:**
   - Resolução mínima: 1080p
   - Áudio claro sem ruídos
   - Duração: 5-7 minutos (máximo 10 minutos)
