import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoMatchPage = () => {
  return (
    <Row className={'row justify-content-center align-content-center h-100'}>
      <Col>
        <div className={'text-center align-content-center'}>
          <h3>Нет страницы лучше в мире чем 404...</h3>
          <p className={'text-muted'}>
            <Link to='/'>на главную</Link>
          </p>
        </div>
      </Col>
    </Row>
  )
};

export default NoMatchPage;