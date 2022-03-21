/* eslint-disable */

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 
const AddVaga = () => {
    const [descricaoVaga, setDescricao] = useState('');
    const [tituloVaga, setTitulo] = useState('');
    const [tipoVaga, setTipo] = useState('');
    const [localVaga, setLocal] = useState('');
    const [cargaVaga, setCarga] = useState('');
    const [salarioVaga, setSalario] = useState('');
    const [prazoVaga,setPrazo] = useState('');
    const navigate = useNavigate();
 
    const saveVaga = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/vagas',{
            descricaoVaga: descricaoVaga,
            tituloVaga: tituloVaga,
            tipoVaga: tipoVaga,
            localVaga:localVaga,
            cargaVaga: cargaVaga,
            salarioVaga: salarioVaga,
            prazoVaga: prazoVaga,
            usuarioIdUsuario: 1
        });
        navigate("/");
    }
 
    return (
        <div>
            <form onSubmit={ saveVaga }>
                <div className="field">
                    <label className="label">Título</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Título da Vaga"
                        value={ tituloVaga }
                        onChange={ (e) => setTitulo(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Descrição</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Descrição da Vaga"
                        value={ descricaoVaga }
                        onChange={ (e) => setDescricao(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Tipo</label>
                    <div className="select">
                        <select value={tipoVaga} onChange={(e) => setTipo(e.target.value)}>
                            <option value="">Selecione</option>
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
                        value={ localVaga }
                        onChange={ (e) => setLocal(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Carga Horária Semanal:</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Carga horária semanal, Ex: 30"
                        value={ cargaVaga }
                        onChange={ (e) => setCarga(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Salário (R$)</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Salário em R$"
                        value={ salarioVaga }
                        onChange={ (e) => setSalario(e.target.value) }
                    />
                </div>
                <div className="field">
                    <label className="label">Data Limite</label>
                    <input 
                        className="input"
                        type="date"
                        placeholder="Data limite da vaga"
                        value={prazoVaga}
                        onChange={ (e) => setPrazo(e.target.value) }
                    />
                </div>
                <div className="field">
                    <button className="button is-primary">Salvar</button>
                </div>
            </form>
        </div>
    )
}
 
export default AddVaga;