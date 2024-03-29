import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BlogList, CreatePage, EditPage, HomePage, NoteFoundPage, PostPage, PrivatePage, SignInPage, SignUpPage } from "./Routes.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route element={<PrivatePage />}>
          <Route path="/create-blog" element={<CreatePage />} />
          <Route path="/admin/blogs" element={<BlogList />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
