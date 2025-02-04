const showLoading = (state = false, action) => {
    switch (action.type) {
        case 'LOADING': return action.payload;
        default: return state;
    }
}

export default showLoading;