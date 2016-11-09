const START = 'loader/start',
  END = 'loader/end';

export const startLoading = () => {
    return {
      type: START
    };
}

export const endLoading = () => {
    return {
      type: END
    };
}

export default function(state={loading: false, block: false}, action) {
  switch(action.type) {
    case START:
      return {loading: true, block: false };
    case END:
      return {loading: false, block: false};
    default:
      return state;
  }
}
