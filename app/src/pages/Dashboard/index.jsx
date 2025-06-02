
import {NovaTransacao, NovaDespesa, Transacoes } from '../../Components'

import Controle from '../../Controller/controle'

import PageTransacao from '../pageTransacao'
import PageDespesa from '../pageDespesa'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'
function Dashboard() {
  const navigate = useNavigate()
  const loggedIn = localStorage.getItem("loggedIn")


  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn")

    if(loggedIn !== "true"){
      navigate('/')
    }
  }, [navigate])
  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='container w-full max-w-[1100px] flex gap-7 flex-col justify-center items-center'>
      

      {
        loggedIn === "true" ? (
        <>
          <h1 className='text-3xl font-bold'>Controle de Finanças</h1>
          <div className='w-full flex gap-4 items-center justify-end'>
            <NovaTransacao/>
            <NovaDespesa/>
          </div>

          <Controle/>

          <Transacoes/>

          <PageTransacao/>
          <PageDespesa/>
          <button className='sair' onClick={handleLogout}>Sair</button>
        </>
        ) : (
          <div className='sem-acesso'>
            <div className="sem-acesso-content">
              <h1 className='text-2xl'>ERRO</h1>
              <span>Você Precisa estar logado para acessar essas informações</span>
              <button className='font-bold bg-[#212023] text-white' onClick={handleLogout}>Fazer Login</button>
            </div>
          </div>
        )
      }
      

      </div>
  )
}

export default Dashboard