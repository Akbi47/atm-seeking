'use client'
import { useState } from 'react';
import { FaStar } from 'react-icons/fa'

const colors = {
    orange: '#FFBA5A',
    grey: '#a9a9a9'
}
const SelectRating = ({onRatingChange}) => {
    const stars = Array(5).fill(0);

    const [currentStar, setCurrentStar] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);

    const handleClick = value => setCurrentStar(value);
    const handleMouseOver = value => setHoverStar(value);
    const handleMouseLeave = () => setHoverStar(undefined);

    return (
        <div className='px-2 mt-3 flex flex-col' >
            <h2 className='font-bold'>Select Rating</h2>
            <div className='flex mt-2 py-2 mx-[-5px] items-center justify-center'>
                {stars.map((_, idx) => (
                    <FaStar
                        key={idx}
                        size={24}
                        className={`cursor-pointer`}
                        color={(hoverStar || currentStar) > idx ? colors.orange : colors.grey}
                        onClick={() => handleClick(idx + 1)}
                        onMouseOver={() => handleMouseOver(idx + 1)}
                        onMouseLeave={() => handleMouseLeave()}
                    />
                )
                )}
            </div>
            <textarea placeholder="Share details of your own experience at this place" name="" id="" cols="30" rows="10"
                className='mt-4 h-[100px] border-[1px] border-solid border-slate-400 rounded-md p-3 width-[300px] outline-none'
            >
            </textarea>
            <button className='mt-4 p-2 border-[1px] border-solid border-slate-400 rounded-md width-[300px] cursor-pointer'>Submit</button>

        </div>
    )
}
export default SelectRating