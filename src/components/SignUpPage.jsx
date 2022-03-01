import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import image from '../../assets/images/reg.png'

const validate = Yup.object({
  username: Yup.string()
    .required('No username provided.')
    .max(15, 'Must be 15 characters or less'),
  password: Yup.string()
    .required('No password provided.')
    .min(6, 'Password is too short - should be 4 chars minimum.'),
  confirmPassword: Yup.string()
    .required('No password provided.')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignUpPage = () => {
  const {logIn} = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signUp(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        logIn();
        setRegistrationFailed(false);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return <Container className={'h-100'} fluid>
    <Row className={'row justify-content-center align-content-center h-100'}>
      <Col xs md="8" xxl="6">
        <Card className={'shadow-sm'}>
          <Card.Body>
            <Row className={'p-5'}>
              <Col md={6} className={'d-flex align-items-center justify-content-center'}>
                <img src={image} width={'160px'} alt=""/>
              </Col>
              <Col>
                <Card.Title className={'text-center mb-5'}>
                  <h2>Регистрация</h2>
                </Card.Title>
                <Form className={'form-floating'} onSubmit={formik.handleSubmit}>
                  {
                    registrationFailed
                      ? <Alert variant={'danger'}>Пользователь с таким именем уже существует!</Alert>
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
                      isInvalid={registrationFailed}
                    />
                    <Form.Label>Ваш ник</Form.Label>
                    {
                      formik.touched.username && formik.errors.username
                        ? <Form.Control.Feedback type="invalid"
                                                 style={{display: 'block'}}>{formik.errors.username}</Form.Control.Feedback>
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
                      isInvalid={registrationFailed}
                    />
                    <Form.Label>Пароль</Form.Label>
                    {
                      formik.touched.password && formik.errors.password
                        ? <Form.Control.Feedback type="invalid"
                                                 style={{display: 'block'}}>{formik.errors.password}</Form.Control.Feedback>
                        : null
                    }
                  </Form.Group>

                  <Form.Group controlId="confirmPassword" className={'form-floating mb-4'}>
                    <Form.Control
                      type="password"
                      placeholder="Подтвердите пароль"
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      isInvalid={registrationFailed}
                    />
                    <Form.Label>Подтверждение пароля</Form.Label>
                    {
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? <Form.Control.Feedback type="invalid"
                                                 style={{display: 'block'}}>{formik.errors.confirmPassword}</Form.Control.Feedback>
                        : null
                    }
                  </Form.Group>
                  <Button className={'w-100'} variant="outline-primary" type="submit">
                    Зарегистрироваться
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
};

export default SignUpPage;