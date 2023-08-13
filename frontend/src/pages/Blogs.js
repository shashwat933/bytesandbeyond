import axios from 'axios';
import React, { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard';
import { Container, Typography } from '@mui/material';
import BlogDetails from './BlogDetails';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/blog/all-blog');
            if (data && data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllBlogs();
    }, [])

    if (blogs.length == 0) {
        return (
            <>
                <Typography variant='h1' textAlign={'center'}>
                    No blogs found
                </Typography>

            </>
        )
    }

    return (
        <>
            <Container sx={{ display: 'flex', flexWrap:'wrap'}}>
                {blogs && blogs.map((blog) =>
                    <BlogCard
                    key={blog._id}
                        id={blog?._id}
                        isUser={false}
                        title={blog?.title}
                        description={blog?.description}
                        image={blog?.image}
                        username={blog?.user?.username}
                        time={blog?.createdAt}
                    />
                )}
            </Container>


        </>
    )
}

export default Blogs