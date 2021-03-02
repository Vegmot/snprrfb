const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = payload => {
  return {
    type: OPEN_MODAL,
    payload,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

const initialState = null;

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      const { modalType, modalProps } = action.payload;
      return { modalType, modalProps };

    case CLOSE_MODAL:
      return null;

    default:
      return state;
  }
};
