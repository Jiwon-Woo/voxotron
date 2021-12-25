import { React, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const UpdatePollForm = pollData => {
  const [pollState, setPollState] = useState(false);
  useEffect(() => {
    if (Object.keys(pollData).length !== 0) setPollState(true);
  }, []);
  const pollForm = useFormik({
    initialValues: {
      begin_at: pollState ? pollData.begin_at : '',
      end_at: pollState ? pollData.end_at : '',
      nbr_voices: pollState ? pollData.nbr_voices : '',
      logins_voters: pollState ? pollData.logins_voters : '',
      logins_cands: pollState ? pollData.logins_cands : '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      if (pollState) {
        console.log('Poll Updating!');
      } else {
        console.log('Poll Created!');
        axios
          .post('/api/', values)
          .then(res => {
            console.log(res);
            setSubmitting(false);
          })
          .catch(e => {
            console.log(e);
          });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="update-new-poll">
      <h1>{pollState ? 'Update Poll' : 'Create New Poll'}</h1>
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
