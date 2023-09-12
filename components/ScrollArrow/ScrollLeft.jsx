import React from 'react'

const ScrollLeft = ({ elementRef }) => {
    const srollToLeft = (element) => {
        element.scrollLeft -= 500;
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            onClick={() => srollToLeft(elementRef.current)}
            strokeWidth={1.5} stroke="currentColor"
            className="z-10 w-8 h-8 absolute rotate-180 top-[35%]
            bg-gray-300 cursor-pointer p-1 rounded-full text-white">
            <path strokeLinecap="round"
                strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    )
}

export default ScrollLeft