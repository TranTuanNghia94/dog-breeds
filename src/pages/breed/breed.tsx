import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Card';
import { Button } from '../../components/Button';
import { IBreed } from './interface';
import { Input } from '../../components/Input';
import { useBreeds } from '../../contexts/Breed/BreedContext';
import { NavBar } from '../../components/NavBar';
import { Loader2 } from 'lucide-react';

type Props = {}

export const Breed = (props: Props) => {
    const { addListOfFavoriteBreeds, favoriteBreeds } = useBreeds();
    const navigate = useNavigate();

    const [breeds, setBreeds] = React.useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = React.useState<string[]>([]);
    const [keyword, setKeyword] = React.useState<string>('');
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
                const result = Object.entries(data.message as IBreed).flatMap(([key]) => {
                    return key
                }) as string[]

                setBreeds(result)
                setLoading(false);
            });
    }, []);


    useEffect(() => {
        if (favoriteBreeds.length > 0) {
            setSelectedBreeds(favoriteBreeds);
        }
    }, [favoriteBreeds]);

    const handleBreedSelect = (breed: string) => {
        if (selectedBreeds.includes(breed)) {
            setSelectedBreeds(selectedBreeds.filter(b => b !== breed));
        } else if (selectedBreeds.length < 3) {
            setSelectedBreeds([...selectedBreeds, breed]);
        }
    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setKeyword(value);
    }

    const handleSubmit = async () => {
        if (selectedBreeds.length > 0) {
            try {
                await addListOfFavoriteBreeds(selectedBreeds);
                navigate('/feed');
            } catch (error) {
                console.log(error);
            }
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div>
            <NavBar showFeed />

            <Card className="max-w-5xl mx-auto my-[10px]">
                <CardHeader>
                    <CardTitle>Select Your Favorite Dog Breeds</CardTitle>
                    <CardDescription className='my-4'>Choose up to 3 breeds</CardDescription>
                    <div className='pt-5'>
                        <Input label='Search breed' onChange={handleFilter} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[calc(65vh-100px)] overflow-y-auto px-4">
                        {breeds.map(breed => {
                            if (keyword === '' || breed.toLowerCase().includes(keyword.toLowerCase())) {
                                return (
                                    <Button
                                        key={breed}
                                        onClick={() => handleBreedSelect(breed)}
                                        variant={selectedBreeds.includes(breed) ? 'default' : "outline"}
                                        className="capitalize"
                                    >
                                        {breed}
                                    </Button>
                                )
                            }

                            return null
                        })}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedBreeds.length === 0}
                        >
                            View Dog Feed
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
