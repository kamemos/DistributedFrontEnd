import React from 'react';
import {Modal,Button} from 'react-bootstrap';

class SignupModal extends React.Component{
    constructor(props,contexts){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false
        };
    }
    handleClose() {
        this.setState({ show: false });
      }
    handleShow() {
    this.setState({ show: true });
    }
    render(){
        return(
            <div>
                <Button bsStyle="success" onClick={this.handleShow}>
                Sign up
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default SignupModal;