import { React } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  CreateNewPollPage,
  PollListPage,
  PollUpdatePage,
  MainPage,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/create" element={<CreateNewPollPage />} />
        <Route exact path="/poll" element={<PollListPage />} />
        <Route path="/poll/:poll_id/update" element={<PollUpdatePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
