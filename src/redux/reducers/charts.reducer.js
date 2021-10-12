const chartsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHARTS':
        return action.payload;
   // case 'GLOBAL':
    //    return state.slice(0,50);
      default:
        return state;
    }
  };

export default chartsReducer;