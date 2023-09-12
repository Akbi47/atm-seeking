'use client'
import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useContext } from 'react'
import { BusinessItem } from '..'
import { SelectedBusinessContext } from '@/context'

const Marker = ({ business }) => {
    const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext)

    return (
        <div>
            <MarkerF
                position={business.geometry.location}
                onClick={() => setSelectedBusiness(business)}
                icon={{
                    url: '/circle.png',
                    scaledSize: {
                        width: 10,
                        height: 10
                    }
                }}
            >
                {
                    (selectedBusiness?.reference === business.reference)
                    && (
                        <OverlayView
                            position={business.geometry.location}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div className='ml-[-90px] mt-[-230px]'>
                                <BusinessItem business={business} showDir={true} />
                            </div>
                        </OverlayView>
                    )
                }
            </MarkerF>
        </div>
    )
}

export default Marker