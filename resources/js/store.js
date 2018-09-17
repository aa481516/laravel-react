import {combineReducers, createStore} from "redux";

var initialState = [];

function product(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state;
        default:
            return state
    }
}

const Store = createStore(
    combineReducers({
        product,
    })
);


export default Store;
