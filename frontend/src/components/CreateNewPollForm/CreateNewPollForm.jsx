import { React } from 'react';
//import axios from 'axios';
import { useFormik } from 'formik';

const formInitialValues = {
  begin_at: '',
  end_at: '',
  nbr_voices: 0,
  logins_voters: '',
  logins_cands: '',
};

const CreateNewPollForm = () => {
  const pollForm = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      console.log(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="create-new-poll">
      <h1>Create New Poll</h1>
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
          defaultValue="10"
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

export default CreateNewPollForm;
