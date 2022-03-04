import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/useSocket.jsx';
import { useToastify } from '../../hooks/useToastify.jsx';

const RemoveChannelModal = (props) => {
  const { onHide } = props;
  const { id } = props.modalInfo.item;
  const { removeChannel } = useSocket();
  const { t } = useTranslation('translation', { keyPrefix: 'modals' });
  const { successToast } = useToastify();

  const handleRemoveChannel = () => {
    removeChannel(id);
    onHide();
    successToast(t('toastMessages.successRemoveChannel'));
  };
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('removeChannelModal.modalTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('removeChannelModal.modalWarning')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={() => onHide()}>{t('modalsButton.closeBtn')}</Button>
          <Button type="submit" variant="danger" onClick={handleRemoveChannel}>{t('modalsButton.removeBtn')}</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default RemoveChannelModal;
