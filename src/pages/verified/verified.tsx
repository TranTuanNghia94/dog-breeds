import { Button } from '../../components/Button'
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import { User } from 'firebase/auth';
import { getItem, KEY_STORAGE, removeItem } from '../../helper/localStorage';
import { useAuth } from '../../contexts/Auth/AuthContext';

type Props = {}

export const Verified = (props: Props) => {
    const { resendEmailVerification } = useAuth()
    const [info, setInfo] = React.useState<User | null>(null)

    useEffect(() => {
        const userInfo = getItem(KEY_STORAGE.USER_VERIFICATION) as User
        if (!userInfo) {
            goHome()
        }

        setInfo(userInfo)
    }, [])

    const navigate = useNavigate();

    const goHome = () => {
        removeItem(KEY_STORAGE.USER_VERIFICATION)
        navigate('/')
    }

    const resentEmail = async () => {
        try {
            await resendEmailVerification(info as User)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen text-center flex items-center justify-center bg-green-100'>
            <div className='place-items-center'>
                <div>Please verify your email</div>
                <br />
                <div>You're almost there! We sent an email to you</div>

                <div>Just click on the link in that email to complete your registration. If you don't see it, check your spam folder.</div>

                <div className='text-black-40 mt-10'>Still not receiving it? No problem. Just click on the button below.</div>
                <div className='flex justify-center gap-x-5'>
                    <Button className='w-[20rem] mt-4' size='md' variant='outline' onClick={goHome}>Go Home</Button>
                    <Button className='w-[20rem] mt-4' size='md' onClick={resentEmail}>Resend Verification Email</Button>
                </div>
            </div>
        </div>
    )
}