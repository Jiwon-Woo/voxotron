import { React } from 'react';
import { useParams } from 'react-router-dom';
import { GetOneData, UpdatePollForm } from '../../components';

const PollUpdatePage = () => {
  const { poll_id } = useParams();
  console.log(poll_id);
  const pollData = GetOneData(poll_id);
  return <UpdatePollForm pollData={pollData} />;
};

export default PollUpdatePage;
