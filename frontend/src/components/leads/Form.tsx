import { useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';

import { useAppDispatch } from '../../app/hooks';

import { setPostState } from '../../features/post/postSlice';
import { tokenConfig } from '../../lib/config';
import { authFail } from '../../features/messages/messageSlice';

export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();
  const alert = useAlert();

  const resetData = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const lead = { name, email, message };

    axios
      .post('http://localhost:8000/api/leads/', lead, tokenConfig(token))
      .then((res) => {
        alert.success('leads addedd successfully');
        dispatch(setPostState(res.data));
        resetData();
      })
      .catch((err) => {
        dispatch(authFail(err.response.data['email'].toString()));
      });
  };

  return (
    <div className='card card-body mt-4 mb-4'>
      <h2>Add Lead</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input
            className='form-control'
            type='text'
            name='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input
            className='form-control'
            type='email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='form-group'>
          <label>Message</label>
          <textarea
            className='form-control'
            // type='text'
            name='message'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
