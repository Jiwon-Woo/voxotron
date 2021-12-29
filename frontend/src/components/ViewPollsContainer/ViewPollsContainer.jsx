import { React, useEffect, useState } from 'react';
// import { React, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewPollsContainer = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleOnUpdate = e => {
    e.preventDefault();
    navigate('./update', {
      state: {
        begin_at: data.begin_at,
        end_at: data.end_at,
        nbr_voices: data.nbr_voices,
        logins_cands: data.logins_cands,
        logins_voters: data.logins_voters,
      },
    });
  };
  const handleOnDelete = e => {
    e.preventDefault();
    axios
      .delete('/api/7')
      .then(response => {
        // handle success
        console.log(response);
        navigate('./');
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get('/api/', {
        withCredentials: true,
      })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  /*
  return (
    <div className="view-polls-container">
      <h1>Poll List</h1>
      <div>begin_at : {data && data.begin_at}</div>
      <div>end_at : {data && data.end_at}</div>
      <div>nbr_voices : {data && data.nbr_voices}</div>
      <div>logins_voters : {data && data.logins_voters}</div>
      <div>logins_cands : {data && data.logins_cands}</div>
      <button onClick={deleteApi}>DELETE</button>
      {data.map(d => (
        <div key={d}>
          <br />
          <div>{d.begin_at}</div>
          <div>{d.end_at}</div>
          <span>{d.logins_cands}</span>
          <br />
          <span>{d.logins_voters}</span>
          <br />
          <span>{d.nbr_voices}</span>
          <Link to={`./${String(d.poll_id)}/update`}>
            <button>수정하기</button>
          </Link>
        </div>
      ))}
    </div>
  );
  */
  return (
    <>
      <br />
      <div>{data.begin_at}</div>
      <div>{data.end_at}</div>
      <span>{data.logins_cands}</span>
      <br />
      <span>{data.logins_voters}</span>
      <br />
      <span>{data.nbr_voices}</span>
      <button onClick={handleOnUpdate}>수정하기</button>
      <button onClick={handleOnDelete}>삭제하기</button>
    </>
  );
};

export default ViewPollsContainer;
