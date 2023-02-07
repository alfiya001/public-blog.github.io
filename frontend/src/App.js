import React from 'react';
import './App.css';
import SignInOutContainer from './containers/index';

import Paging from "./components/Paging.tsx";
import Home from "./components/Home.tsx";
import Write from "./pages/Write";
import MyBlogs from "./components/MyBlogs";
import Demo from "./components/carddemo.tsx";
import SinglePost from "./components/SinglePost";
import UserList from "./pages/UserList";
import AuthorList from './pages/AuthorList';
import AdminBlogList from './pages/AdminBlogList';
import AuthorBlogList from './pages/AuthorBlogList';
import AdminDashboard from './pages/AdminDashboard';
import AuthorDashboard from "./pages/AuthorDashboard";
import EditBlog from "./pages/EditBlog";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <Home/> }/>
           <Route path="/write" element={<Write />} />
           <Route path="/my-blog" element={<MyBlogs />} />
           <Route path="/signin" element={ <SignInOutContainer/> }/>
           <Route path="/post/:id" element={ <SinglePost/> }/>
           <Route path="/user-list" element={<UserList />} />
           <Route path="/author-list" element={<AuthorList />} />
           <Route path="/admin-blog-list" element={<AdminBlogList />} />
           <Route path="/author-blog-list" element={<AuthorBlogList />} />
           <Route path="/admin-dashboard" element={<AdminDashboard />} />
           <Route path="/author-dashboard" element={<AuthorDashboard />} />
           <Route path="/edit-blog/:id" element={<EditBlog />} />
           <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;