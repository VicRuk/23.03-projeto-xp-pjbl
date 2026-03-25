import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CookieList = () => {
    const [cookies, setCookies] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        fetchCookies();
    }, []);

    const fetchCookies = async () => {
        try {
            const res = await axios.get("http://localhost:8800/");
            if (Array.isArray(res.data)) {
                setCookies(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este cookie?")) {
            try {
                await axios.delete(`http://localhost:8800/${id}`);
                fetchCookies();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const cookiesFiltrados = cookies.filter(cookie =>
        cookie.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div>
            <div className="position-relative my-3 d-flex align-items-center justify-content-between">
                <div>
                    <h1 className="h2"><b>Cookies</b></h1>
                    <h6>Olá! Escolha seu delicioso cookie</h6>
                </div>
                <div className="text-center">
                    <Link to="/add" className="btn btn-dark py-2" style={{ borderRadius: "15px" }}>
                        Administrar / Adicionar
                    </Link>
                </div>
            </div>

            <div className="position-relative input-box mx-auto">
                <i className="fa fa-search"></i>
                <input
                    className="form-control shadow-sm"
                    type="text"
                    placeholder="Pesquise sabores"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            <div className="row justify-content-start mt-4">
                {cookiesFiltrados.length === 0 && <p className="text-center mt-4">Nenhum cookie encontrado.</p>}

                {cookiesFiltrados.map((cookie) => (
                    <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch" key={cookie.id}>
                        <div className="cookie-card w-100 shadow-sm">
                            <div className="row align-items-center h-100 m-1 p-2">
                                <div className="card-image col-4 d-flex justify-content-center">
                                    <img src={`/imgs/${cookie.imagem}.png`} className="img-fluid" alt={cookie.nome} />
                                </div>
                                <div className="col-5 d-flex bg-white flex-column p-0">
                                    <h2 className="h5 mt-2 mb-1">{cookie.nome}</h2>
                                    <p className="text-muted mb-2 text-truncate" style={{ maxHeight: '40px' }}>{cookie.descricao}</p>
                                    <h2 className="h6 fw-bold">R${cookie.preco.toFixed(2)}</h2>
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
        </div>
    );
};

export default CookieList;