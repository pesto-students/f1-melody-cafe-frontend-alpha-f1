import { Button } from "react-bootstrap";

import React from "react";
import { useEffect,useState } from "react";

import Auth0Lock from "auth0-lock";
const LoginButton = () => {


  var clientId = "LSBbWSL1NdsxKwa9TBfLJQ3crduccXGt";
  var domain = "melody-cafe.us.auth0.com";
  var redirectUri = window.location.origin;
  var options = {
    additionalSignUpFields: [
      {
        name: "first_Name",
        placeholder: "Enter your First Name",
      },
      {
        name: "last_name",
        placeholder: "Enter your Last Name",
      },
    ],
    languageDictionary: {
      title: "Melody Cafe",
    },
    theme: {
      logo: "https://i.ibb.co/JddDDyM/The-Melody-Cafe-Logo.gif",
      primaryColor: "#31324F",
      title: "Melody Cafe",
    },
  };
  var lock = new Auth0Lock(clientId, domain, options);

  const [isLogin,setIsLogin] = useState(false); 
  const [buttonText,setButtonText] = useState('Login/Signup');
  let logInHandler = () =>
  lock.show({
    responseType: "token",
    auth: {
      redirectUrl: redirectUri,
    },
  });
  let logOutHandler = ()=>{
    lock.logout()
    localStorage.removeItem("token");
    localStorage.setItem("profile");
    localStorage.setItem('isLogin');
  }
 
  async function isLoginCheck(){
   let isLogin = await localStorage.getItem('isLogin');
   if(isLogin){
     setIsLogin(true)
     changeTheState();
   }
 }
  useEffect( ()=>{
   isLoginCheck();
  });

  lock.on("authenticated", function (authResult) {
    lock.getUserInfo(authResult.accessToken,async function (error, profileResult) {
      if (error) {
        return;
      }

     await localStorage.setItem("token", authResult.accessToken);
     await localStorage.setItem("profile", JSON.stringify(profileResult));
     await localStorage.setItem('isLogin',true);
     changeTheState();
      // Update DOM
    });
  });
  function changeTheState(){
      if(isLogin){
        setButtonText('Logout')
        return;
      }
      setButtonText('Login/Signup');
      return
  }

  return (
    <Button  
      variant="primary"
      onClick={()=>{
        if(isLogin){
          logOutHandler();
        }else{
          logInHandler();
        }
      }}
    >
      {buttonText}
    </Button>
  );
};

export default LoginButton;
