import { Route, Routes } from 'react-router-dom';

import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register'
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import { Toaster } from 'react-hot-toast'
import NavigationPC from './components/HeaderPc'
import NavigationPhone from './components/HeaderMobile';
import Footer from './components/Footer';
export const BackendUrl ="https://bytesandbeyond.onrender.com";



function App() {

  
  return (
    <>
    
      <NavigationPC />
      <NavigationPhone />
      <Toaster />
      <Routes >
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/my-blogs' element={<UserBlogs />} />
        <Route path='/blog-details/:id' element={<BlogDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-blog' element={<CreateBlog />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
