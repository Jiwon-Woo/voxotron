import { React, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
//import { GetOneData, UpdatePollForm } from '../../components';
import { UpdatePollForm } from '../../components';
import axios from 'axios';

const PollUpdatePage = () => {
  let pollData = {};
  //const { poll_id } = useParams();
  //console.log(poll_id);
  //const pollData = GetOneData(poll_id);
  //return <UpdatePollForm pollData={pollData} />;
  useEffect(() => {
    axios
      .get('/api/', {
        withCredentials: true,
      })
      .then(response => {
        console.log('get data: ');
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
    console.log('good');
    console.log(pollData);
  });
  return <UpdatePollForm pollData={pollData} />;
};

export default PollUpdatePage;
