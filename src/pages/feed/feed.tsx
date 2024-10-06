import React, { useEffect } from 'react'
import { Heart, Loader2 } from 'lucide-react';
import { useBreeds } from '../../contexts/Breed/BreedContext'
import { NavBar } from '../../components/NavBar';

type Props = {}

export const Feed = (props: Props) => {
  const [dogImages, setDogImages] = React.useState<{ [key: string]: string[] }>({});
  const [imgLiked, setImgLiked] = React.useState<{ [key: string]: string }>({});
  const [loading, setLoading] = React.useState(true);
  const { favoriteBreeds, likePhoto } = useBreeds();


  useEffect(() => {
    fetchDogImages(favoriteBreeds);
  }, [favoriteBreeds]);


  const fetchDogImages = async (breeds: string[]) => {
    const images = await Promise.all(breeds.map(async (breed) => {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
      const data = await response.json();
      return { [breed]: data.message };
    }));

    const formattedImages = images.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    setDogImages(formattedImages);
    setLoading(false);
  };

  const handleLike = async (breed: string, imageUrl: string) => {
    likePhoto(breed, imageUrl);
    setImgLiked({ ...imgLiked, [imageUrl]: imageUrl });
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
      <div className='relative'>
        <NavBar showBreeds className='z-50 fixed top-0' />

        {favoriteBreeds.length === 0 && <div className='text-center text-black-40  my-[70px]'>You haven't subscribed to any breeds yet.</div>}
        <div className="gap-8 columns-3 px-10 my-[70px] z-10">
          {
            Object.keys(dogImages).map((breed: string) => {
              const listImg = dogImages[breed as string]
              return listImg.map((sub: string, index: number) => (
                <div key={index} className='w-full mb-8 backdrop-blur-[30px] rounded-[10px] relative'>
                  <img key={index} src={sub} alt="" className='w-full rounded-[10px] hover:backdrop-blur-lg' />
                  <div className='bottom-2 left-2 absolute bg-white px-2 rounded-[10px] gap-x-2 flex p-2 border-grey-200 border'>
                    <div onClick={() => handleLike(breed, sub)}>
                      <Heart className={`mr-2 stroke-yellow-600 hover:scale-125 ${sub === imgLiked[sub] && 'fill-yellow-600'} `} />
                    </div>
                    <div>{breed}</div>
                  </div>
                </div>
              ))
            })
          }
        </div>
      </div>
    </div>
  )
}