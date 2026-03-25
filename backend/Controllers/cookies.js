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
  const { nome, descricao, preco, quantidade_estoque, imagem } = req.body;
  
  if (!nome || !descricao || preco === undefined || quantidade_estoque === undefined || !imagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }
  
  if (isNaN(preco) || preco < 0) {
    return res.status(400).json({ error: "O preço deve ser um valor numérico válido e positivo." });
  }

  if (isNaN(quantidade_estoque) || quantidade_estoque < 0) {
    return res.status(400).json({ error: "O estoque deve ser um número inteiro válido e positivo." });
  }

  const q = "INSERT INTO cookie(`nome`, `descricao`, `preco`, `quantidade_estoque`, `imagem`) VALUES(?)";
  const values = [nome, descricao, preco, quantidade_estoque, imagem];
  
  db.query(q, [values], (err) => {
    if (err) return res.status(500).json({ error: "Erro interno ao cadastrar cookie." });
    return res.status(201).json("Cookie cadastrado com sucesso.");
  });
};

export const updateCookie = (req, res) => {
  const { nome, descricao, preco, quantidade_estoque, imagem } = req.body;
  
  if (!nome || !descricao || preco === undefined || quantidade_estoque === undefined || !imagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }
  if (isNaN(preco) || preco < 0) {
    return res.status(400).json({ error: "O preço deve ser um valor numérico válido." });
  }
  if (isNaN(quantidade_estoque) || quantidade_estoque < 0) {
    return res.status(400).json({ error: "O estoque deve ser um número inteiro válido." });
  }

  const q = "UPDATE cookie SET `nome` = ?, `descricao` = ?, `preco` = ?, `quantidade_estoque` = ?, `imagem` = ? WHERE `id` = ?";
  const values = [nome, descricao, preco, quantidade_estoque, imagem];
  
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