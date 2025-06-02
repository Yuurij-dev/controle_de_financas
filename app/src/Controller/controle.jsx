import { useEffect, useState } from 'react'
import {Despesa, Saldo, Receitas } from '../Components'
import axios from 'axios'

import './style.css'

function Controle() {
  const [checkValor, setCheckValor] = useState(false)
  const [valorTotal, setValorTotal] = useState({
    saldo: 0,
    receitas: 0,
    despesas: 0,
  });

  useEffect(() => {
    const getValues = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transacoes`)

        const saldo = res.data.saldo_total
        const receitas = res.data.total_receitas
        const despesas = res.data.total_despesas

        setValorTotal({
          saldo: saldo,
          receitas: receitas,
          despesas: despesas
        })
        
        if(saldo === null && receitas === null && despesas === null){
          setCheckValor(true)
        }else{
          setCheckValor(false)
        }
      }catch (err) {
        console.log(err)
      }

    }
    getValues()

  }, [])



  return (
    <div className="w-full flex flex-wrap justify-between">
      {
          checkValor ? (
          <div className='container-card w-full grid gap-2'>
            <Saldo valor={0} />
            <Receitas valor={0} />
            <Despesa valor={0} />
          </div>
        ) : (
          <div className='container-card w-full grid gap-2'>
            <Saldo valor={valorTotal.saldo}/>
            <Receitas valor={valorTotal.receitas} />
            <Despesa valor={valorTotal.despesas} />
          </div>
        )
      }
    </div>
  );
}

export default Controle;