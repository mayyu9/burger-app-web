import React from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import {purchaseBurger} from '../../../actions/OrderAction';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends React.Component{
    state={
        orderForm:{
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: "",
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your street'
                    },
                    value: "",
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip code'
                    },
                    value: "",
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false,
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your country'
                    },
                    value: "",
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: "",
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                deliveryMethod:{
                    elementType: 'select',
                    elementConfig: {
                       options:[
                           {value:"fastest", displayValue:"Fastest"},
                           {value:"cheapest", displayValue:"Cheapest"}
                        ]
                    },
                    value: "fastest",
                    validation:{},
                    valid: true,
                },
        },
        validForm: false,
        loading: false,
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules !== undefined){
            if(rules.required) {
                isValid = value.trim() !== '' && isValid; 
            }
            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid;
            }
    
            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid;
            }
            return isValid;
        }
    }

    inputChangeHandler = (event, indentifier)=>{
        //console.log(event.target.value);

        const updatedOrderForm = {...this.state.orderForm}; //create a copy of form without mutate
        const updatedformElement = {...updatedOrderForm[indentifier]}; //clones one level deep
        updatedformElement.value = event.target.value;
        updatedformElement.valid = this.checkValidity(updatedformElement.value, updatedformElement.validation);
        updatedformElement.touched =  true; // this is to keep track of which input element user has touched
        updatedOrderForm[indentifier] = updatedformElement;

        let isValidForm = true;

        for(let indentifier in updatedOrderForm){
            isValidForm = updatedOrderForm[indentifier].valid && isValidForm
        }
        this.setState({orderForm: updatedOrderForm, validForm:isValidForm});
    }

    orderHandler = (event) =>{
        event.preventDefault(); // prevent default behaviour of submitting the form.
        //this.setState({loading: true});

        const formData = {};

        for(let indentifier in this.state.orderForm){
            formData[indentifier] = this.state.orderForm[indentifier].value;
        }
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDate: formData,
            userId:this.props.userId,
        };

        this.props.onPurchaseStart(this.props.token,order);
        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({loading: false});
        //     this.props.history.push('/');
        //     //console.log(JSON.stringify(response))
        // })
        // .catch(error => {
        //     this.setState({loading: false});
        //     //console.log(JSON.stringify(error))
        // });
        
    }
    render(){

        //convert state object into array
        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map( formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            inValid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => (this.inputChangeHandler(event, formElement.id))}
                        />
                    ))
                }
                <Button  
                    btnType="Success"
                    disabled ={ !this.state.validForm}
                    clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.bugerBuilder.ingredients,
        price: state.bugerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onPurchaseStart: (token,order) => dispatch(purchaseBurger(token,order))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(withErrorHandler(ContactData, axios));