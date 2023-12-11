import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import toast from 'react-hot-toast';
import { BackendUrl } from '../App';

const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })
    const changeHandler = (e) => {
        setInputs(prevState => {
            return ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        }
        )
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post(`${BackendUrl}/user/register`, { username: inputs.name, email: inputs.email, password: inputs.password });
           
            if (data.success) {
                toast.success('User registered successfully');
                navigate('/login')
            }
         


        } catch (error) {
            if(error.response.status===401){
                toast.error('User already registered ');
                navigate('/login')
            }
            console.log(error);
        }

    }


    return (
        <>
            <form onSubmit={submitHandler}>

                <Box
                    maxWidth={450}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent='center'
                    margin="auto"
                    marginTop={5}
                    boxShadow={"10px 10px 20px #ccc"}
                    padding={3}
                    borderRadius={5}
                >
                    <Typography variant='h4'
                        sx={{ textTransform: "uppercase" }}
                        padding={3}
                        textAlign={'center'}
                    >
                        Register
                    </Typography>
                    <TextField placeholder='name'
                        name='name'
                        value={inputs.name}
                        onChange={changeHandler}
                        margin='normal'
                        type={'text'}
                        required />
                    <TextField placeholder='email'
                        name='email'
                        margin='normal'
                        value={inputs.email}
                        onChange={changeHandler}
                        type={'email'}
                        required />
                    <TextField placeholder='password'
                        name='password'
                        value={inputs.password}
                        onChange={changeHandler}
                        margin='normal'
                        type={'password'}
                        required />
                    <Button
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        type='submit'
                        variant='contained'
                        color='primary'
                    >{isLoading?'Registering...':'Register'}</Button>
                    <Button
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        type='submit'
                        onClick={() => {
                            navigate('/login')
                        }}
                        color='primary'
                    >Already Registered ? Please Login</Button>
                </Box>
            </form>
        </>
    )
}

export default Register