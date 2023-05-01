const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  sharedSchedule: null,
  id: null,
  name: null,
};

function user(state: State = initialState, action) : State {
  switch (action.type) {
    case 'SKIP_LOGIN':
      return {
      isLoggedIn: false,
      hasSkippedLogin: true
    };
    case 'LOGGED_IN':
      return {
      isLoggedIn: true,
      hasSkippedLogin: false
    };
    default:
      return state
  }
}

export default user