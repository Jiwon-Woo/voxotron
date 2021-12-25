import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewPollsContainer = () => {
  const [data, setData] = useState([]);
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
      <Link to={`./update`}>
        <button>수정하기</button>
      </Link>
    </>
  );
};

export default ViewPollsContainer;
