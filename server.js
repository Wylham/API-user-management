import express from "express";
import pkg from "@prisma/client";
import { pathToFileURL } from "node:url";

const { PrismaClient } = pkg;
export const prisma = new PrismaClient();
export const app = express();

app.use(express.json());

// Criar usuário
app.post("/usuarios", async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const user = await prisma.user.create({
            data: { name, email, age },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar usuários (com filtro opcional via query)
// Ex: GET /usuarios?name=John
app.get("/usuarios", async (req, res) => {
    try {
        const filters = {};
        if (req.query.name) {
            filters.name = req.query.name;
        }
        if (req.query.email) {
            filters.email = req.query.email;
        }

        const users = await prisma.user.findMany({
            where: filters,
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Editar usuário por ID
app.put("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await prisma.user.update({
            where: { id },
            data: req.body,
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Deletar usuário por ID
app.delete("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: { id },
        });
        res.status(204).send(); // sem conteúdo
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export function startServer(port = 3000) {
    return app.listen(port, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
}

const isMainModule =
    process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;

if (isMainModule) {
    startServer();
}
