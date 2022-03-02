import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import image from '../../assets/images/login.png';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'loginPage' });

  const validate = Yup.object({
    username: Yup.string()
      .required(t('loginFormValidation.noUsername'))
      .max(15, 'loginFormValidation.usernameMaxLength'),
    password: Yup.string()
      .required(t('loginFormValidation.noPassword'))
      .min(4, t('loginFormValidation.passwordMaxLength')),
  });

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
                <Col md={6} className={'d-flex align-items-center justify-content-center'}>
                  <img src={image} width={'160px'} alt=""/>
                </Col>
                <Col>
                  <Card.Title className={'text-center mb-5'}>
                    <h2>{t('loginTitle')}</h2>
                  </Card.Title>
                  <Form className={'form-floating'} onSubmit={formik.handleSubmit}>
                    {
                      authFailed
                        ? <Alert variant={'danger'}>{t('incorrectDataAlert')}</Alert>
                        : null
                    }
                    <Form.Group controlId="username" className={'form-floating mb-3'}>
                      <Form.Control
                        type="text"
                        placeholder={t('loginForm.usernameLabel')}
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        ref={inputRef}
                        isInvalid={authFailed}
                      />
                      <Form.Label>{t('loginForm.usernameLabel')}</Form.Label>
                      {
                        formik.touched.username && formik.errors.username
                          ? <Form.Control.Feedback type="invalid" style={{display:'block'}}>{formik.errors.username}</Form.Control.Feedback>
                          : null
                      }
                    </Form.Group>

                    <Form.Group controlId="password" className={'form-floating mb-4'}>
                      <Form.Control
                        type="password"
                        placeholder={t('loginForm.passwordLabel')}
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={authFailed}
                      />
                      <Form.Label>{t('loginForm.passwordLabel')}</Form.Label>
                      {
                        formik.touched.password && formik.errors.password
                          ? <Form.Control.Feedback type="invalid" style={{display:'block'}}>{formik.errors.password}</Form.Control.Feedback>
                          : null
                      }
                    </Form.Group>
                    <Button className={'w-100'} variant="outline-primary" type="submit">
                      {t('submitButton')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className={'p-4'}>
              <div className="text-center">
                <span>{t('noAccountQuestion')} </span>
                <a href={'/signup'}>{t('registrationLink')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
  </Container>
};

export default LoginPage;