'use client'
import { useState } from 'react'
import Data from '@/Shared/Data'
import Image from 'next/image';

const CategoryList = ({ onCategoryChange }) => {
    const data = Data.CategoryListData;
    const [categoryList, setCategoryList] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState();

    return (
        <div>
            <h2 className='font-bold'>
                Select ATM
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                {categoryList.map((item, idx) =>
                (
                    <div className={`flex flex-col justify-center items-center 
                        bg-slate-50 p-2 m-2 rounded-lg cursor-pointer outline-2
                        hover:bg-transparent hover:border hover:border-blue-400 hover:scale-90
                         
                        ${selectedCategory === idx ? `scale border-[1px]` : null}
                        `}
                        onClick={() => {
                            setSelectedCategory(idx);
                            onCategoryChange(item.value);
                        }}
                        key={idx}
                    >
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={40}
                            height={40}
                        />
                        {item.name}
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default CategoryList