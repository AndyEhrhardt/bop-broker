const songDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SONG_DETAILS':
        return action.payload;
      case 'CLEAR_SONG_DETAILS':
        return {};
      default:
        return state;
    }
  };

export default songDetailsReducer;