import React from 'react'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import loginSvg from '../../assets/svg/login.svg'
import { Link, useNavigate } from 'react-router-dom'
import { IUserAuth } from './interface'
import { useAuth } from '../../contexts/Auth/AuthContext'

type Props = {}

export const Login = (props: Props) => {
  const { login, loading } = useAuth()
  const navigate = useNavigate();
  const [account, setAccount] = React.useState<IUserAuth>()
  const [error, setError] = React.useState<string>('')


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value === '') return
    setAccount({ ...account, [name as keyof IUserAuth]: value.trim() })
  }

  const signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await login(account?.email as string, account?.password as string)
      if (result) {
        navigate('/feed')
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-100'>
      <div className='bg-white gap-x-20 flex items-center justify-center p-8 rounded-lg h-[60vh] shadow-lg w-2/3 max-w-4/6 grid grid-cols-2'>
        <div>
          <img src={loginSvg} alt='logo' />
        </div>
        <div>
          <form onSubmit={signin}>
            <div className='text-center text-black-90 my-8'>MEMBER LOGIN</div>
            <div>
              <Input label='Email' required onChange={handleChange} name='email' />
              <Input label='Password' required type='password' onChange={handleChange} name='password' />
            </div>
            {error && <div className='text-red-500 text-center text-sm my-2'>{error}</div>}
            <Button size='md' type='submit'>Login</Button>
          </form>

          <div className='text-center text-black-40 mt-8'>
            <Link to='/signup' >Create Your Account &rarr;	</Link>
          </div>
        </div>
      </div>
    </div>
  )
}