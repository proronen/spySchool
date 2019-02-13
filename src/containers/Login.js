import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { loginSpy } from '../actions'
import { bindActionCreators } from 'redux';

import Errors from '../components/Errors';
 
class Login extends Component {
    
    constructor(props){
        super(props);

        this.form = React.createRef();

        // Here I decided to combine redux and local state, while using local state for keeping 
        // input data to validate and later send to store
        this.state = {
            username: '',
            password: '',
            error: ''
        }
   }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        
        const { username, password } = this.state;

        if (this.validate()) {
            const data = ({username: username, password: password});
            this.props.loginSpy(data, () =>{
                this.props.history.push('/');
            });
        }
        
    }

    validate() {
        return this.form.current.reportValidity();
    }

    render() {

        const { username } = this.state;
        const { error } = this.props;

        return (
            <React.Fragment>
                <h1>SPY LOGIN</h1>
                <div className="center">Username: test, Password: test</div>
                <br />
                <div id="form_cont">
                    <form ref={this.form} onSubmit={e => this.handleSubmit(e)} className="spyforms login" noValidate>
                        <div>
                            <label>USERNAME</label>
                            <input type="text" name="username" onChange={e => this.handleChange(e)} value={username} required/>
                        </div>
                        <div>
                            <label>PASSWORD</label>
                            <input type="password" name="password" onChange={e => this.handleChange(e)} pattern="\d{3}" required/>
                        </div>

                        <button type="submit">Login to SpySchool</button>
                        {error && <Errors msg={error} />} 
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
  
const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => bindActionCreators({loginSpy}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);