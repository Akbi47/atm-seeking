'use client'
import GlobalApi from '@/shared/GlobalApi';
import { BusinessList, CategoryList, MapView, RangeSelect, SelectRating, SkeltonLoading } from '@/components'
import { LoadScript } from "@react-google-maps/api"
import { UserLocationContext, SelectedBusinessContext } from '@/context';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'


export default function Home() {

  const { data: session } = useSession();
  const [category, setCategory] = useState('');
  const [radius, setRadius] = useState(2500);
  const [loading, setLoading] = useState(true);
  const [businessList, setBusinessList] = useState([]);
  const [businessListToken, setBusinessListToken] = useState('');
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);
  const router = useRouter();

  const googlePlaceAPI = useMemo(() => {
    if (category) {
      setLoading(true);
      GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng)
        .then(
          (response) => {
            setBusinessList(response.data.product.results);
            setBusinessListToken(response.data.product.next_page_token);
            setLoading(false);
          }
        )
    }
  }, [category, radius, userLocation])

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session, router]);

  useEffect(() => {
    googlePlaceAPI
  }, [category, radius, userLocation])

  return (
    <>
      {session?.user ? (
        <div className='grid grid-cols-1 md:grid-cols-6 h-screen'>
          <div className='p-2 col-span-2'>
            <CategoryList onCategoryChange={(value) => setCategory(value)} />
            <RangeSelect onRadiusChange={(value) => setRadius(value)} />
            {selectedBusiness.length !== 0 && <SelectRating onRatingChange={(value) => onRatingChange(value)} selectedBusiness={selectedBusiness} />}
          </div>
          <div className='col-span-4'>
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
              mapIds={['327f00d9bd231a33']}
            >
              <MapView businessList={businessList} token={businessListToken} />
            </LoadScript>

            {
              category && radius &&
              <div className='min-[1088px]:absolute min-[1088px]:bottom-1 min-[1088px]:w-[61%]
              ml-4 w-[90%] relative'>
                {!loading ? <BusinessList businessList={businessList} token={businessListToken} />
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
