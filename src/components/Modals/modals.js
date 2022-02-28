import AddChannelModal from './AddChannelModal.jsx';

const modals = {
  addChannel: AddChannelModal,
}

export default (modalName) => modals[modalName];