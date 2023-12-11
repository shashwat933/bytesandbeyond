

import { Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast'
const NavigationPC = (props) => {
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
    isLogin = isLogin || localStorage.getItem('token');
    return (
        <>

            <div className='hidden sm:block'>
                <nav className='flex bg-mine2 h-16  items-center justify-between  xl:px-60  md:px-30 ' >
                    <Typography variant='h4' sx={{color:'white'}} >
                        Bytes&Beyond
                    </Typography>
                    <ul className='flex justify-between items-center  text-white'>
                        {isLogin && <><Button sx={{margin:1, fontSize: '15px', color: '#fff' }} LinkComponent={Link} to="/blogs" >
                            Blogs
                        </Button>
                            <Button sx={{margin:1, fontSize: '15px', color: '#fff' }} LinkComponent={Link} to="/my-blogs" >
                                My Blogs
                            </Button>
                            <Button sx={{ margin: 1,fontSize:'15px', color: "white" }} LinkComponent={Link} to="/create-blog" >
                                Create Blog
                            </Button></>}
                        {!isLogin && <><Button sx={{ fontSize: '15px', margin: 1, color: "white" }} LinkComponent={Link} to="/login" >  Login</Button>
                            <Button sx={{ fontSize: '15px', margin: 1, color: "white" }} LinkComponent={Link} to="/register">Register</Button></>}
                        {isLogin && <Button onClick={logoutHandler} sx={{ margin: 1, fontSize: '15px', color: "white" }}>Logout</Button>}
                    </ul>

                </nav>
            </div>
        </>
    )
}

export default NavigationPC