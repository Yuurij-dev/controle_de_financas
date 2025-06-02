
function NovaDespesa() {
  const openTransacao = (e) => {
    const containerTransacao = document.querySelector('.container-page-despesa')
    
    containerTransacao.style.visibility = 'visible'
  }

  return (
    <button onClick={openTransacao} style={{padding:'10px'}} className='bg-[#212023] text-white rounded cursor-pointer'>Nova despesa</button>
  )
}

export default NovaDespesa