import React, { Component } from 'react';
import "./SignIn.css";
import ErrorBox from '../ErrorBox';
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }

    signInUser = async (email, password) => {
        const response = await fetch("http://localhost:3000/signin", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
        })

        return response.json();

    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='card shadow-5'>
                <form className='signin-form'
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            this.signInUser(e.target.email.value, e.target.password.value)
                                .then(data => {
                                    if (data.err) {
                                        this.setState(() => ({ error: data.err }))
                                    } else if(data.id) {
                                        this.setState(() => ({ error: "" }));
                                        this.props.loadUser(data)
                                        onRouteChange("home");
                                    }

                                })
                        }
                    }>
                    <h1 className='f1'>Sign In</h1>
                    <label className="f4" htmlFor='email'>Email</label>
                    <input id="email" className='control' type="email" placeholder='' />
                    <label className="f4" htmlFor='password'>Password</label>
                    <input id="password" className="control" type="password" />
                    <button
                        className='control br2  grow f4 ph3 pv2 white bg-light-purple pointer'>Sign In</button>
                    <a className="button--link"
                        onClick={(e) => {
                            onRouteChange('register')
                        } }>Register</a>
                </form>
                { this.state.error && <ErrorBox error={this.state.error} /> }
            </div>
        )
    }

}

export default SignIn;