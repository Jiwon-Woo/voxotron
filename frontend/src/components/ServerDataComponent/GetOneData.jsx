import axios from 'axios';

const GetOneData = id => {
  let returnData = {};
  axios
    .get('/api/', {
      withCredentials: true,
    })
    .then(response => {
      returnData = response.data.find(obj => obj.poll_id === id);
    })
    .catch(error => {
      console.log(error);
    });
  return returnData;
};

export default GetOneData;
