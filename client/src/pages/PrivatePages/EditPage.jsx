import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { STATUS } from '../../Status';
import Header from '../../components/Layout/Header';
import Form from '../../components/Form';
import axios from 'axios';

const EditPage = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')
    const [fetchStatus, setFetchStatus] = useState(STATUS.IDLE);
    const [editStatus, setEditStatus] = useState(STATUS.IDLE);
    const [error, setError] = useState('null');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogPost = async() => {
            setFetchStatus(STATUS.LOADING);
            try {
                const response = await axios.get(`/blogs/${id}`, {
                  withCredentials: true,
                });
                
                setTitle(response?.data?.title);
                setBody(response?.data?.body);
                setFetchStatus(STATUS.SUCCESSFUL);
            } catch (error) {
                console.log(error);
                setError(error.response);
                setFetchStatus(STATUS.ERROR);
            }
        }
        fetchBlogPost();
    },[])

    const fetchStatusObj = {
        isLoading: fetchStatus === STATUS.LOADING,
        isSuccessful: fetchStatus === STATUS.SUCCESSFUL,
        isError: fetchStatus === STATUS.ERROR,
    }

    /* Method to handle Blogpost editing by ID */
    const handleEdit = async (e) => {
        e.preventDefault();
        setEditStatus(STATUS.LOADING)
        try {
            const response = await axios.put(`/blogs/${id}`, {title, body}, {withCredentials: true});
            setEditStatus(STATUS.SUCCESSFUL)
            navigate('/admin/blogs')
        } catch (error) {
            console.log(error);
            setError(error.response);
            setEditStatus(STATUS.ERROR);
        }
    }

    const editStatusObj = {
      isLoading: editStatus === STATUS.LOADING,
      isSuccessful: editStatus === STATUS.SUCCESSFUL,
      isError: editStatus === STATUS.ERROR,
    };
    
    
    
  return (
    <>
      <Header />
      {fetchStatusObj.isError  || editStatusObj.isError ? (
        <p className="mt-3 text-red-600">{error}</p>
      ) : null}
      <Form
        setTitle={setTitle}
        title={title}
        setBody={setBody}
        body={body}
        buttonTitle={editStatusObj.isLoading ? "Loading..." :"Edit Post"}
        handlerFunction={handleEdit}
      />
    </>
  );
}

export default EditPage