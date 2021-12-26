import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewPollsContainer = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleOnClick = e => {
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
  useEffect(() => {
    axios
      .get('/api/', {
        withCredentials: true,
      })
      .then(response => {
        console.log(response.data);
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
      <button onClick={handleOnClick}>수정하기</button>
    </>
  );
};

export default ViewPollsContainer;
