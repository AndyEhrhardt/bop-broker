const allChartsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHARTS':
        return action.payload;
      default:
        return state;
    }
  };

export default allChartsReducer;