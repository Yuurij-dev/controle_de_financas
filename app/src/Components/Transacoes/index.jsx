import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import axios from 'axios'

// Terminar de consertar os valores iniciais
function Transacoes() {
  const [transacoes, setTransacoes] = useState([])
  const [reset, setReset] = useState(false) 

  useEffect(() => {
    const getTransacoes = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/controle`)
  
        
        if(res.data.length === 0){
          setReset(true)
        }else{
          setTransacoes(res.data)
        }
        
      }catch (err) {
        console.log(err)
      }
    }
    getTransacoes()
  }, [])

  const handleClick = async (id) => {
    try{
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/controle/`+id)
      setTransacoes(prev => prev.filter(item => item.id !== id))
      window.location.reload()
    } catch(err){
      console.log(err)
    }
  }
  return (
    <div className='transacoes w-full'>
        <div>
            <h1>Transações</h1>
            <p>Mostrando teste transações de Maio de 2025</p>
        </div>

        <div id='transacoes' className={`w-full flex gap-6 flex-col items-center justify-center`}>
            
            {/* {loading && <span>Atualizando lista...</span>} */}
            {
              transacoes.length === 0 ? (
                <span>Nenhuma transação encontrada</span>
              ): (
                transacoes.map((item) => (
                  <div key={item.id} className={`w-full transacao flex items-center ${item.tipo === "receita" ? "receita" : "despesa"}`}>
                    <div className='w-full transacao-div-1'>
                      <h1 className=''>{item.descricao}</h1>
                      <span className='text-sm'>{new Date(item.data).toLocaleDateString("pt-br")}</span>
                    </div>

                    <div className='flex items-center gap-6 transacao-div-2'>
                      <span className='valor text-[20px] font-bold'>{item.tipo === "receita" ? "+" : "-"}{item.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      <button onClick={() => handleClick(item.id)}><FontAwesomeIcon icon={faTrash} style={{ color: '#cbcbcb', cursor: 'pointer' }} /></button>
                    </div>
                  </div>
              ))
            )}
        </div>
    </div>
  )
}

export default Transacoes