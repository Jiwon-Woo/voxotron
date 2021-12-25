import axios from 'axios';

const GetAllData = () => {
  let returnData = [];
  axios
    .get('/api/', {
      withCredentials: true,
    })
    .then(response => {
      returnData = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  return returnData;
};

export default GetAllData;
