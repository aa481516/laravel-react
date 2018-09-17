import React, {Component} from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";



import Add from "../components/Add";
import Products from "../components/Products";


class Routing extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/add" component={Add}/>
                    <Route path="/" component={Products}/>
                </Switch>
            </Router>
        );
    }

}

export default connect(

)(Routing)