import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../hooks/useSocket.jsx';
import { useFormik } from 'formik';
import { Button, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import * as Yup from 'yup';

const AddChannelModal = (props) => {
  const { onHide } = props;

  const [fieldInvalid, setFieldInvalid] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const { createNewChannel } = useSocket();
  const inputRef = useRef();

  const channels = useSelector((state) => channelsSelectors.selectAll(state));
  const channelNames = channels.map((el) => el.name);

  const validate = Yup.object({
    body: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    // validationSchema: validate,
    onSubmit: async (values) => {
      try {
        await validate.validate(values);

        setValidationError(null);
        setFieldInvalid(false);

        createNewChannel(values.body);
        onHide();
      }
      catch (err) {
        setValidationError(err.message);
        setFieldInvalid(true);
      }

    },
     });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
              placeholder="Введите имя канала"
              isInvalid={fieldInvalid}
              className={'mb-3'}
            />
            {
              fieldInvalid
                ? <Form.Control.Feedback type="invalid" style={{display:'block'}}>{validationError}</Form.Control.Feedback>
                : null
            }
          </FormGroup>
          <div className={'d-flex justify-content-end'}>
            <Button className={'me-2'} variant="secondary" onClick={() => onHide()}>Закрыть</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </form>
      </Modal.Body>

    </Modal>
  );
};

export default AddChannelModal;