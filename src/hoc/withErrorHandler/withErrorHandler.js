import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Wrapper';
//axios:
//added the axios instance so that incase if any error inside any component the axios instance returned error
// message will be shown to user.

// Gloabl Error handling:
// this HOC component is global level error handling file
const withErrorHanlder = (WrappedComponent, axios) => {
    return class extends Component{

        state={error: null}

        componentDidMount(){
            //axios listeners
            // in the request interceptors just clearing the error state, so that it won't hold back any pervious error.
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        backDrop={this.errorConfirmedHandler} >
                        {this.state.error? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHanlder;
    