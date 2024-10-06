import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../components/Card";
import { Button } from "../../components/Button";
import { ScrollArea } from "../../components/ScrollArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Tab";
import {
  Trophy,
  Heart,
  Loader2,
  X as XIcon,
} from 'lucide-react';
import { useBreeds } from '../../contexts/Breed/BreedContext';
import { NavBar } from '../../components/NavBar';

const UserProfile = () => {
  const navigate = useNavigate();
  const {
    favoriteBreeds,
    likedPhotos,
    loading,
    removeFavoriteBreed
  } = useBreeds();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <NavBar showFeed showLogout />

      <div className="mt-[10px] container mx-auto p-4 space-y-4">
        <Tabs defaultValue="subscribed">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subscribed">
              <Trophy className="mr-2 h-4 w-4" />
              Subscribed Breeds
            </TabsTrigger>
            <TabsTrigger value="liked">
              <Heart className="mr-2 h-4 w-4" />
              Liked Photos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscribed">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Breeds</CardTitle>
                <CardDescription>
                  You have subscribed to {favoriteBreeds.length} breed{favoriteBreeds.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {favoriteBreeds.map(breed => (
                    <Card key={breed}>
                      <CardHeader className="relative">
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => removeFavoriteBreed(breed)}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                        <CardTitle className="capitalize">{breed}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                {favoriteBreeds.length === 0 && (
                  <div className="text-center text-gray-500 space-y-4">
                    <p>You haven't subscribed to any breeds yet.</p>
                    <div className='w-[200px] m-auto'>
                      <Button variant="outline" onClick={() => navigate('/breed')}>
                        Go to breeds to Subscribe
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="liked">
            <Card>
              <CardHeader>
                <CardTitle>Liked Photos</CardTitle>
                <CardDescription>
                  You have liked {likedPhotos.length} photo{likedPhotos.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {likedPhotos.map((photo, index) => (
                      <Card key={index}>
                        <img
                          src={photo.imageUrl}
                          alt={photo.breedName}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <CardContent className="p-4">
                          <p className="font-medium capitalize">{photo.breedName}</p>
                          <p className="text-sm text-gray-500">
                            Liked on {photo.timestamp.toDate().toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {likedPhotos.length === 0 && (
                    <div className="text-center text-gray-500 space-y-4">
                      <p>You haven't liked any photos yet.</p>
                      <div className='w-[200px] m-auto'>
                        <Button variant="outline" onClick={() => navigate('/feed')}>
                          Go to Feed to Like Photos
                        </Button>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;