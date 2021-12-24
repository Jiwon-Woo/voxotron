import axios from 'axios';

const GetAllData = () => {
  let returnData = [];
  axios
    .get('/api/?format=json', {
      withCredentials: true,
    })
    .then(response => {
      console.log(response.data);
      returnData = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  return returnData;
};

export default GetAllData;
