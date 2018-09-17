import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class Add extends Component {

    render(){
        return(
            <div>
                <h1>2222</h1>
                <Link to="/">back</Link>
            </div>
        )
    }

}

export default connect(

)(Add);