import React, {useState} from 'react';
import SignIn from './Authentication/SignIn';
import {Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './Home.css';


function Home() {
    const [user, setUser] = useState({});
    const [signinError, setSigninError] = useState('');
    const navigate = useNavigate();

    const signIn = (user) => {
        fetch(`${process.env.REACT_APP_BACKEND_SERVER_PATH}/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              email: user.email,
              password: user.password
            }
          })
        })
        .then(response => response.json())
        .then(result => {
          if (result.token) {
            localStorage.setItem('token', result.token)
            setUser(result.user);
            navigate("/transactions", { replace: true });
          } else {
            setSigninError(result.error)
          }
        })
      }
  
    return (
    <div> 
        <p>Try me out... <br/> Email: Wyane@ga.co | Password: password </p>
        <SignIn signIn={signIn} error={signinError} />
        <h2 className = "signupheader">Not a member, why not sign up?</h2>
        <Button variant="secondary" href="/signup">Sign Up</Button>
    </div>
  )
}

export default Home;