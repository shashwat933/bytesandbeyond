import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast'
import React, { useState } from 'react'

const NavigationPhone = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        try {
            dispatch(authActions.logout());
            toast.success('logout successfully');
            localStorage.clear();
            setIsClicked(!isClicked)
            navigate('/login');
        } catch (error) {
            console.log(error);
        }

    }
    let isLogin = useSelector(state => state.isLogin)
    isLogin = isLogin || localStorage.getItem('token');
    const [isClicked, setIsClicked] = useState(false)
    const buttonHandelr = () => {
        return setIsClicked(!isClicked)
    }

    const classes = `z-20 flex transition-translate-y duration-1000 transition-duration-1000 flex-col bg-mine2 py-4 text-white fixed top-0 w-full items-center ${!isClicked && '-translate-x-full'}`
    return (

        <div className='block sm:hidden relative '>
            <nav className=' transition duration-1000 ease-in-out flex bg-mine2 h-16 justify-center items-center' >
                <ul className='flex items-center  justify-between w-full text-white p-8'>
                    <li onClick={buttonHandelr}><i className="fa-solid fa-bars" style={{ color: "#ffffff", }}></i></li>
                    <li className='grow text-center text-2xl'>Bytes&Beyond</li>
                </ul>
            </nav>

            <nav className={classes} >
                <span onClick={buttonHandelr}><i className="cursor-pointer absolute top-4 right-3 fa-sharp fa-xl fa-solid fa-xmark" style={{ color: '#ffffff' }}></i></span>

                {isLogin && <><Button sx={{ color: '#fff' }} LinkComponent={Link} to="/blogs" onClick={buttonHandelr}>
                    Blogs
                </Button>
                    <Button sx={{ color: '#fff' }} onClick={buttonHandelr} LinkComponent={Link} to="/my-blogs" >
                        My Blogs
                    </Button>
                    <Button sx={{ margin: 1, color: "white" }} onClick={buttonHandelr} LinkComponent={Link} to="/create-blog" >
                        Create Blog
                    </Button></>}
                {!isLogin && <><Button sx={{ margin: 1, color: "white" }} onClick={buttonHandelr} LinkComponent={Link} to="/login" >  Login</Button>
                    <Button sx={{ margin: 1, color: "white" }} onClick={buttonHandelr} LinkComponent={Link} to="/register">Register</Button></>}
                {isLogin && <Button onClick={logoutHandler} sx={{ margin: 1, color: "white" }}>Logout</Button>}

            </nav>





        </div>
    )
}

export default NavigationPhone