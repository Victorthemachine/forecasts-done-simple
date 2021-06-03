import { updateDarkmode } from '../actions/darkmode.action.js';
const INITIAL_STATE = {
    darkmode: true,
};

const reducer = (state = INITIAL_STATE, action) => {
    return {
        ...state, darkmode: !state.darkmode,
    };
}

export default reducer;