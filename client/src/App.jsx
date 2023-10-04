import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, SignInPage, SignUpPage } from "./Routes.js";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
