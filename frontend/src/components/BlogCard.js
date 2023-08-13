import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function BlogCard({ title, description, image, username, time, id, isUser }) {
    const navigate = useNavigate();
    const editHandler = () => {
        navigate(`/blog-details/${id}`)
        
    }
    const deleteHandler = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`);
            console.log(data);
            if (data && data.success) {
                toast.success('Blog Deleted');
                console.log("HELLO");
                navigate('/blogs');

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card sx={{ width: "40%", height: "480px", margin: "auto", mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ":hover:": { boxShadow: "10px 10px 20px #ccc" } }}>


            <div style={{ display: "flex", justifyContent: "space-between" }}    >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
                            {username[0]}
                        </Avatar>
                    }

                    title={<Typography variant='h6'>{username}</Typography>}

                />
                {isUser &&
                    <Box display={'flex'}>
                        <IconButton onClick={editHandler} sx={{ marginLeft: 'auto' }}>
                            <ModeEditIcon />
                        </IconButton>
                        <IconButton onClick={deleteHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                }
            </div>


            <CardMedia
                component="img"
                height="50%"
                image={image}
                alt="Image"
            />
            <CardContent>
                <Typography variant="h6" fontSize={"20px"} fontWeight={"bold"} color="text.primary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>


        </Card>
    );
}
