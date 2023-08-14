import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function BlogCard({ title, description, image, username, time, id, isUser }) {
    const navigate = useNavigate();
    const editHandler = () => {
        navigate(`/blog-details/${id}`)

    }
    const deleteHandler = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`);
            console.log(data);
            if (data && data.success) {
                toast.success('Blog Deleted');
                console.log("HELLO");
                navigate('/blogs');

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="mobile2:w-size2 w-size1 mb-10 rounded overflow-hidden shadow-lg">
                <div className='m-4 flex justify-between'> <div><div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-mine2 rounded-full ">
                    <span className="font-medium text-white ">{username[0]}</span>

                </div>
                    <span className="ml-4 text-lg font-medium text-mine2 ">{username}</span></div>

                    {isUser && <div className='flex w-14 items-center justify-between	'>

                        <i onClick={editHandler} className="cursor-pointer  fa-solid fa-pen fa-lg" size="2xl" style={{ color: "#1976d2", }}></i>
                        <i onClick={deleteHandler} className=" cursor-pointer fa-sharp fa-solid fa-trash fa-lg" style={{ color: "#1976d2", }}></i>
                    </div>}
                </div>
                <img className="h-sizeOfImage w-full" src={image} alt="Technical Blog" />
                <div className="px-6 py-4 ">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 line-clamp-4 text-base">
                        {description}
                    </p>
                </div>

            </div>


        </>
    );
}
