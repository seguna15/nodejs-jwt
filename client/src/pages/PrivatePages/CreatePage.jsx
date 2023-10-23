import React, { useState } from 'react'
import Header from '../../components/Layout/Header'
import Form from '../../components/Form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/blogs', {title, body}, {withCredentials: true});
      setLoading(false);
      setError(false);
      navigate("/");
    } catch (error) {
      setLoading(false)
      setError(true);
    }
  }

  return (
    <>
      <Header />
      {error ? (
        <p className="mt-3 text-red-600">Sorry your post was not created.</p>
      ) : null}
      <Form
        setTitle={setTitle}
        setBody={setBody}
        buttonTitle={loading ? "Loading..." : "Create Post"}
        handlerFunction={handleCreate}
      />
    </>
  );
}

export default CreatePage