import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CookieList = () => {
    const [cookies, setCookies] = useState([]);
    const [busca, setBusca] = useState("");
    const [erro, setErro] = useState("");
    
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 9;

    useEffect(() => {
        fetchCookies();
    }, []);

    const fetchCookies = async () => {
        try {
            setErro(""); // Limpa erros antigos
            const res = await axios.get("http://localhost:8800/");
            if (Array.isArray(res.data)) {
                setCookies(res.data);
            }
        } catch (err) {
            setErro("Não foi possível carregar os cookies. Verifique se o servidor está ligado corretamente.");
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este cookie?")) {
            try {
                setErro("");
                await axios.delete(`http://localhost:8800/${id}`);
                fetchCookies();
            } catch (err) {
                setErro("Erro ao tentar excluir o cookie.");
                console.log(err);
            }
        }
    };

    const cookiesFiltrados = cookies.filter(cookie =>
        cookie.nome.toLowerCase().includes(busca.toLowerCase())
    );

    // Lógica de Paginação
    const indexUltimoItem = paginaAtual * itensPorPagina;
    const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
    const cookiesAtuais = cookiesFiltrados.slice(indexPrimeiroItem, indexUltimoItem);
    const totalPaginas = Math.ceil(cookiesFiltrados.length / itensPorPagina);

    return (
        <div>
            <div className="position-relative my-3 d-flex align-items-center justify-content-between">
                <div>
                    <h1 className="h2"><b>Cookies</b></h1>
                    <h6>Olá! Escolhe o teu delicioso cookie</h6>
                </div>
                <div className="text-center">
                    <Link to="/add" className="btn btn-dark py-2" style={{ borderRadius: "15px" }}>
                        Administrar / Adicionar
                    </Link>
                </div>
            </div>

            <div className="position-relative input-box mx-auto mb-4">
                <i className="fa fa-search"></i>
                <input
                    className="form-control shadow-sm"
                    type="text"
                    placeholder="Pesquisa sabores"
                    value={busca}
                    onChange={(e) => {
                        setBusca(e.target.value);
                        setPaginaAtual(1); // Volta à página 1 quando pesquisa
                    }}
                />
            </div>

            {/* Mensagem de erro */}
            {erro && <div className="alert alert-danger shadow-sm text-center mb-4">{erro}</div>}

            <div className="row justify-content-start mt-4">
                {cookiesFiltrados.length === 0 && !erro && <p className="text-center mt-4">Nenhum cookie encontrado.</p>}

                {cookiesAtuais.map((cookie) => (
                    <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-1" key={cookie.id}>
                        <div className="cookie-card h-100 w-100 shadow-sm" style={{ minHeight: '150px', maxHeight: '150px' }}>
                            <div className="row align-items-center h-100 mx-1 p-2">
                                <div className="card-image col-4 d-flex justify-content-center">
                                    <img src={`/imgs/${cookie.imagem}.png`} className="img-fluid" alt={cookie.nome} />
                                </div>
                                <div className="col-5 d-flex bg-white flex-column p-0">
                                    <h2 className="h5 mb-1">{cookie.nome}</h2>
                                    <p className="text-muted mb-2 text-truncate" style={{ maxHeight: '60px' }}>{cookie.descricao}</p>
                                    <h2 className="h6 fw-bold mb-1">R${cookie.preco.toFixed(2)}</h2>
                                    <small className="text-muted fw-semibold">
                                        <i className="bi bi-box-seam me-1"></i>
                                        Estoque: {cookie.quantidade_estoque}
                                    </small>
                                </div>

                                <div className="col-3 d-flex flex-column justify-content-center align-items-center gap-0">
                                    <Link to={`/detail/${cookie.id}`} className="text-dark fs-4" title="Ver Detalhes">
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                    <Link to={`/edit/${cookie.id}`} className="text-primary fs-5" title="Editar">
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button onClick={() => handleDelete(cookie.id)} className="btn text-danger fs-5 p-0 mt-1 border-0 bg-transparent" title="Excluir">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginação Visual */}
            {totalPaginas > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <button 
                        className="btn btn-outline-dark me-2" 
                        disabled={paginaAtual === 1}
                        onClick={() => setPaginaAtual(paginaAtual - 1)}
                    >
                        Anterior
                    </button>
                    <span className="align-self-center mx-3 fw-bold">
                        Página {paginaAtual} de {totalPaginas}
                    </span>
                    <button 
                        className="btn btn-outline-dark ms-2" 
                        disabled={paginaAtual === totalPaginas}
                        onClick={() => setPaginaAtual(paginaAtual + 1)}
                    >
                        Próxima
                    </button>
                </div>
            )}
        </div>
    );
};

export default CookieList;