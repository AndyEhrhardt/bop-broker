const songDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SONG_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };

export default songDetailsReducer;