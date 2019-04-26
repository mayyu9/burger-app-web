import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends React.Component{
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postaCode: '',
        },
        loading: false,
    }

    orderHandler = (event) =>{
        event.preventDefault(); // prevent default behaviour of submitting the form.
        this.setState({loading: true});
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name:'Thakur Singh',
                address:{
                    door: 'h.no: 6-162',
                    street: '502319',
                    country: 'India',
                },
                email: 'test@gmail.com'
            },
            deliveryMethod:'fastest',
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
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Your street" />
                <input type="text" name="postal" placeholder="Yout postal" />
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