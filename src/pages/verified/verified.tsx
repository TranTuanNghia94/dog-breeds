import { Button } from '../../components/Button'
import { useNavigate } from "react-router-dom";
import React from 'react'

type Props = {}

export const Verified = (props: Props) => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/')
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
                    <Button className='w-[20rem] mt-4' size='md'>Resend Verification Email</Button>
                </div>
            </div>
        </div>
    )
}