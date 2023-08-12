import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUserName] = useState('');
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${id}`)
            console.log(data);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
                setUserName(data?.UserBlogs.username);
            }

            console.log(blogs);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserBlogs();
    }, [])
   

    return (
        <>

            {blogs && blogs.map((blog) =>
                <BlogCard
                    id={blog._id}
                    isUser={true}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={username}
                    time={blog.createdAt}
                />
            )}
        </>
    )
}

export default UserBlogs