/* eslint-disable */

import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

const VagaList = () => {
    const [vagas, setVaga] = useState([]);
 
    useEffect(() => {
        getVagas();
    }, []);
 
    const getVagas= async () => {
        const response = await axios.get('http://localhost:5000/vagas');
        setVaga(response.data);
    }
 
    const deleteVaga = async (id) => {
        await axios.delete(`http://localhost:5000/vagas/${id}`);
        getVagas();
    }
 
    return (
        <div>
            <Link to="/add" className="button is-primary mt-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Título</th>
                        <th>Tipo</th>
                        <th>Local</th>
                        <th>Salário (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    { vagas.map((vaga, index) => (
                        <tr key={ vaga.idVaga }>
                            <td>{ index + 1 }</td>
                            <td>{ vaga.tituloVaga }</td>
                            <td>{ vaga.tipoVaga }</td>
                            <td>{ vaga.localVaga }</td>
                            <td>{ vaga.salarioVaga}</td>
                            <td>
                                <Link to={`/edit/${vaga.idVaga}`} className="button is-small is-info">Editar</Link>
                                <button onClick={ () => deleteVaga(vaga.idVaga) } className="button is-small is-danger">Deletar</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
 
export default VagaList;