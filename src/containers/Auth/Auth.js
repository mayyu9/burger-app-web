import React from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import {authInit} from '../../actions/AuthAction';

class Auth extends React.Component{
    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email address'
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true,
            }
        }
        this.setState({controls: updateControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthInit(this.state.controls.email.value, this.state.controls.password.value);
    }

    render(){
        //convert state object into array
        const formElementsArray = [];

        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        const form = formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    inValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => (this.inputChangeHandler(event, formElement.id))} />
            )
        )
        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button  
                        btnType="Success"
                        >SUBMIT</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuthInit: (email, pwd) => dispatch(authInit(email, pwd))
    }
}
export default connect(null, mapDispatchToProps)(Auth);