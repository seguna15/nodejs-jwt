import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CreatePage, HomePage, PrivatePage, SignInPage, SignUpPage } from "./Routes.js";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route element={<PrivatePage />} >
          <Route path='/create-blog' element={<CreatePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
