import { db } from "../db.js";

export const getCookies = (_, res) => {
  const q = "SELECT * FROM cookie";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getCookieById = (req, res) => {
  const q = "SELECT * FROM cookie WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};

export const addCookie = (req, res) => {
  const q = "INSERT INTO cookie(`nome`, `descricao`, `preco`, `imagem`) VALUES(?)";
  const values = [req.body.nome, req.body.descricao, req.body.preco, req.body.imagem];
  
  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Cookie cadastrado com sucesso.");
  });
};

export const updateCookie = (req, res) => {
  const q = "UPDATE cookie SET `nome` = ?, `descricao` = ?, `preco` = ?, `imagem` = ? WHERE `id` = ?";
  const values = [req.body.nome, req.body.descricao, req.body.preco, req.body.imagem];
  
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Cookie atualizado com sucesso.");
  });
};

export const deleteCookie = (req, res) => {
  const q = "DELETE FROM cookie WHERE `id` = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Cookie deletado com sucesso.");
  });
};