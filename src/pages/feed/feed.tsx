import React, { useEffect } from 'react'
import logoutSvg from '../../assets/icon/logout.svg'
import userSvg from '../../assets/icon/user.svg'
import { useAuth } from '../../contexts/Auth/AuthContext'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { Heart } from 'lucide-react';

type Props = {}


export const Feed = (props: Props) => {
  const [dogImages, setDogImages] = React.useState<{ [key: string]: string[] }>({});
  const [imgLiked, setImgLiked] = React.useState<{ [key: string]: string }>({});
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();


  useEffect(() => {
    const fetchUserBreeds = async () => {
      const userRef = doc(db, 'users', user?.uid as string);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const { favoriteBreeds, likedPhotos } = userSnap.data();
        fetchDogImages(favoriteBreeds);

        if (likedPhotos) {
          setImgLiked(likedPhotos);
        }
      }
    };
    fetchUserBreeds();
  }, [user]);


  const fetchDogImages = async (breeds: string[]) => {
    const images: { [key: string]: string[] } = {};
    for (const breed of breeds) {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
      const data = await response.json();
      images[breed as string] = data.message as string[];
    }
    setDogImages(images);
    setLoading(false);
  };

  const handleLike = async (breed: string, imageUrl: string) => {
    const userRef = doc(db, 'users', user?.uid as string);

    setImgLiked({ ...imgLiked, [imageUrl]: imageUrl });

    // Add the new photo to the likedPhotos array
    await updateDoc(userRef, {
      likedPhotos: arrayUnion({
        breed,
        imageUrl,
        timestamp: new Date().toISOString()
      })
    });
  };

  if (loading) {
    return <div>Loading dog feed...</div>;
  }

  return (
    <div>
      <div className='relative'>
        <div className='fixed flex z-50 top-0 inset-x-0 m-auto w-1/2 max-w-1/2 h-[40px] bg-green-300 shadow-md drop-shadow-md p-2'>
          <div>
          </div>

          <div>
            <img src={userSvg} alt="" />
          </div>

          <div>
            <img src={logoutSvg} alt="" />
          </div>
        </div>
        <div className="gap-8 columns-3 px-10 my-[70px] z-10">
          {
            Object.keys(dogImages).map((breed: string) => {
              const listImg = dogImages[breed as string]
              console.log('listImg', listImg)
              console.log('breed', breed)


              return listImg.map((sub: string, index: number) => (
                <div className='w-full mb-8 backdrop-blur-[30px] rounded-[10px] relative'>
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