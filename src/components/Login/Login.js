import {Button} from "react-bootstrap";



import React from "react";
import Auth0Lock from 'auth0-lock';
const LoginButton = () => {
  var clientId = "LSBbWSL1NdsxKwa9TBfLJQ3crduccXGt";
  var domain = 'melody-cafe.us.auth0.com';
  var redirectUri= window.location.origin;
  var options = {
    additionalSignUpFields: [
  {
    name: "first_Name",
    placeholder: "Enter your First Name"
  },{
    name: "last_name",
    placeholder: "Enter your Last Name"
  }],
    languageDictionary: {
      title: "Melody Cafe"
    },
    theme: {
      logo: 'https://i.ibb.co/JddDDyM/The-Melody-Cafe-Logo.gif',
      primaryColor: '#31324F',
      title: "Melody Cafe"
    }
  };
  var lock = new Auth0Lock(clientId, domain,options);
  let accessToken = null;
  let profile = null;


  lock.on('authenticated', function (authResult) {
  lock.getUserInfo(authResult.accessToken, function (error, profileResult) {
    if (error) {
      // Handle error
      return;
    }

    accessToken = authResult.accessToken;
    profile = profileResult;

    // Update DOM
  });
});

  return <Button 
  variant="primary"
  onClick={() => lock.show({
    responseType: 'token',
    auth:{
        redirectUrl: redirectUri
    },
  })}>Login/Signup</Button>;
};

export default LoginButton;