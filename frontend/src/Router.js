import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateNewPollPage, PollListPage } from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/create" element={<CreateNewPollPage />} />
        <Route exact path="/poll" element={<PollListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
