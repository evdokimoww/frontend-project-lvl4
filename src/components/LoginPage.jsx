import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';

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
        const res = await axios.post(routes.login(), values);
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

  return <Container className={'h-100'} fluid>
      <Row className={'row justify-content-center align-content-center h-100'}>
        <Col xs md='8' xxl='6'>
          <Card className={'shadow-sm'}>
            <Card.Body>
              <Row className={'p-5'}>
                <Col>123</Col>
                <Col>
                  <Card.Title className={'text-center mb-5'}>
                    <h2>Войти</h2>
                  </Card.Title>
                  <Form className={'form-floating'} onSubmit={formik.handleSubmit}>
                    {
                      authFailed
                        ? <Alert variant={'danger'}>the username or password is incorrect</Alert>
                        : null
                    }
                    <Form.Group controlId="username" className={'form-floating mb-3'}>
                      <Form.Control
                        type="text"
                        placeholder="Ваш ник"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        ref={inputRef}
                        isInvalid={authFailed}
                      />
                      <Form.Label>Ваш ник</Form.Label>
                      {
                        formik.touched.username && formik.errors.username
                          ? <Form.Control.Feedback type="invalid" style={{display:'block'}}>{formik.errors.username}</Form.Control.Feedback>
                          : null
                      }
                    </Form.Group>

                    <Form.Group controlId="password" className={'form-floating mb-4'}>
                      <Form.Control
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={authFailed}
                      />
                      <Form.Label>Пароль</Form.Label>
                      {
                        formik.touched.password && formik.errors.password
                          ? <Form.Control.Feedback type="invalid" style={{display:'block'}}>{formik.errors.password}</Form.Control.Feedback>
                          : null
                      }
                    </Form.Group>
                    <Button className={'w-100'} variant="outline-primary" type="submit">
                      Войти
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className={'p-4'}>
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href={'/signup'}>Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
  </Container>
};

export default LoginPage;