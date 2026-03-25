import { db } from "../db.js";

export const getCookies = (_, res) => {
  const q = "SELECT * FROM cookie";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao procurar cookies." });
    return res.status(200).json(data);
  });
};

export const getCookieById = (req, res) => {
  const q = "SELECT * FROM cookie WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao procurar o cookie." });
    if (data.length === 0) return res.status(404).json({ error: "Cookie não encontrado." });
    return res.status(200).json(data[0]);
  });
};

export const addCookie = (req, res) => {
  const { nome, descricao, preco, imagem } = req.body;
  
  // Todos os campos são obrigatórios
  if (!nome || !descricao || preco === undefined || !imagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }
  
  // Preço é um número válido e positivo
  if (isNaN(preco) || preco < 0) {
    return res.status(400).json({ error: "O preço deve ser um valor numérico válido e positivo." });
  }

  const q = "INSERT INTO cookie(`nome`, `descricao`, `preco`, `imagem`) VALUES(?)";
  const values = [nome, descricao, preco, imagem];
  
  db.query(q, [values], (err) => {
    if (err) return res.status(500).json({ error: "Erro interno ao cadastrar cookie." });
    return res.status(201).json("Cookie cadastrado com sucesso.");
  });
};

export const updateCookie = (req, res) => {
  const { nome, descricao, preco, imagem } = req.body;
  
  // VALIDAÇÕES para o Update
  if (!nome || !descricao || preco === undefined || !imagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }
  if (isNaN(preco) || preco < 0) {
    return res.status(400).json({ error: "O preço deve ser um valor numérico válido." });
  }

  const q = "UPDATE cookie SET `nome` = ?, `descricao` = ?, `preco` = ?, `imagem` = ? WHERE `id` = ?";
  const values = [nome, descricao, preco, imagem];
  
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erro interno ao atualizar cookie." });
    return res.status(200).json("Cookie atualizado com sucesso.");
  });
};

export const deleteCookie = (req, res) => {
  const q = "DELETE FROM cookie WHERE `id` = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erro interno ao deletar cookie." });
    return res.status(200).json("Cookie deletado com sucesso.");
  });
};