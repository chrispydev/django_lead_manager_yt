import axios from 'axios';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteLeadState, fetchPostState } from '../../features/post/postSlice';
import { tokenConfig } from '../../lib/config';

export default function Leads() {
  const { leads } = useAppSelector((state) => state.leads);
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/leads', tokenConfig(token))
      .then((res) => {
        dispatch(fetchPostState(res.data));
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  const deleteLead: any = (id: string) => {
    axios
      .delete(`http://localhost:8000/api/leads/${id}/`, tokenConfig(token))
      .then((res) => {
        dispatch(deleteLeadState(id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>Leads</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead: any, index: any) => (
            <tr key={index}>
              <td>{lead?.name}</td>
              <td>{lead?.email}</td>
              <td>{lead?.message}</td>
              <td>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => deleteLead(lead.id)}
                >
                  {' '}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
