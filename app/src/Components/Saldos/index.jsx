import './styles.css'

import { useState } from 'react'

function Saldo({valor}) {
  const valorFormated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
  
  return (
    <div className='card'>
        <h3>Saldo Total</h3>
        
        <div className='flex gap-2 items-center'>
          <span className={valor < 0 ? 'text-red-500' : 'text-green-500'}>{valorFormated}</span>
        </div>
    </div>
  )
}

function Receitas({valor}) {
  const valorFormated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
  return (
    <div className='card'>
        <h3>Receitas</h3>

        <div className='flex gap-2 items-center'>
          <span className={valor < 0 ? 'text-red-500' : 'text-green-500'}>{valorFormated}</span>
        </div>
    </div>
  )
}

function Despesa({valor}) {
  const valorFormated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
  return (
    <div className='card card-last'>
        <h3>Despesas</h3>

        <div className='flex gap-2 items-center'>
          <span className='text-red-500' >{valorFormated}</span>         
        </div>
    </div>
  )
}

export { 
    Despesa,
    Saldo,
    Receitas
}