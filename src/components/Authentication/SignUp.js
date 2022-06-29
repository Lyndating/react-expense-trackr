import React, {useState} from "react";
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './SignUp.css';
import './Authentication.css'

function SignUp(props) {
  
    const [state, setState] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: ''
    })
    


    // dynamic function
    const handleChange = (event) => {
        // setState({[event.target.name]: event.target.value})
        setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.signUp(state);
    }

    return (
        <motion.div 
            className="col-md-4 offset-md-4 bg-light p-3 sign-container"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
            delay: .3,
            x: { type: "spring", stiffness: 100 },
            default: { duration: .4 },
            }}
            exit={{opacity: 0}}
        >
            <Form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>

                <Form.Group className="mb-3" controlId="signUpEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control name='email' type='email' value={state.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUpfirstName">
                <Form.Label>First Name: </Form.Label>
                <Form.Control name='first_name' value={state.first_name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUplastName">
                <Form.Label>Last Name: </Form.Label>
                <Form.Control name='last_name' value={state.last_name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUpPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control name='password' type='password' value={state.password} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUpConfirmPassword">
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control name='password_confirmation' type='password' value={state.password_confirmation} onChange={handleChange} />
                </Form.Group>

                <Button variant="secondary" type="submit">
                Submit
            </Button>
    
            {props.errors ? 
                <ul className = "form-errors"> {props.errors.map((error) => (
                    <li key={error.id}>{error.title}</li>
                    ))}
                </ul> 
            : null}
            </Form>
        </motion.div>
);
}

export default SignUp;
