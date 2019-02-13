import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { getJWT } from '../config/jwt'
import { connect } from 'react-redux';
import  { getUser } from '../actions'
import { bindActionCreators } from 'redux';

class Authcomponent extends Component {
     
    componentDidMount() {
        const jwtToken = getJWT();
        if(!jwtToken) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
  }
}

const mapStateToProps = (state) => {
    return ({
        systemReducer: state.systemReducer,
    })
}


const mapDispatchToProps = dispatch => bindActionCreators({getUser}, dispatch);


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Authcomponent));