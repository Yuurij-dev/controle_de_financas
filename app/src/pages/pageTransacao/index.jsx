import './styles.css'
import Select from 'react-select';
import { NumericFormat } from 'react-number-format';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

import axios from 'axios'

function PageTransacao() {
    const [receita, setReceita] = useState({
        tipo: 'receita',
        descricao: '',
        valor: null,
        data: new Date().toISOString().split('T')[0]
    })

    const options = [
        { value: 'salario', label: 'Salário' },
        { value: 'Renda Extra', label: 'Renda Extra' }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '12px', 
        }),
    };

    const closeTransacao = (e) => {
        const containerTransacao = document.querySelector('.container-page-transacao')
    
        containerTransacao.style.visibility = 'hidden'
    }

    const handleValorReceita = (values) => {
        const {floatValue} = values

        console.log(floatValue); 
        setReceita(prev => ({
            ...prev, valor : floatValue
        }))
    }

    const handleData = (e) => {
        const data = e.target.value
        setReceita(prev => ({
            ...prev, data: data
        }))
    }

    const handleDescricao = (e) => {
        const descricao = e.value
        setReceita(prev => ({
            ...prev, descricao: descricao
        }))
    }

    const handleReceita = async (e) => {
        e.preventDefault()

        if(receita.valor !== null && receita.data !== '' && receita.descricao !== ''){
           if(receita.valor != 0){
            try{
                await axios.post(`${process.env.VITE_BACKEND_URL}/receita`, receita)
                window.location.reload()
            } catch(err){
                console.log(err)
            }   
           }else{
            console.log("A receita deve ser maior que 0")
           }
        }else{
            console.log('preencha todos os campos')
        }
    }


    return (
    <div className="container-page-transacao">
        <div className="shadow"></div>

        <div className='pageTransacao flex flex-col gap-8'>
            <div className='remove'>
                <button onClick={closeTransacao}>
                    <FontAwesomeIcon icon={faXmark} size='1x'/>
                </button>
            </div>
            <div>
                <h3 className='font-[500]'>Adicionar Transação</h3>
                <span className='text-[#737373] text-[14px]'>Preencha os dados da nova transação</span>
            </div>

            <div id='typeToggle' className='w-full h-10 bg-zinc-100 flex justify-center rounded-[10px]'>

                <div id='receita' className='w-1/2  flex items-center justify-center rounded-[10px] font-[500'>
                    <span className='font-[500]'>Receita</span>
                </div>
            </div>

            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2.5'>
                    <label>Valor</label>
                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        fixedDecimalScale
                        decimalScale={2}
                        allowNegative={false}
                        className="border rounded-md px-3 py-2 w-full"
                        placeholder="R$ 0,00"
                        onValueChange={handleValorReceita}
                    />
                </div>

                <div className='flex flex-col gap-2.5'>
                    <label>Categoria</label>

                    <Select
                        options={options}
                        placeholder="Selecione uma categoria"
                        className="text-sm"
                        styles={customStyles}
                        onChange={handleDescricao}
                    />
                </div>

                {/* <div className='flex flex-col gap-2.5'>
                    <label>Descrição</label>
                    <input name='descricao' onChange={handleReceita} type="text" placeholder='Descrição da transação' />
                </div> */}

                <div className='flex flex-col gap-2.5'>
                    <label>Data</label>
                    <input type="date" onChange={handleData} defaultValue={new Date().toISOString().split('T')[0]}/>
                </div>
                <button onClick={handleReceita} className='bg-gray-300'>Enviar</button>
            </form>
        </div>
    </div>
    )
}

export default PageTransacao