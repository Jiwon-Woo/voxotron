import { React, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';

const UpdatePollForm = ifUpdate => {
  const [ifSubmit, setIfSubmit] = useState(false);
  const location = useLocation();
  const initialValues = {
    begin_at: ifUpdate ? location.state.begin_at.split('+')[0] : '',
    end_at: ifUpdate ? location.state.end_at.split('+')[0] : '',
    nbr_voices: ifUpdate ? location.state.nbr_voices : 0,
    logins_voters: ifUpdate ? location.state.logins_voters : '',
    logins_cands: ifUpdate ? location.state.logins_cands : '',
  };
  const pollForm = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      console.log(values);
      if (ifUpdate) {
        axios
          .put('/api/1', values)
          .then(res => {
            console.log(res);
            setSubmitting(false);
            setIfSubmit(true);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        axios
          .post('/api/', values)
          .then(res => {
            console.log(res);
            setSubmitting(false);
            setIfSubmit(true);
          })
          .catch(e => {
            console.log(e);
          });
      }
      setSubmitting(false);
    },
  });
  if (ifSubmit) return <Navigate to="/" />;
  return (
    <div className="update-new-poll">
      <h1>{ifUpdate ? 'Update Poll' : 'Create New Poll'}</h1>
      <form id="poll-form" onSubmit={pollForm.handleSubmit}>
        <label name="begin-at">Begin at</label>
        <input
          id="begin_at"
          name="begin_at"
          type="datetime-local"
          onChange={pollForm.handleChange}
          value={pollForm.values.begin_at}
        />
        <br />
        <label name="end-at">End at</label>
        <input
          id="end_at"
          name="end_at"
          type="datetime-local"
          onChange={pollForm.handleChange}
          value={pollForm.values.end_at}
        />
        <br />
        <label name="nbr-voices">Nbr voices</label>
        <input
          id="nbr_voices"
          name="nbr_voices"
          type="number"
          min="0"
          required="required"
          autoComplete="off"
          onChange={pollForm.handleChange}
          value={pollForm.values.nbr_voices}
        />
        <br />
        <label name="logins-voters">Login Voters</label>
        <textarea
          id="logins_voters"
          name="logins_voters"
          onChange={pollForm.handleChange}
          value={pollForm.values.logins_voters}
        ></textarea>
        <br />
        <label name="logins-cands">Login Candidates</label>
        <textarea
          id="logins_cands"
          name="logins_cands"
          onChange={pollForm.handleChange}
          value={pollForm.values.logins_cands}
        ></textarea>
        <button type="submit" form="poll-form" disabled={pollForm.isSubmitting}>
          submit
        </button>
      </form>
    </div>
  );
};

export default UpdatePollForm;
