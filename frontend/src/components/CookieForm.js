import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const CookieForm = () => {
  const [cookie, setCookie] = useState({ nome: "", descricao: "", preco: "", imagem: "cookieT" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCookie = async () => {
        try {
          const res = await axios.get(`http://localhost:8800/${id}`);
          setCookie({...res.data, preco: res.data.preco.toFixed(2)});
        } catch (err) {
          setErro("Falha ao carregar os dados deste cookie.");
          console.log(err);
        }
      };
      fetchCookie();
    }
  }, [id]);

  const handleChange = (e) => {
    setCookie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const cookieData = { ...cookie, preco: parseFloat(cookie.preco) };
      
      if (id) {
        await axios.put(`http://localhost:8800/${id}`, cookieData);
      } else {
        await axios.post("http://localhost:8800/", cookieData);
      }
      navigate("/");
    } catch (err) {
      // Captura o erro
      if (err.response && err.response.data && err.response.data.error) {
          setErro(err.response.data.error);
      } else {
          setErro("Ocorreu um erro inesperado ao guardar o cookie.");
      }
      console.log(err);
    }
  };

  return (
    <div className="row justify-content-center px-3 pt-2">
      <div className="col-12 col-md-11 col-lg-9 shadow bg-white p-5 rounded-4 position-relative">
        <Link to="/" className="text-dark fs-3 position-absolute top-0 end-0 m-4" title="Voltar">
          <i className="bi bi-x-circle-fill"></i>
        </Link>
        
        <h1 className="mb-4 h2 text-center"><b>{id ? "Editar Produto" : "Adicionar Produto"}</b></h1>
        
        {/* Exibe o erro na interface se houver */}
        {erro && <div className="alert alert-danger shadow-sm">{erro}</div>}
        
        <div className="row align-items-center forms">
          <div className="col-12 col-md-5 d-flex justify-content-center mb-4 mb-md-0 px-md-3">
            <img src={`/imgs/${cookie.imagem}.png`} className="large-cookie-image img-fluid" alt="Preview" />
          </div>
          
          <div className="col-12 col-md-7 px-md-4">
            <form onSubmit={handleSubmit} className="w-100">
              <input
                className="form-control shadow-sm mb-3"
                type="text"
                name="nome"
                required
                placeholder="Nome do Cookie"
                onChange={handleChange}
                value={cookie.nome}
              />

              <textarea
                className="form-control shadow-sm mb-3"
                rows="4"
                name="descricao"
                required
                placeholder="Descrição (sabor, recheio, etc)"
                onChange={handleChange}
                value={cookie.descricao}
              ></textarea>

              <div className="input-group mb-3 shadow-sm">
                <span className="input-group-text bg-white">R$</span>
                <input
                    className="form-control"
                    type="number"
                    step="0.01"
                    name="preco"
                    required
                    placeholder="Preço (ex: 5.00)"
                    onChange={handleChange}
                    value={cookie.preco}
                />
              </div>

              <select name="imagem" className="form-select mb-4 shadow-sm" onChange={handleChange} value={cookie.imagem}>
                <option value="cookieT">Tradicional</option>
                <option value="cookieRV">Red Velvet</option>
                <option value="cookieCB">Chocolate Amargo</option>
              </select>

              <div className="d-flex gap-2 mt-4">
                <button className="btn btn-success fw-bold w-50 py-3 rounded-3" type="submit">Salvar Cookie</button>
                <Link to="/" className="btn btn-outline-dark w-50 py-3 rounded-3">Cancelar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieForm;