'use client'
import GlobalApi from '@/Shared/GlobalApi';
import { BusinessList, CategoryList, MapView, RangeSelect, SelectRating, SkeltonLoading } from '@/components'
import { LoadScript } from "@react-google-maps/api"
import { UserLocationContext } from '@/context';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'

export default function Home() {
  const { data: session } = useSession();
  const [category, setCategory] = useState('');
  const [radius, setRadius] = useState(2500);
  const [loading, setLoading] = useState(true);
  const [businessList, setBusinessList] = useState([])
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const router = useRouter();
  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session, router]);

  useEffect(() => {
    googlePlaceAPI();
  }, [category, radius])

  const googlePlaceAPI = () => {
    if (category) {
      setLoading(true);
      GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng).then(response => {
        setBusinessList(response.data.product.results);
        setLoading(false);
      })
    }
  }
  return (
    <>
      {session?.user ? (
        <div className='grid grid-cols-1 md:grid-cols-5 h-screen'>
          <div className='p-2 col-span-2'>
            <CategoryList onCategoryChange={(value) => setCategory(value)} />
            <RangeSelect onRadiusChange={(value) => setRadius(value)} />
            <SelectRating onRatingChange={(value) => onRatingChange(value)} />
          </div>
          <div className='col-span-3'>
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
              mapIds={['327f00d9bd231a33']}
            >
              <MapView businessList={businessList} />
            </LoadScript>

            {
              category && radius &&
              <div className='md:absolute md:bottom-1 md:w-[58%]
              ml-6 w-[90%] bottom-36 relative'>
                {!loading ? <BusinessList businessList={businessList} />
                  :
                  <div className='flex gap-16'>
                    {[1, 2, 3, 4].map((item, index) => (
                      <SkeltonLoading key={index} />
                    ))}
                  </div>
                }
              </div>
            }

          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
