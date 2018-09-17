import * as type from "../actyons/actionTypes";

var initialState = [];

function product(state = initialState, action) {
    switch (action.type) {

        case type.ADD_TO_LIST:
            return state;

        case type.DELETE_FROM_LIST:
            return state;

        default:
            return state
    }
}

export default product;