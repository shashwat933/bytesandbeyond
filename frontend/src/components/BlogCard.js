import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css'


export default function BlogCard({ title, description, image, username, time, id, isUser }) {
    const navigate = useNavigate();
    const editHandler = () => {
        navigate(`/blog-details/${id}`)

    }


    return (
        <>
            <div className="mobile2:w-size2    w-size1 mb-10 rounded overflow-hidden shadow-lg">
                <div className='m-4 flex justify-between'> <div>
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-mine2 rounded-full ">
                    <span className="font-medium capitalize text-white ">{username[0]}</span>

                </div>
                    <span className="ml-4 capitalize text-lg font-medium  text-mine2 ">{username}</span></div>

                    {isUser && <div className='flex  items-center justify-between	'>

                        <i onClick={editHandler} className="cursor-pointer  fa-solid fa-pen fa-lg" size="2xl" style={{ color: "#1976d2", }}></i>

                    </div>}
                </div>
                <img className="h-sizeOfImage w-full" src={image} alt="Technical Blog" />
                <div className="px-6 py-4 ">
                    <div className="font-bold uppercase tracking-wide font-mine text-2xl  mb-2">{title}</div>
                    <p className="text-gray-700  text-md line-clamp-5 whitespace-pre-line  ">
                        {description}
                    </p>
                </div>

            </div>


        </>
    );
}
