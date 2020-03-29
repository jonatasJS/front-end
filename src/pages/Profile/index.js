import React, { useState, useEffect } from 'react';
import './style.css'
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import '../../global.css'
import api from '../../services/api';

export default function Profile(){
  const [incidents, setIncidents] = useState([])
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
     }).then(response => {
        console.log(response.data);
        setIncidents(response.data)
     })
  }, [ongId]);

  async function handleDeleteIncident(id){
    try {
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));

    } catch (err) {
      alert('Erro ao deletar o caso, tente novamente!')
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={18} color="#A8A8B3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

