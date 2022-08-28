import React, { useState, useContext } from 'react';
import Select from "react-select";

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/input';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './auth.css';

const Auth = () => {
  const auth = useContext(AuthContext); 
  const [isLoginMode, setIsLoginMode] = useState(true);

  const option = [
    { value: "none", label: "None"},
    { value: "parent", label: "Parent"},
    { value: "educator", label: "Educator"},
    { value: "consultant", label: "Consultant"},
    { value: "admin", label: "Admin"},
  ];

  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption);
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

 

  const switchModeHandler = () => {
    if(!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          fname: undefined
        },
        {
          ...formState.inputs,
          lname: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }else {
      setFormData(
        {
          ...formState.inputs,
          fname: {
            value: '',
            isValid: false
          }
        },
        {
          ...formState.inputs,
          lname: {
            value: '',
            isValid: false
          }
        },
        false
      );
    } 
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="authentication">
      <h2>{isLoginMode ? 'Login Required' : 'Signup Required'}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && [(
          <Input 
            element="input"
            id="fname"
            type="text"
            label="First Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your first name."
            onInput={inputHandler}
          />
        ),(
          <Input 
            element="input"
            id="lname"
            type="text"
            label="Last Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your last name."
            onInput={inputHandler}
          />
        ),(
          <Select options={option} onChange={handleChange}  placeholder="Select user type" />
        )]}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
      
    </Card>
  );
};

export default Auth;
