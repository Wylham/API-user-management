# API de Gerenciamento de Usuários

API REST em Node.js para cadastro, listagem, edição e remoção de usuários, usando Express, Prisma e MongoDB.

## Visão geral

Este projeto expõe uma API simples para gerenciar usuários com persistência em MongoDB via Prisma Client.

## Stack

- Node.js
- Express
- Prisma ORM
- MongoDB
- Vitest
- Supertest

## Estrutura

- `server.js`: servidor Express e rotas da API
- `prisma/schema.prisma`: schema principal do Prisma
- `test/server.test.js`: testes de integração das rotas
- `.env`: variável de ambiente com a string de conexão do banco

## Requisitos

- Node.js 18+ recomendado
- MongoDB Atlas ou MongoDB local

## Configuração

1. Instale as dependências:

```bash
npm install
```

2. Configure o arquivo `.env` com a sua URL do MongoDB:

```env
DATABASE_URL="mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/NOME_DO_BANCO?appName=Cluster0"
```

3. Sincronize o schema com o banco:

```bash
npx prisma db push
```

4. Gere o Prisma Client:

```bash
npx prisma generate
```

## Como executar

Inicie a API com:

```bash
node server.js
```

O servidor sobe em `http://localhost:3000`.

## Como testar

Execute a suíte de testes com:

```bash
npm test
```

## Endpoints

### Criar usuário

- `POST /usuarios`

Body:

```json
{
  "name": "Wylham",
  "email": "wylham@email.com",
  "age": 22
}
```

### Listar usuários

- `GET /usuarios`
- Filtros opcionais:
  - `GET /usuarios?name=Wylham`
  - `GET /usuarios?email=wylham@email.com`

### Editar usuário

- `PUT /usuarios/:id`

Body:

```json
{
  "name": "Wylham Silva",
  "email": "wylham@email.com",
  "age": 23
}
```

### Remover usuário

- `DELETE /usuarios/:id`

## Testes no Postman

Base URL:

```text
http://localhost:3000
```

Exemplos:

- `POST http://localhost:3000/usuarios`
- `GET http://localhost:3000/usuarios`
- `PUT http://localhost:3000/usuarios/:id`
- `DELETE http://localhost:3000/usuarios/:id`

## Licença

Este projeto está declarado com licença `ISC` no `package.json`.
