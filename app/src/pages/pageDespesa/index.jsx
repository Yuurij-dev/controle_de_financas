import './styles.css'
import Select from 'react-select';
import { NumericFormat } from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';

function PageDespesa() {
    const [isLoading, setLoading] = useState(false)
    const [despesa, setDespesa] = useState({
        tipo: 'despesa',
        descricao: '',
        valor: null,
        data: new Date().toISOString().split('T')[0]
    })

    const options = [
        { value: 'lazer', label: 'Lazer' },
        { value: 'moradia', label: 'Moradia' },
        { value: 'agua', label: 'Água' },
        { value: 'luz', label: 'Luz' },
        { value: 'internet', label: 'Internet' },
        { value: 'academia', label: 'Academia' },
        { value: 'compras_casa', label: 'Compras de Casa' },
        { value: 'alimentacao', label: 'Alimentação' },
        { value: 'transporte', label: 'Transporte' },
        { value: 'saude', label: 'Saúde' },
        { value: 'educacao', label: 'Educação' },
        { value: 'outros', label: 'Outros' }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '12px', 
        }),
    };

    const closeTransacao = (e) => {
        const containerTransacao = document.querySelector('.container-page-despesa')
    
        containerTransacao.style.visibility = 'hidden'
    }

    const handleData = (e) => {
        const data = e.target.value
        setDespesa(prev => ({
            ...prev, data: data
        }))
    }
    const handleDescricao = (e) => {
        const descricao = e.value
        setDespesa(prev => ({
            ...prev, descricao: descricao
        }))
    }
    const handleValorDespesa = (values) => {
        const {floatValue} = values
        setDespesa(prev => ({
            ...prev, valor: floatValue
        }))
    }
    const handleDespesa = async (e) => {
        e.preventDefault()

        if(despesa.valor !== null && despesa.data !== '' && despesa.descricao !== ''){
            if(despesa.valor != 0){
                try{
                    setLoading(true)
                    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/despesa`, despesa)
                    window.location.reload()
                }catch(err){
                    console.log(err)
                }finally {
                    setLoading(false)
                }
            }else{
                console.log("A despesa deve ser maior que 0")
            }
        }else{
            console.log("Preencha todos os campos.")
        }
    }
    return (
    <div className="container-page-despesa">
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

                <div id='despesa' className='w-1/2  flex items-center justify-center rounded-[10px] font-[500]'>
                    <span className='font-[500]'>Despesa</span>
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
                        onValueChange={handleValorDespesa}
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

                <div className='flex flex-col gap-2.5'>
                    <label>Data</label>
                    <input type="date" onChange={handleData} defaultValue={new Date().toISOString().split('T')[0]}/>
                </div>
                {isLoading ? (
                    <button className='submit-button bg-gray-300 '>carregando...</button>
                ): (    
                    <button onClick={handleDespesa} className='submit-button bg-gray-300 '>Enviar</button>
                )}
                
            </form>
        </div>
    </div>
    )
}

export default PageDespesa