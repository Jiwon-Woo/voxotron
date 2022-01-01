import { React } from 'react';
import { NavigationBar, ViewPollsContainer } from '../../components';

const PollListPage = () => {
  return (
    <>
      <NavigationBar />
      <div>
        <h1>POLL LIST</h1>
      </div>
      <ViewPollsContainer />
    </>
  );
};

export default PollListPage;
