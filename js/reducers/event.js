const initialState = {
    successCreated: false,
    hasError : false,
};

function event(state: State = initialState, action): State {
    switch (action.type) {
        case 'EVENT_SUCCESSSFUL_CREATED':
            return {
                successCreated: true,
                hasError : false
            };
        case 'ERROR_CREATED_EVENT':
            return {
                hasError: true,
                successCreated: false
            };
        default:
            return state
    }
}

export default event