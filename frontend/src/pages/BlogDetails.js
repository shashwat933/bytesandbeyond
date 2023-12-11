import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BackendUrl } from '../App'

const BlogDetails = () => {
   
    const navigate = useNavigate();
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const id = useParams().id;
    const [inputs, setInputs] = useState({

    })

    const token = localStorage.getItem('token');
    const deleteButtonHandler = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.delete(`${BackendUrl}/blog/delete-blog/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(data);
            if (data && data.success) {
                toast.success('Blog Deleted');

                navigate('/my-blogs');

            }
        } catch (error) {
            console.log(error);
        }
    }
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`${BackendUrl}/blog/get-blog/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (data && data.success) {

                setInputs({
                    title: data.blog.title,
                    description: data.blog.description,
                    image: data.blog.image
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBlogDetail();


    }, [id])

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoadingEdit(true);
        try {
            const { data } = await axios.put(`${BackendUrl}/blog/update-blog/${id}`,   {
                    title: inputs.title,
                    description: inputs.description,
                    image: inputs.image,
                    
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                },


            )
            if (data && data.success) {
                toast.success('Blog updated');
                navigate('/my-blogs');
            }
        } catch (error) {
            console.log(error);
        }
    }
    const changeHandler = (e) => {
        setInputs(prevValue => (
            {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        ))
    }
    return (
        <>
            <Box className='w-3/5 mobile1:w-11/12' padding={2} margin={'auto'}
                boxShadow={'10px 10px 20px #ccc'} display={"flex"} flexDirection={'column'} marginTop={'30px'}
            >
                <form className='w-3/5 mobile1:w-11/12 mx-auto flex flex-col' onSubmit={submitHandler}>

                    <Typography variant='h3' textAlign={"center"} fontWeight={'bold'} padding={3} color={'gray'} >Edit Blog</Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Title</InputLabel>
                    <TextField placeholder='Enter the title' value={inputs.title} name="title" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Description</InputLabel>

                    <TextField rows={4} multiline placeholder='Enter the description' value={inputs.description} name="description" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Image</InputLabel>
                    <TextField placeholder='Enter the imageUrl' value={inputs.image} name="image" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <div className='flex'>
                        <Button className=' w-56 mobile1:w-44 ' type='submit' color='primary' variant='contained' sx={{ margin: '0 auto', height: "3rem", marginTop: "15px" }}  >{isLoadingEdit ? 'Updating...' : 'Update'}</Button>

                    </div>




                </form>
                <Button className='w-56 mobile1:w-44' onClick={deleteButtonHandler} type='submit' color='error' variant='contained' sx={{ margin: '0 auto', height: "3rem", marginTop: "15px" }}  >{isLoading ? 'Deleting...' : 'Delete'}</Button>
            </Box>

        </>
    )
}

export default BlogDetails