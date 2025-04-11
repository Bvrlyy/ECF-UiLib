import { vi, describe, it, expect } from "vitest";
import { MembreRepository } from "../repositories/membreRepository.js";

// Mocker le client Prisma
const prismaMock = {
  membre: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

describe("MembreRepository", () => {
  it("devrait récupérer tous les membres", async () => {
    prismaMock.membre.findMany.mockResolvedValue([
      { id: 1, email: "john@example.com", prenom: "John" },
      { id: 2, email: "jane@example.com", prenom: "Jane" },
    ]);

    const result = await MembreRepository.findAll();
    expect(result).toEqual([
      { id: 1, email: "john@example.com", prenom: "John" },
      { id: 2, email: "jane@example.com", prenom: "Jane" },
    ]);
  });

  it("devrait trouver un membre par ID", async () => {
    const membreData = { id: 1, email: "john@example.com", prenom: "John" };
    prismaMock.membre.findUnique.mockResolvedValue(membreData);

    const result = await MembreRepository.findById(1);
    expect(result).toEqual(membreData);
  });

  it("devrait créer un membre", async () => {
    const newMembre = { email: "new@example.com", prenom: "New" };
    prismaMock.membre.create.mockResolvedValue({ id: 3, ...newMembre });

    const result = await MembreRepository.create(newMembre);
    expect(result).toHaveProperty("id");
    expect(result.email).toBe(newMembre.email);
  });

  it("devrait mettre à jour un membre", async () => {
    const updatedMembre = { email: "updated@example.com" };
    prismaMock.membre.update.mockResolvedValue({ id: 1, ...updatedMembre });

    const result = await MembreRepository.update(1, updatedMembre);
    expect(result.email).toBe(updatedMembre.email);
  });

  it("devrait supprimer un membre", async () => {
    prismaMock.membre.delete.mockResolvedValue({
      id: 1,
      email: "john@example.com",
    });

    const result = await MembreRepository.remove(1);
    expect(result.id).toBe(1);
  });
});
