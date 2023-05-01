const initialState = {
    hasActiveStay: true,
    hasSkipped: true,
    successCreated: true,
    successDelete : false,
};

function stay(state: State = initialState, action): State {
    switch (action.type) {
        case 'ACTIVE_STAY':
            return {
                hasActiveStay: true,
                hasSkipped: true
            };
        case 'INACTIVE_STAY':
            return {
                hasActiveStay: false,
            };
        case 'HAS_SKIPPED_STAY':
            return {
                hasSkipped: true
            };
        case 'STAY_SUCCESSSFUL_CREATED':
            return {
                successCreated: true
            };
        case 'STAY_SUCCESSSFUL_CANCELLED':
            return {
                successDelete: true,
                hasActiveStay: true,
                hasSkipped: true
            };
        default:
            return state
    }
}

export default stay