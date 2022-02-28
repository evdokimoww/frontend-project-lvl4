import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const modals = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
}

export default (modalName) => modals[modalName];