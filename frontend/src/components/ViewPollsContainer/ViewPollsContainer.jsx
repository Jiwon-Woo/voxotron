import { React, useEffect, useState } from 'react';
// import { React, useEffect } from 'react';
import axios from 'axios';

const ViewPollsContainer = () => {
  // const [data, setData] = useState([]);
  const [data, setData] = useState('');
  function deleteApi() {
    axios
      .delete('/poll/api/7')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        //navigate hook
        console.log('delete button clicked');
      });
  }
  useEffect(() => {
    axios
      .get('poll/api/', {
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
  return (
    <div className="view-polls-container">
      <h1>Poll List</h1>
      <div>begin_at : {data && data.begin_at}</div>
      <div>end_at : {data && data.end_at}</div>
      <div>nbr_voices : {data && data.nbr_voices}</div>
      <div>logins_voters : {data && data.logins_voters}</div>
      <div>logins_cands : {data && data.logins_cands}</div>
      <button onClick={deleteApi}>DELETE</button>
      {/* {data.map(d => (
        <div key={d}>
          <br />
          <div>{d.begin_at}</div>
          <div>{d.end_at}</div>
          <span>{d.logins_cands}</span>
          <br />
          <span>{d.logins_voters}</span>
          <br />
          <span>{d.nbr_voices}</span>
        </div>
      ))} */}
    </div>
  );
};

export default ViewPollsContainer;
