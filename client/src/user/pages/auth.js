import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


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
          first_name: undefined
        },
        {
          ...formState.inputs,
          last_name: undefined
        },
        {
          ...formState.inputs,
          utype: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }else {
      setFormData(
        {
          ...formState.inputs,
          first_name: {
            value: '',
            isValid: false
          }
        },
        {
          ...formState.inputs,
          last_name: {
            value: '',
            isValid: false
          }
        },
        {
          ...formState.inputs,
          utype: {
            value: '',
            isValid: false
          }
        },
        false
      ); 
    } 
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    
    if (isLoginMode) {

    }else {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            first_name: formState.inputs.first_name.value,
            last_name:  formState.inputs.last_name.value,
            utype: formState.inputs.utype.value,
            email: formState.inputs.email.value, 
            password: formState.inputs.password.value,
          })
        });

        const responseData = await response.json();
        if(!response.ok) {
            throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      }catch (err) {
        //console.log (err);
        setIsLoading(false);
        setError(err.message || 'Something wnet wrong, please try again later.');
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Login Required' : 'Signup Required'}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && [(
            <Input 
              element="input"
              id="first_name"
              type="text"
              label="First Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your first name."
              onInput={inputHandler}
            />
          ),(
            <Input 
              element="input"
              id="last_name"
              type="text"
              label="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your last name."
              onInput={inputHandler}
            />
          ),(
            <Input 
              element="input"
              id="utype"
              type="text"
              label="User type"
              placeholder="Parent, Consultant, Educator, Admin"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter the type of User"
              onInput={inputHandler}
            />
          )/*(
            <Select options={option} onChange={handleChange}  placeholder="Select user type" />
          )*/
          ]}
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
    </React.Fragment>
  );
};

export default Auth;


  /*const option = [
    { value: "none", label: "None"},
    { value: "parent", label: "Parent"},
    { value: "educator", label: "Educator"},
    { value: "consultant", label: "Consultant"},
    { value: "admin", label: "Admin"},
  ];

  const [selects, setSelect] = useState("None");
  //console.log(selects);
  const selectedOption = selects;
  const handleChange = (e) => {
    const selectedUserType = e.target.value;
    setSelect(selectedUserType);
  };*/
  //import Select from "react-select";
