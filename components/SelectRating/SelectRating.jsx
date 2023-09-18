'use client'
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'
import app from "./../../shared/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
    getDownloadURL, getStorage,
    ref, uploadBytes
} from "firebase/storage";
import { Toast } from '..';
import { useSession } from 'next-auth/react';

const colors = {
    orange: '#FFBA5A',
    grey: '#a9a9a9'
}
const SelectRating = ({ onRatingChange, selectedBusiness }) => {
    const stars = Array(5).fill(0);
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;


    const [currentStar, setCurrentStar] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);

    const handleClick = value => setCurrentStar(value);
    const handleMouseOver = value => setHoverStar(value);
    const handleMouseLeave = () => setHoverStar(undefined);

    const [inputs, setInputs] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [file, setFile] = useState();
    const [submit, setSubmit] = useState(false);

    const { data: session } = useSession();
    const db = getFirestore(app);
    const storage = getStorage(app);


    useEffect(() => {
        if (selectedBusiness) {
            let photo_ref = selectedBusiness?.photos ? selectedBusiness?.photos[0]?.photo_reference : '';
            photo_ref = `https://maps.googleapis.com/maps/api/place/photo?${encodeURI(`maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_API_KEY}`)}`
            setInputs((values) => ({ ...values, place_img: photo_ref }));
            setInputs((values) => ({ ...values, place_name: selectedBusiness.name }));
            setInputs((values) => ({ ...values, place_address: selectedBusiness.formatted_address }));
        }
    }, [selectedBusiness]);


    useEffect(() => {
        if (currentStar) {
            setInputs((values) => ({
                ...values,
                star: currentStar
            }));
        }
    }, [currentStar]);

    useEffect(() => {
        if (session) {
            setInputs((values) => ({ ...values, userName: session.user?.name }));
            setInputs((values) => ({ ...values, userImage: session.user?.image }));
            setInputs((values) => ({ ...values, email: session.user?.email }));
        }
    }, [session]);

    useEffect(() => {
        if (submit === true) {
            savePost();
            setInputs({});
        }
    }, [submit])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowToast(true);
        setCurrentStar(0);
        const textarea = document.querySelector(`textarea[name="comment"]`);
        textarea.value = '';
        const fileInput = document.querySelector(`input[name="img-review"]`);
        fileInput.value = ''
        
        const storageRef = ref(storage, 'atm-seeking/' + file?.name);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).then(resp => {
            getDownloadURL(storageRef).then(async (url) => {
                setInputs((values) => ({
                    ...values,
                    img: url
                }));
                setSubmit(true);
            })
        });
    };

    const savePost = async () => {
        await setDoc(doc(db, "review", Date.now().toString()), inputs);
    }
    console.log(inputs);

    return (
        <div className='px-2 mt-3 flex flex-col' >
            {showToast ? (
                <div className="absolute top-10 left-67 z-10">
                    <Toast
                        msg={"Post Created Successfully"}
                        closeToast={() => setShowToast(false)}
                    />
                </div>
            ) : null}
            <h2 className='font-bold'>Select Rating</h2>
            <div className='flex mt-2 py-2 mx-[-5px] items-center justify-center'>
                {stars.map((_, idx) => (
                    <FaStar
                        key={idx}
                        size={24}
                        className={`cursor-pointer ${(hoverStar > idx) && (hoverStar === idx + 1) ? 'scale-125' : 'scale-100'}`}
                        color={(hoverStar || currentStar) > idx ? colors.orange : colors.grey}
                        onClick={() => handleClick(idx + 1)}
                        onMouseOver={() => handleMouseOver(idx + 1)}
                        onMouseLeave={() => handleMouseLeave()}
                    />
                )
                )}
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                <textarea placeholder="Share details of your own experience at this place" cols="30" rows="10"
                    className='mt-4 h-[100px] border-[1px] border-solid border-slate-400 rounded-md p-3 w-[430px] outline-none'
                    id="comment"
                    name="comment"
                    onChange={handleChange}
                >
                </textarea>
                <div className='flex gap-10 '>
                    <input type="file"
                        name='img-review'
                        onChange={e => {
                            setFile(e.target.files[0]);
                        }}
                        accept='image/gif, image/png, image/jpg, image/jpeg'
                        className='mt-4 p-1 border-[1px] rounded-md'
                    />
                    <button className='mt-4 p-2 border-[1px] border-solid bg-blue-500 text-white 
            rounded-md width-[300px] cursor-pointer hover:scale-95'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
export default SelectRating