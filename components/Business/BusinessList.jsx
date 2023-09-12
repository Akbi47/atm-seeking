'use client'
import React, { useContext, useRef } from 'react'
import BusinessItem from './BusinessItem'
import { SelectedBusinessContext } from '@/context';
import { ScrollLeft, ScrollRight } from '..';

const BusinessList = ({ businessList }) => {
    const elementRef = useRef(null);
    const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);

    return (
        <div>
            <ScrollLeft elementRef={elementRef} />
            <div className='flex gap-10 overflow-scroll
                overflow-x-auto scrollbar-hide scroll-smooth'
                ref={elementRef}>
                {businessList.map((item, idx) => idx <= 7 && (
                    <div key={idx} onClick={() => setSelectedBusiness(item)}>
                        <BusinessItem business={item} />
                    </div>
                ))}
            </div>
            <ScrollRight elementRef={elementRef} />
        </div>

    )
}

export default BusinessList