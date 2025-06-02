import { useState, useEffect } from 'react'
import './style.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [checkErroLogin, setcheckErroLogin] = useState('')
    const [login, setLogin] = useState({
        username: '',
        pass: ''
    })

    const handleChangeLogin = (e) => {
        setLogin((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn")
        if(loggedIn === 'true'){
            navigate('/dashboard')
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault()
        if(login.username !== '' && login.pass !== '') {
            try{
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, login)
                localStorage.setItem("loggedIn", "true")
                navigate('/dashboard')
            }catch(err){
                setcheckErroLogin('Usuario ou senha incorreto!')
            }
        }else{
            setcheckErroLogin('Preencha todos os campos!')
        }
    }
    return (
        <div className='container-login w-full h-screen flex items-center justify-center flex-col'>
            <div className="content-login w-full max-w-[500px]">
                <div className="title">
                    <h1 className='text-3xl text-center font-bold'>Login</h1>
                </div>
                {
                    checkErroLogin && (
                        <div className='erro-login'>
                            <span className='text-red-600'>{checkErroLogin}</span>
                        </div>
                    )
                }
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col'>
                        <label>Username</label>
                        <input className='h-[40px]' onChange={handleChangeLogin} name='username' type="text" placeholder='admin'/>
                    </div>

                    <div className='flex flex-col'>
                        <label>Password</label>
                        <input className='h-[40px]' onChange={handleChangeLogin} name='pass' type="password" placeholder='admin'/>
                    </div>
                    
                    <button onClick={handleLogin}>Entrar</button>
                </div>
            </div>
        </div>
    )
}

export default Login