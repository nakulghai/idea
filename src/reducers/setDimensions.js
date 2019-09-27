const setDimensions = (state = {
    width: 1000,
    height: 650
}, action) => {
    switch (action.type) {
        case 'DIMENSION': return action.payload;
        default: return state;
    }
}

export default setDimensions;