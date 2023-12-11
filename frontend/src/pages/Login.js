import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import { BackendUrl } from '../App';
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({

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
        setIsLoading(true);
        e.preventDefault();
        try {
            const { data } = await axios.post(`${BackendUrl}/user/login`, { username: inputs.name, email: inputs.email, password: inputs.password });

            if (data && data.success) {
                localStorage.setItem('userId', data.user._id);
                localStorage.setItem('token', data.token);
                dispatch(authActions.login())
                toast.success('User login successfully');
                navigate('/blogs')
            }



        } catch (error) {
       
                setIsLoading(false);
                toast.error('Invalid username or password"');
            
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
                        Log in
                    </Typography>

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
                    >{isLoading ? 'Logging In...' : 'Log In'}</Button>
                    <Button
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        type='submit'
                        onClick={() => {
                            navigate('/register')
                        }}
                        color='primary'
                    >Not a user ? Please Register</Button>
                </Box>
            </form>
        </>
    )
}

export default Login