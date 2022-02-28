import React from 'react';
import { useSocket } from '../../hooks/useSocket.jsx';
import { Button, Modal } from 'react-bootstrap';

const RemoveChannelModal = (props) => {
  const { onHide } = props;
  const { id } = props.modalInfo.item;
  const { removeChannel } = useSocket();

  const handleRemoveChannel = () => {
    removeChannel(id);
    onHide();
  }
  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <p className={'lead'}>Уверены?</p>
          <div className={'d-flex justify-content-end'}>
            <Button className={'me-2'} variant="secondary" onClick={() => onHide()}>Закрыть</Button>
            <Button type="submit" variant="danger" onClick={handleRemoveChannel}>Удалить</Button>
          </div>
      </Modal.Body>

    </Modal>
  );
};

export default RemoveChannelModal;