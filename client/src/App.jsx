import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignupPage } from "./Routes.js";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
