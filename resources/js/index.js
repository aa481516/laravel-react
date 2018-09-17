import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import Routing from "./route/routing";
import Root from "./reducers/root";


ReactDOM.render(
    <Provider store={Root}>
        <Routing/>
    </Provider>,
    document.getElementById('root')
);
