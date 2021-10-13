const portfolioReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PORTFOLIO':
        return action.payload;
      default:
        return state;
    }
  };

export default portfolioReducer;