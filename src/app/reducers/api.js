const LOAD = 'object/load',
  SAVE = 'object/save',
  FETCH_SCHEMA = 'object/fetchSchema';

export const load = (data) => {
  return {
    type: LOAD,
    data
  };
}

export default function(state={}, action) {
  switch(action.type) {
    case LOAD:
      return {data: action.data};
    default:
      return state;
  }
}

function fetchAsync(cb){
  setTimeout(function() {
    cb({name:'xyz', creditlimit:2000});
  }, 1000);
}

export const loadAsync = ()=> {
  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.
  return function (dispatch) {
    return fetchAsync(function(x) {
      dispatch(load(x));
    });
  };
}
