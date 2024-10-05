import React from 'react'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import login from '../../assets/svg/login.svg'
import { Link } from 'react-router-dom'

type Props = {}

export const Login = (props: Props) => {

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-100'>
      <div className='bg-white gap-x-20 flex items-center justify-center p-8 rounded-lg h-[60vh] shadow-lg w-2/3 max-w-4/6 grid grid-cols-2'>
        <div>
          <img src={login} alt='logo' />
        </div>
        <div>
          <div className='text-center text-black-90 my-8'>MEMBER LOGIN</div>
          <div>
            <Input label='Email' required />
            <Input label='Password' required type='password' />
          </div>
          <Button size='md'>Login</Button>

          <div className='text-center text-black-40 mt-8'>
            <Link to='/signup' >Create Your Account &rarr;	</Link>
          </div>
        </div>
      </div>
    </div>
  )
}