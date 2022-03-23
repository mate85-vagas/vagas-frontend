/* eslint-disable */

import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

const JobList = () => {
    const [jobs, setJob] = useState([]);
 
    useEffect(() => {
        getJobs();
    }, []);
 
    const getJobs= async () => {
        const response = await axios.get('http://localhost:5000/vagas');
        setJob(response.data);
    }
 
    const deleteJob = async (id) => {
        await axios.delete(`http://localhost:5000/vagas/${id}`);
        getJobs();
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
                    { jobs.map((job, index) => (
                        <tr key={ job.id }>
                            <td>{ index + 1 }</td>
                            <td>{ job.title }</td>
                            <td>{ job.type }</td>
                            <td>{ job.site }</td>
                            <td>{ job.salary}</td>
                            <td>
                                <Link to={`/edit/${job.id}`} className="button is-small is-info">Editar</Link>
                                <button onClick={ () => deleteJob(job.id) } className="button is-small is-danger">Deletar</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
 
export default JobList;