import React from 'react'
import { useAuth } from '../contexts/Auth/AuthContext';
import { Card, CardContent, CardDescription } from './Card';
import { Button } from './Button';
import { Avatar, AvatarFallback } from './Avatar';
import { useNavigate } from 'react-router-dom';

type Props = {
    showBreeds?: boolean
    showLogout?: boolean
    showFeed?: boolean
    className?: string
}

export const NavBar = (props: Props) => {
    const { showBreeds = false, showLogout = false, showFeed = false, className } = props
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const goToFeed = () => {
        navigate('/feed')
    }

    const goToBreeds = () => {
        navigate('/breed')
    }

    const goToMyPage = () => {
        navigate('/user-profile')
    }

    const navigateToLogin = () => {
        logout()
        navigate('/login')
    }


    return (
        <Card className={`w-full bg-grey-50 ${className}`}>
            <CardContent className="flex justify-between items-center py-2">
                <CardDescription>Hey, {user?.email}</CardDescription>
                <div className='flex gap-x-2'>
                    {
                        showBreeds && (
                            <div className='w-[100px] py-2' onClick={goToBreeds}>
                                <Button variant="outline">Breeds</Button>
                            </div>
                        )
                    }

                    {
                        showFeed && (
                            <div className='w-[100px] py-2' onClick={goToFeed}>
                                <Button variant="outline">Feed</Button>
                            </div>
                        )
                    }

                    {
                        showLogout && (
                            <div className='w-[100px] py-2' onClick={navigateToLogin}>
                                <Button variant="danger" className=''>Logout</Button>
                            </div>
                        )
                    }

                    <Avatar onClick={goToMyPage}>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </div>
            </CardContent>
        </Card>
    )
}