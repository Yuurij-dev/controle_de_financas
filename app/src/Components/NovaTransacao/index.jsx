import React from 'react'

function NovaTransacao() {
  const openReceita = (e) => {
    const containerTransacao = document.querySelector('.container-page-transacao')
    
    containerTransacao.style.visibility = 'visible'
  }

  return (
    <button onClick={openReceita} style={{padding:'10px'}} className='bg-[#212023] text-white rounded cursor-pointer'>Nova receita</button>
  )
}

export default NovaTransacao