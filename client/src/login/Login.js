import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  state = {
    password: ""
  };

  handleChange = event => {
    this.setState({ password: event.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      axios
        .post("/api/login", { password: this.state.password })
        .then(response => {
          const token = response.data.token;
          window.localStorage.setItem("admin", token);
          this.setState({redirect: true})
        })
        .catch(error => {
          console.log("login failed", error);
        });
    }
  };

  render() {
    if (this.state.redirect) return <Redirect to='/' />

    return (
      <div className="Login">
        <div className="loginBox roundedbox">
          <h3>Kirjaudu sisään</h3>
          <input type="text" value="admin" disabled />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );
  }
}

export default Login;
