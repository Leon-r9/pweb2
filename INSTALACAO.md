# 🚀 Guia de Instalação e Execução

Este documento fornece instruções detalhadas para instalar e executar o projeto do blog.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 18 ou superior ([Download](https://nodejs.org/))
- **npm** (vem incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

Para verificar se estão instalados corretamente, execute:

```bash
node --version
npm --version
git --version
```

## Passo 1: Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd blog-project
```

## Passo 2: Configurar o Backend

### 2.1. Instalar Dependências

```bash
cd backend
npm install
```

### 2.2. Configurar Variáveis de Ambiente (Opcional)

O arquivo `.env` já está configurado com valores padrão. Se desejar alterar, edite o arquivo:

```env
PORT=5000
JWT_SECRET=seu_secret_super_seguro_aqui_123
NODE_ENV=development
```

### 2.3. Executar o Backend

```bash
npm run dev
```

Você verá a mensagem:
```
✓ Conexão com banco de dados estabelecida com sucesso.
✓ Modelos sincronizados com o banco de dados.
🚀 Servidor rodando na porta 5000
📍 URL: http://localhost:5000
✓ Ambiente: development
```

**Deixe este terminal aberto!** O backend precisa estar rodando para o frontend funcionar.

## Passo 3: Configurar o Frontend

### 3.1. Abrir Novo Terminal

Abra um **novo terminal** (não feche o do backend) e navegue até a pasta do frontend:

```bash
cd blog-project/frontend
```

### 3.2. Instalar Dependências

```bash
npm install
```

### 3.3. Executar o Frontend

```bash
npm run dev
```

Você verá a mensagem:
```
VITE v7.3.1  ready in 234 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Passo 4: Acessar a Aplicação

Abra seu navegador e acesse:

```
http://localhost:5173
```

## Testando a Aplicação

### 1. Criar uma Conta

1. Clique em **"Cadastro"** no menu superior
2. Preencha:
   - Username: `teste`
   - Senha: `123456`
   - Confirmar Senha: `123456`
3. Clique em **"Cadastrar"**

Você será automaticamente logado e redirecionado para a página inicial.

### 2. Criar um Post

1. Clique em **"Criar Post"** no menu
2. Preencha:
   - Título: `Meu Primeiro Post`
   - Texto: `Este é o conteúdo do meu primeiro post no blog!`
3. Clique em **"Criar Post"**

O post aparecerá na lista de posts.

### 3. Adicionar um Comentário

1. Clique no post que você criou
2. Role até a seção de comentários
3. Digite um comentário: `Ótimo post!`
4. Clique em **"Comentar"**

O comentário aparecerá imediatamente abaixo do post.

## Comandos Úteis

### Backend

```bash
# Executar em modo de desenvolvimento (com auto-reload)
npm run dev

# Executar em modo de produção
npm start
```

### Frontend

```bash
# Executar em modo de desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Visualizar build de produção
npm run preview
```

## Estrutura de Portas

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173

Certifique-se de que essas portas estão livres antes de executar a aplicação.

## Solução de Problemas

### Erro: "Port 5000 is already in use"

Outra aplicação está usando a porta 5000. Você pode:

1. Fechar a aplicação que está usando a porta
2. Ou alterar a porta no arquivo `backend/.env`:
   ```env
   PORT=5001
   ```
   E também atualizar a URL no `frontend/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5001/api';
   ```

### Erro: "Cannot GET /api/..."

Certifique-se de que o backend está rodando. Verifique o terminal do backend.

### Erro: "Network Error"

Verifique se:
1. O backend está rodando
2. A URL da API está correta em `frontend/src/services/api.js`
3. Não há firewall bloqueando as conexões

### Banco de Dados não Inicializa

O banco de dados SQLite é criado automaticamente. Se houver problemas:

1. Pare o backend (Ctrl+C)
2. Delete o arquivo `backend/database.sqlite` (se existir)
3. Execute o backend novamente: `npm run dev`

## Parando a Aplicação

Para parar os servidores:

1. No terminal do **frontend**: pressione `Ctrl+C`
2. No terminal do **backend**: pressione `Ctrl+C`

## Próximos Passos

Após executar com sucesso, você pode:

- Explorar o código em `backend/src/` e `frontend/src/`
- Modificar estilos em `frontend/src/index.css`
- Adicionar novos recursos
- Fazer deploy em produção

## Suporte

Se encontrar problemas, verifique:

1. As versões do Node.js e npm
2. Se todas as dependências foram instaladas corretamente
3. Se as portas 5000 e 5173 estão disponíveis
4. Os logs nos terminais do backend e frontend

---

**Boa sorte com o projeto! 🚀**
