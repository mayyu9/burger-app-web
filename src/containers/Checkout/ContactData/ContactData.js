import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

class ContactData extends React.Component{
    state={
        orderForm:{
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ""
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your street'
                    },
                    value: ""
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip code'
                    },
                    value: ""
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your country'
                    },
                    value: ""
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: ""
                },
                deliveryMethod:{
                    elementType: 'select',
                    elementConfig: {
                       options:[
                           {value:"fastest", displayValue:"Fastest"},
                           {value:"cheapest", displayValue:"Cheapest"}
                        ]
                    },
                    value: ""
                },
        },
        loading: false,
    }

    inputChangeHandler = (event, indentifier)=>{
        //console.log(event.target.value);

        const updatedOrderForm = {...this.state.orderForm}; //create a copy of form withou mutate
        const updatedformElement = {...updatedOrderForm[indentifier]}; //clones one level deep
        updatedformElement.value = event.target.value;
        updatedOrderForm[indentifier] = updatedformElement;
        this.setState({orderForm: updatedOrderForm});
    }

    orderHandler = (event) =>{
        event.preventDefault(); // prevent default behaviour of submitting the form.
        this.setState({loading: true});
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
        };
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
            //console.log(JSON.stringify(response))
        })
        .catch(error => {
            this.setState({loading: false});
            //console.log(JSON.stringify(error))
        });
        
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
            <form>
                {
                    formElementsArray.map( formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => (this.inputChangeHandler(event, formElement.id))}
                        />
                    ))
                }
                <Button  
                    btnType="Success"
                    clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
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

export default ContactData;