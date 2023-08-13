import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard';
import { Container } from '@mui/material';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUserName] = useState('');
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${id}`)
            
            if (data?.success) {
                console.log(data);
                setBlogs(data?.userBlog.blogs);
                setUserName(data.userBlog.username);

            }



        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserBlogs();
    }, [])
    
   


    return (
        <>

            <Container sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {blogs && blogs.map((blog) =>
                    <BlogCard
                        key={blog._id}
                        id={blog?._id}
                        isUser={true}
                        title={blog?.title}
                        description={blog?.description}
                        image={blog?.image}
                        username={username}
                        time={blog?.createdAt}
                    />
                )}
            </Container>
        </>
    )
}

export default UserBlogs