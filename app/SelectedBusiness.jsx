'use client'
import { useState } from 'react'
import {  SelectedBusinessContext } from '@/context';

const SelectedBusiness = ({ children }) => {
    const [selectedBusiness, setSelectedBusiness] = useState([]);
    return (
        <SelectedBusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
            {children}
        </SelectedBusinessContext.Provider>
    )
}

export default SelectedBusiness