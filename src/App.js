import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import LoginPage from './LoginPage.js';
import HomePage from './HomePage.js';
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      username: '',
      password:'',
      userAuthorized:false,
    };
    this.isUserAuthorized = this.isUserAuthorized.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  isUserAuthorized(){
    const movieStorage = window.localStorage;
    const movieUsersDb = JSON.parse(movieStorage.getItem('movieUsers'));
    let user='';
    for (user in movieUsersDb) {
      if (movieUsersDb.hasOwnProperty(user)) {
        if(movieUsersDb[user]['username'] == this.state.username && movieUsersDb[user]['password']== this.state.password)
        {
          // this.state.userAuthorized = true;
          this.setState({
            userAuthorized:true,
          });
          return true;
        }
      }
    }
  }

  handleChange(e) {
    // console.log("value.."+v);
    let name = e.target.name;
    let value = e.target.value;
    this.setState((prevState,props)=>{
      return {
        [name]:value,
      }
    });
  }

  render() {
    console.log(JSON.stringify(this.state));
    let pagecontent=<HomePage/>;
    if(!this.state.userAuthorized){
      pagecontent=(
        <LoginPage
          username={this.state.username}
          password={this.state.password}
          isUserAuthorized={this.isUserAuthorized}
          handleChange={this.handleChange}
        />
      );
    }else {
      pagecontent=(
      <HomePage/>
      );
    }
    return (
      <div className="container">
        {pagecontent}
      </div>
    );
  }

}

export default App;
