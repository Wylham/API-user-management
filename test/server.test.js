import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = {
    user: {
        create: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
};

const PrismaClientMock = vi.fn(() => prismaMock);

vi.mock("@prisma/client", () => ({
    default: { PrismaClient: PrismaClientMock },
    PrismaClient: PrismaClientMock,
}));

const { app } = await import("../server.js");

beforeEach(() => {
    vi.clearAllMocks();
});

describe("API de usuários", () => {
    it("cria usuário", async () => {
        const user = { id: 1, name: "Maria", email: "maria@email.com", age: 28 };
        prismaMock.user.create.mockResolvedValueOnce(user);

        const response = await request(app).post("/usuarios").send({
            name: "Maria",
            email: "maria@email.com",
            age: 28,
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(user);
        expect(prismaMock.user.create).toHaveBeenCalledWith({
            data: { name: "Maria", email: "maria@email.com", age: 28 },
        });
    });

    it("lista usuários com filtro", async () => {
        const users = [{ id: 1, name: "John", email: "john@email.com", age: 30 }];
        prismaMock.user.findMany.mockResolvedValueOnce(users);

        const response = await request(app).get("/usuarios").query({
            name: "John",
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(users);
        expect(prismaMock.user.findMany).toHaveBeenCalledWith({
            where: { name: "John" },
        });
    });

    it("edita usuário por id", async () => {
        const updatedUser = { id: 1, name: "Ana", email: "ana@email.com", age: 22 };
        prismaMock.user.update.mockResolvedValueOnce(updatedUser);

        const response = await request(app).put("/usuarios/1").send({
            name: "Ana",
            email: "ana@email.com",
            age: 22,
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedUser);
        expect(prismaMock.user.update).toHaveBeenCalledWith({
            where: { id: "1" },
            data: { name: "Ana", email: "ana@email.com", age: 22 },
        });
    });

    it("remove usuário por id", async () => {
        prismaMock.user.delete.mockResolvedValueOnce({});

        const response = await request(app).delete("/usuarios/1");

        expect(response.status).toBe(204);
        expect(prismaMock.user.delete).toHaveBeenCalledWith({
            where: { id: "1" },
        });
    });
});