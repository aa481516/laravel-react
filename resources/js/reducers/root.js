import {combineReducers, createStore} from "redux";
import Product from "./product";

const store = createStore(
    combineReducers({
        Product,
    })
);

export default store;