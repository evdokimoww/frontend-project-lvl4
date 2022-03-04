import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert, Button, Card, Col, Container, Form, Row,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';
import image from '../../assets/images/reg.png';
import useToastify from '../hooks/useToastify.jsx';

function SignUpPage() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const { t } = useTranslation('translation', { keyPrefix: 'signupPage' });
  const { errorToast } = useToastify();

  const validate = Yup.object({
    username: Yup.string()
      .required(t('signupFormValidation.noUsername'))
      .min(3, t('signupFormValidation.usernameMinMaxLength'))
      .max(20, t('signupFormValidation.usernameMinMaxLength')),
    password: Yup.string()
      .required(t('signupFormValidation.noPassword'))
      .min(6, t('signupFormValidation.passwordMaxLength')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signupFormValidation.passwordsMustMatch')),
  });

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
        if (err.request) {
          errorToast(t('networkError'));
        }
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="row justify-content-center align-content-center h-100">
        <Col xs md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="p-5">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src={image} width="160px" alt="" />
                </Col>
                <Col>
                  <Card.Title className="text-center mb-5">
                    <h2>{t('signupTitle')}</h2>
                  </Card.Title>
                  <Form className="form-floating" onSubmit={formik.handleSubmit}>
                    {
                    registrationFailed
                      ? <Alert variant="danger">{t('alertAlreadyExist')}</Alert>
                      : null
                  }
                    <Form.Group controlId="username" className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        placeholder={t('signupForm.usernameLabel')}
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        ref={inputRef}
                        isInvalid={registrationFailed}
                      />
                      <Form.Label>{t('signupForm.usernameLabel')}</Form.Label>
                      {
                      formik.touched.username && formik.errors.username
                        ? (
                          <Form.Control.Feedback
                            type="invalid"
                            style={{ display: 'block' }}
                          >
                            {formik.errors.username}
                          </Form.Control.Feedback>
                        )
                        : null
                    }
                    </Form.Group>

                    <Form.Group controlId="password" className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        placeholder={t('signupForm.passwordLabel')}
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={registrationFailed}
                      />
                      <Form.Label>{t('signupForm.passwordLabel')}</Form.Label>
                      {
                      formik.touched.password && formik.errors.password
                        ? (
                          <Form.Control.Feedback
                            type="invalid"
                            style={{ display: 'block' }}
                          >
                            {formik.errors.password}
                          </Form.Control.Feedback>
                        )
                        : null
                    }
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        placeholder={t('signupForm.confirmLabel')}
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        isInvalid={registrationFailed}
                      />
                      <Form.Label>{t('signupForm.confirmLabel')}</Form.Label>
                      {
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? (
                          <Form.Control.Feedback
                            type="invalid"
                            style={{ display: 'block' }}
                          >
                            {formik.errors.confirmPassword}
                          </Form.Control.Feedback>
                        )
                        : null
                    }
                    </Form.Group>
                    <Button className="w-100" variant="outline-primary" type="submit">
                      {t('submitButton')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
