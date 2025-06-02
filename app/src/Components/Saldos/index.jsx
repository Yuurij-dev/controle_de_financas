import './styles.css'

import { useState } from 'react'

function Saldo({valor}) {
  const valorFormated = valor.toLocaleString('pt-BR',{
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  valorFormated.replace(',', '.');

  return (
    <div className='card'>
        <h3>Saldo Total</h3>
        
        <div className='flex gap-2 items-center'>
          <span className={valor < 0 ? 'text-red-500' : 'text-green-500'}>R$ {valorFormated}</span>
        </div>
    </div>
  )
}

function Receitas({valor}) {
  const valorFormated = valor.toLocaleString('pt-BR',{
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  valorFormated.replace(',', '.');
  return (
    <div className='card'>
        <h3>Receitas</h3>

        <div className='flex gap-2 items-center'>
          <span className={valor < 0 ? 'text-red-500' : 'text-green-500'}>R$ {valorFormated}</span>
        </div>
    </div>
  )
}

function Despesa({valor}) {
  const valorFormated = valor.toLocaleString('pt-BR',{
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  valorFormated.replace(',', '.');

  return (
    <div className='card card-last'>
        <h3>Despesas</h3>

        <div className='flex gap-2 items-center'>
          <span className='text-red-500' >R$ {valorFormated}</span>         
        </div>
    </div>
  )
}

export { 
    Despesa,
    Saldo,
    Receitas
}