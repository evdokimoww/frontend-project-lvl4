import React, {useRef, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {Alert, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import {useAuth} from '../hooks/index.jsx';
import {useNavigate} from 'react-router-dom';

const validate = Yup.object({
  username: Yup.string()
    .required('No username provided.')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(4, 'Password is too short - should be 4 chars minimum.')
    .required('Required'),
});

const LoginPage = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        logIn();
        setAuthFailed(false);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={formik.handleSubmit}>
        {
          authFailed
            ? <Alert variant={'danger'}>the username or password is incorrect</Alert>
            : null
        }
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            ref={inputRef}
            isInvalid={authFailed}
          />
          {
            formik.touched.username && formik.errors.username
              ? <Form.Control.Feedback type="invalid" style={{display:'block'}}>{formik.errors.username}</Form.Control.Feedback>
              : null
          }
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={authFailed}
          />
          {
            formik.touched.password && formik.errors.password
              ? <Form.Control.Feedback type="invalid" style={{display:'block'}}>{formik.errors.password}</Form.Control.Feedback>
              : null
          }
        </Form.Group>
        <Button className='mt-3' variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginPage;