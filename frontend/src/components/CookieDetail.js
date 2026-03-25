import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const CookieDetail = () => {
  const [cookie, setCookie] = useState(null);
  const [erro, setErro] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchCookie = async () => {
      try {
        setErro("");
        const res = await axios.get(`http://localhost:8800/${id}`);
        setCookie(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
            setErro("Ops! Este cookie não foi encontrado.");
        } else {
            setErro("Erro ao tentar carregar os detalhes do cookie. Verifique a conexão.");
        }
        console.log(err);
      }
    };
    fetchCookie();
  }, [id]);

  // Se houver um erro, exibe a mensagem de erro e o botão de voltar, e para a execução aqui
  if (erro) {
      return (
          <div className="text-center mt-5">
              <div className="alert alert-danger d-inline-block shadow-sm">
                  {erro}
              </div>
              <div className="mt-3">
                  <Link to="/" className="btn btn-outline-dark">Voltar para a página inicial</Link>
              </div>
          </div>
      );
  }

  if (!cookie) return <div className="text-center mt-5 fw-bold">Carregando os detalhes...</div>;

  return (
    <div className="row justify-content-center px-3 pt-2">
      <div className="col-12 col-md-10 col-lg-8 shadow bg-white p-5 rounded-4 position-relative">
        <Link to="/" className="text-dark fs-3 position-absolute top-0 end-0 m-4" title="Voltar">
          <i className="bi bi-x-circle-fill"></i>
        </Link>
        
        <h1 className="mb-5 h2 text-center">Detalhes do Cookie</h1>
        
        <div className="row align-items-center">
          <div className="col-12 col-md-5 d-flex justify-content-center mb-4 mb-md-0">
            <img src={`/imgs/${cookie.imagem}.png`} className="large-cookie-image img-fluid" alt={cookie.nome} />
          </div>
          
          <div className="col-12 col-md-7 px-md-4">
            <h2 className="h3 mb-3">{cookie.nome}</h2>
            <div className="alert alert-light border shadow-sm mb-4">
              <p className="mb-1 fw-bold text-muted">Descrição:</p>
              <p className="mb-0 fs-6">{cookie.descricao}</p>
            </div>
            <div className="d-flex align-items-center gap-3 mb-4">
              <p className="m-0 text-muted">Preço:</p>
              <h2 className="m-0 h3 fw-bold text-success">R${cookie.preco.toFixed(2)}</h2>
            </div>
            <div className="d-flex align-items-center gap-3 mb-4">
              <p className="m-0 text-muted">Disponível:</p>
              <h2 className="m-0 h5 fw-bold">{cookie.quantidade_estoque} unidades</h2>
            </div>
            <div className="d-flex gap-2">
              <Link to={`/edit/${cookie.id}`} className="btn btn-primary w-50 py-2">Editar</Link>
              <Link to="/" className="btn btn-outline-dark w-50 py-2">Voltar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieDetail;