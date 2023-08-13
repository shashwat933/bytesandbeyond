import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast'

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        try {
            dispatch(authActions.logout());
            toast.success('logout successfully');
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }

    }
    let isLogin = useSelector(state => state.isLogin)
    isLogin = isLogin || localStorage.getItem('userId');
    const [value, setValue] = useState()
    return (
        <>
            <AppBar position='sticky'  >
                <Toolbar>
                    <Typography variant='h4' sx={{ flexGrow: 1}} >
                        Bytes&Beyond
                    </Typography>
                    {isLogin && <Box display={'flex'}   >
                        
                            
                            <Button sx={{ color: '#fff' }} LinkComponent={Link} to="/blogs" >
                                Blogs
                            </Button>
                            <Button sx={{ color: '#fff' }} LinkComponent={Link} to="/my-blogs" >
                                My Blogs
                            </Button>
                            <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/create-blog" >
                                Create Blog
                            </Button>
                            {/* <Tab label="Blogs" LinkComponent={Link} to="/blogs" /> */}
                            {/* <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                            <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" /> */}
                        
                    </Box>}
                    <Box display={'flex'} >
                        {!isLogin && <><Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/login" >  Login</Button>
                            <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/register">Register</Button></>}
                        {isLogin && <Button onClick={logoutHandler} sx={{ margin: 1, color: "white" }}>Logout</Button>}
                    </Box>
                </Toolbar>


            </AppBar>
        </>
    )
}

export default Header