'use client'
import {
    collection, deleteDoc, doc, getDocs,
    getFirestore, query, where
} from 'firebase/firestore';
import app from '@/shared/FirebaseConfig'
import { useState, useEffect } from 'react';

const ReviewPost = () => {

    const db = getFirestore(app);
    const [review, setReview] = useState([])
    useEffect(() => {
        getReview();
    }, [])

    const getReview = async () => {
        const querySnapshot = await getDocs(collection(db, "review"));
        querySnapshot.forEach((doc) => {
            setReview(review => [...review, doc.data()]);
        });
    }
    return (
        <>
            <div className='flex justify-center w-full '>
                <div className='mt-3 ml-3 w-[900px] flex flex-wrap justify-start gap-5 '>
                    {review ? review.map((post, idx) => (
                        <div key={idx} className="flex flex-col w-max-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 ">
                            <img className="rounded-t-lg w-full h-[180px] object-cover"
                                src={post.place_img ? post.place_img : post.img} alt="banner" />
                            <div className="p-5">
                                <h5 className="mb-2 w-[200px] line-clamp-1  text-xl font-normal tracking-tight text-cyan-800 dark:text-white">
                                    {post.place_name}
                                </h5>
                                <p className="mb-3 w-[200px] line-clamp-3 font-normaltext-gray-700 dark:text-gray-400">
                                    {post.place_address}
                                </p>
                                <div className='flex items-center text-sm font-bold gap-2 mb-2'>
                                    <img className='rounded-full w-[40px] h-[40px]'
                                        src={post.userImage}
                                    />
                                    {post.userName}
                                </div>
                                <div className='flex  w-[200px] h-[100px] items-center line-clamp-2 text-[#70757A] gap-2 mb-2'>
                                    {post.comment}
                                </div>

                                <div className='flex gap-1 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="currentColor"
                                        className={`w-5 h-5 ${post.star ? 'text-yellow-500' : 'text-gray-300'}`}
                                    >
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                    <h2 className='text-[15px] font-bold'>
                                        {post.star ? post.star : 0}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))
                        : null
                    }
                </div>
            </div>
        </>
    )
}
export default ReviewPost