import { React, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdatePollForm = () => {
  const [initialValues, setInitialValues] = useState({
    begin_at: '',
    end_at: '',
    nbr_voices: 0,
    logins_voters: '',
    logins_cands: '',
  });
  const [ifUpdate, setIfUpdate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state !== null) {
      setInitialValues({
        begin_at: location.state.begin_at.split('+')[0],
        end_at: location.state.end_at.split('+')[0],
        nbr_voices: location.state.nbr_voices,
        logins_voters: location.state.logins_voters,
        logins_cands: location.state.logins_cands,
      });
      setIfUpdate(true);
    }
  }, []);
  const pollForm = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      if (ifUpdate) {
        axios
          .put('/api/1', values)
          .then(res => {
            console.log(res);
            setSubmitting(false);
            navigate('/');
          })
          .catch(e => {
            console.log(e);
            setSubmitting(false);
          });
      } else {
        axios
          .post('/api/', values)
          .then(res => {
            console.log(res);
            setSubmitting(false);
            navigate('/');
          })
          .catch(e => {
            console.log(e);
            setSubmitting(false);
          });
      }
      setSubmitting(false);
    },
  });
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
