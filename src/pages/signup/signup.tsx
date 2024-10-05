import React from 'react'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import signupSvg from '../../assets/svg/signup.svg'
import { Link, useNavigate } from 'react-router-dom'
import { IUserRegister } from './interface'
import { useAuth } from '../../contexts/Auth/AuthContext'

type Props = {
    a?: string
}

export const SignUp = (props: Props) => {
    const [account, setAccount] = React.useState<IUserRegister>()
    const navigate = useNavigate();

    const { signup } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (value === '') return
        setAccount({ ...account, [name as keyof IUserRegister]: value.trim() })
    }


    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await signup(account?.email as string, account?.password as string)
            if (result) {
                navigate('/verified')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='min-h-screen flex items-center justify-center bg-green-100'>
            <div className='bg-white gap-x-20 flex items-center justify-center p-8 rounded-lg h-[60vh] shadow-lg w-2/3 max-w-4/6 grid grid-cols-2'>
                <div>
                    <img src={signupSvg} alt='logo' />
                </div>
                <div>
                    <form onSubmit={handleSumbit} >
                        <div className='text-center text-black-90 my-8'>REGISTER MEMEBER</div>
                        <div>
                            <Input onChange={handleChange} name='email' label='Email' required maxLength={200} minLength={10} />
                            <Input onChange={handleChange} name='password' label='Password' required type='password' maxLength={150} minLength={5} />
                        </div>
                        <Button size='md' type='submit'>Register</Button>
                    </form>

                    <div className='text-center text-black-40 mt-8'>
                        <Link to='/login'>Go To login &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}