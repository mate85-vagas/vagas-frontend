/* eslint-disable */

import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditJob = () => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [site, setSite] = useState('');
    const [workload, setWorkload] = useState('');
    const [salary, setSalary] = useState('');
    const [endingDate,setEndingDate] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getJobById();
    }, []);
 
    const updateJob = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/vagas/${id}`,{
            description: description,
            title: title,
            type: type,
            site:site,
            workload: workload,
            salary: salary,
            endingDate: endingDate,
            userId: 1
        });
        navigate("/");
    }

    const getJobById = async () => {
        const response = await axios.get(`http://localhost:5000/vagas/${id}`);
        setDescription(response.data.description);
        setTitle(response.data.title);
        setType(response.data.type);
        setSite(response.data.site);
        setWorkload(response.data.workload);
        setSalary(response.data.salary);
        setEndingDate(response.data.endingDate);
    }
 
    return (
        <div>
            <form onSubmit={ updateJob }>
               <div className="field">
                    <label className="label">Título</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Título da Vaga"
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Descrição</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Descrição da Vaga"
                        value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Tipo</label>
                    <div className="select">
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="estagio">Estágio</option>
                            <option value="pesquisa">Pesquisa</option>
                            <option value="trabalho">Trabalho</option>
                            <option value="extensao">Extensão</option>
                            <option value="complementar">CH Complementar</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Localização</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Localização, Ex: Salvador - BA"
                        value={ site }
                        onChange={ (e) => setSite(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Carga Horária Semanal:</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Carga horária semanal, Ex: 30"
                        value={ workload}
                        onChange={ (e) => setWorkload(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Salário (R$)</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Salário em R$"
                        value={ salary }
                        onChange={ (e) => setSalary(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Data Limite</label>
                    <input 
                        className="input"
                        type="date"
                        placeholder="Data limite da vaga"
                        value={endingDate}
                        onChange={ (e) => setEndingDate(e.target.value) }
                    />
                </div>
                <div className="field">
                    <button className="button is-primary">Salvar</button>
                </div>
            </form>
        </div>
    )
}
 
export default EditJob;