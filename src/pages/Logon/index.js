import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import './style.css';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api'

export default function Logon(){
  const [ id, setId ] = useState('');
  const history = useHistory()

  async function handleLogon(e){
    e.preventDefault();

    try {
      const response = await api.post('login', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile')
    } catch (err) {
      alert('Falha no login, tente novamente!')
    }
  }

  return (
    <div className="logon-container">
      <section className="from">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

            <input
              placeholder="Sua ID"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <button type="submit" className="button">Entrar</button>
            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
              Não tenho um cadastros
            </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  )
}
