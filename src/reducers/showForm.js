const showForm = (state = false, action) => {
    switch (action.type) {
        case 'SHOWFORM': return action.payload;
        default: return state;
    }
}

export default showForm;