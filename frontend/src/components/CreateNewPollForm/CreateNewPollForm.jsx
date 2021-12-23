import { React } from 'react';
//import axios from 'axios';
import { useFormik, Field } from 'formik';

const CreateNewPollForm = () => {
  const formik = useFormik({
    initialValues: {
      begin_at: '',
      end_at: '',
      nbr_voices: 0,
      logins_voters: '',
      logins_cands: '',
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <div className="create-new-poll">
      <h1>Create New Poll</h1>
      <form onSubmit={formik.handleSubmit}>
        <label name="begin-at">Begin at</label>
        <input
          id="begin-at"
          name="begin-at"
          type="datetime-local"
          onChange={formik.handleChange}
          value={formik.values.begin_at}
        />
        <label name="end-at">End at</label>
        <input
          id="end-at"
          name="end-at"
          type="datetime-local"
          onChange={formik.handleChange}
          value={formik.values.end_at}
        />
        <label name="nbr-voices">Nbr voices</label>
        <input
          id="nbr-voices"
          name="nbr-voices"
          type="number"
          min="0"
          defaultValue="10"
          required="required"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.nbr_voices}
        />
        <label name="login-voters">Login voters</label>
        <Field
          id="login-voters"
          name="login-voters"
          onChange={formik.onChange}
          value={formik.values.logins_voters}
        />
        <Field
          id="login-cands"
          name="login-cands"
          onChange={formik.onChange}
          value={formik.values.logins_cands}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CreateNewPollForm;
