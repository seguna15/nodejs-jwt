import React, { useState } from 'react'
import Header from '../../components/Layout/Header'
import Form from '../../components/Form';


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const buttonTitle = 'Create Post';

  const handleCreate = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/blogs', {title, body}, {withCredentials: true});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Form
        setTitle={setTitle}
        setBody={setBody}
        buttonTitle={buttonTitle}
        handlerFunction={handleCreate}
      />
    </>
  );
}

export default CreatePage