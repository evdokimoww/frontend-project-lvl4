import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import useSocket from '../../hooks/useSocket.jsx';
import useToastify from '../../hooks/useToastify.jsx';

const RenameChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { id, name } = modalInfo.item;

  const [fieldInvalid, setFieldInvalid] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const { renameChannel } = useSocket();
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
    initialValues: { body: name },
    onSubmit: async (values) => {
      try {
        await validate.validate(values);

        setValidationError(null);
        setFieldInvalid(false);
        const { body } = values;

        renameChannel({ id, name: body });
        onHide();
        successToast(t('toastMessages.successRenameChannel'));
      } catch (err) {
        setValidationError(err.message);
        setFieldInvalid(true);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [name]);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('renameChannelModal.modalTitle')}</Modal.Title>
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
              placeholder={t('renameChannelModal.channelNameInput')}
              isInvalid={fieldInvalid}
              className="mb-3"
            />
            <Form.Label className="visually-hidden">{t('renameChannelModal.inputLabel')}</Form.Label>
            {
              fieldInvalid
                ? <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>{validationError}</Form.Control.Feedback>
                : null
            }
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={() => onHide()}>{t('modalsButton.closeBtn')}</Button>
            <Button type="submit" variant="primary">{t('modalsButton.sendBtn')}</Button>
          </div>
        </form>
      </Modal.Body>

    </Modal>
  );
};

export default RenameChannelModal;
