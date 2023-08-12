import axios from 'axios';
import React, { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard';

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
    return (
        <>
            {blogs && blogs.map((blog) =>
                <BlogCard
                    id={blog?._id}
                    isUser={localStorage.getItem('userId') === blog?.user?._id}
                    title={blog?.title}
                    description={blog?.description}
                    image={blog?.image}
                    username={blog?.user?.username}
                    time={blog?.createdAt}
                />
            )}

        </>
    )
}

export default Blogs