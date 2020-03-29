import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { FiArrowLeft } from 'react-icons/fi'

import './style.css';
import logoImg from '../../assets/logo.svg'

export default function NewIncident(){
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ value, setValue ] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incident', data, {
        headers: {
          Authorization: ongId
        }
      })

      history.push('/profile')
    } catch (err) {
      console.log(err)
      //alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-conteiner">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o inicio
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
