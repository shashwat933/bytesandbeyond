import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const CreateBlog = () => {
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/blog/create-blog',
                {
                    title: inputs.title,
                    description: inputs.description,
                    image: inputs.image,
                    user: id
                }

            )
            if (data && data.success) {
                toast.success('Blog created');
                navigate('/my-blogs');
                setInputs({
                    title: '',
                    description: '',
                    image: ''
                });
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
            <form onSubmit={submitHandler}>
                <Box width={'50%'} border={3} borderRadius={10} padding={3} margin={'auto'}
                    boxShadow={'10px 10px 20px #ccc'} display={"flex"} flexDirection={'column'} marginTop={'30px'}
                >
                    <Typography variant='h2' textAlign={"center"} fontWeight={'bold'} padding={3} color={'gray'} >Create a blog</Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Title</InputLabel>
                    <TextField placeholder='Enter the title' value={inputs.title} name="title" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Description</InputLabel>
                    <TextField placeholder='Enter the description' value={inputs.description} name="description" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 'bold' }}>Image</InputLabel>
                    <TextField placeholder='Enter the imageUrl' value={inputs.image} name="image" onChange={changeHandler} margin='normal' variant='outlined' required />
                    <Button type='submit' color='primary' variant='contained' sx={{ width: '50%', margin: '0 auto', height: "3rem", marginTop: "15px" }}  >Submit</Button>


                </Box>


            </form>
        </>
    )
}

export default CreateBlog