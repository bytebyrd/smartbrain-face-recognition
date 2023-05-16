import React, { Component } from "react";


class Register extends Component {
    constructor(props){
        super(props);
        
    }

    onRegister = async (email, username, password) => {
        const response = await fetch("http://localhost:3000/register", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, username, password })
        })

        return response.json();
    }
    render() {
        return (
            <div className='card shadow-5'>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        this.onRegister(e.target.email.value, e.target.name.value, e.target.password.value)
                        .then( data => {
                            if(data.err){
                                console.log(data.err)
                            }else{
                                console.log(data);
                                this.props.loadUser(data);
                                this.props.onRouteChange("home");
                            }
                        })
                        
                    }
                } className='signin-form'>
                    <h1 className='f1'>Register</h1>
                    <label className="f4" htmlFor='name'>Name</label>
                    <input id="name" className='control' type="text" placeholder='' />
                    <label className="f4" htmlFor='email'>Email</label>
                    <input id="email" className='control' type="mail" placeholder='' />
                    <label className="f4" htmlFor='password'>Password</label>
                    <input id="password" className="control" type="password" />
                    <button className='control br2  grow f4 ph3 pv2 white bg-light-purple pointer'>Register</button>
                </form>
            </div>
        )
    }
}


export default Register;