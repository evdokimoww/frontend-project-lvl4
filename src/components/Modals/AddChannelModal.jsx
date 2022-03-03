import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../hooks/useSocket.jsx';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useToastify } from '../../hooks/useToastify.jsx';

const AddChannelModal = (props) => {
  const { onHide } = props;

  const [fieldInvalid, setFieldInvalid] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { createNewChannel } = useSocket();
  const inputRef = useRef();

  const channels = useSelector((state) => channelsSelectors.selectAll(state));
  const channelNames = channels.map((el) => el.name);

  const { t } = useTranslation('translation', { keyPrefix: 'modals' });
  const { successToast } = useToastify();

  const validate = Yup.object({
    body: Yup.string()
      .required(t('modalsValidate.required'))
      .min(3, t('modalsValidate.minMaxLength'))
      .max(20, t('modalsValidate.minMaxLength'))
      .notOneOf(channelNames, t('modalsValidate.uniqueChannelName')),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values) => {
      try {
        await validate.validate(values);

        setValidationError(null);
        setFieldInvalid(false);

        createNewChannel(values.body);
        onHide();
        successToast(t('toastMessages.successCreateChannel'));
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
        <Modal.Title>{t('addChannelModal.modalTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="body">
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
              placeholder={t('addChannelModal.channelNameInput')}
              isInvalid={fieldInvalid}
              className={'mb-3'}
            />
            <Form.Label className={'visually-hidden'}>{t('addChannelModal.inputLabel')}</Form.Label>
            {
              fieldInvalid
                ? <Form.Control.Feedback type="invalid" style={{display:'block'}}>{validationError}</Form.Control.Feedback>
                : null
            }
          </Form.Group>
          <div className={'d-flex justify-content-end'}>
            <Button className={'me-2'} variant="secondary" onClick={() => onHide()}>{t('modalsButton.closeBtn')}</Button>
            <Button type="submit" variant="primary">{t('modalsButton.sendBtn')}</Button>
          </div>
        </form>
      </Modal.Body>

    </Modal>
  );
};

export default AddChannelModal;