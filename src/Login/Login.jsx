import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'

const validate = Yup.object({
  username: Yup.string()
    .required('No username provided.')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validate,
    onSubmit: values => {
      alert(values);
    },
  });

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {
          formik.touched.username && formik.errors.username
            ? <div>{formik.errors.username}</div>
            : null
        }

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {
          formik.touched.password && formik.errors.password
            ? <div>{formik.errors.password}</div>
            : null
        }

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;