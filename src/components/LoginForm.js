import React from 'react';
import {Link} from 'react-router-dom';
import {FormGroup,InputGroup,FormControl,ControlLabel,Button,Grid,Row,Col,Image} from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.state = {
      username:'',
      password:''
    };
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
    <Grid style={{width:'400px',padding:'20px',background:'#f2f2f2',borderRadius:'25px',borderWidth:'0.5px'}}>
    <Row style={{display: 'flex', justifyContent: 'center'}}>
        <img src={require('../imgs/sparta.png')} />
    </Row>
    <Row style={{display: 'flex', justifyContent: 'center',padding:'20px'}}>
      <form>
        <FormGroup style={{width:'300px'}}>
          <ControlLabel>Username</ControlLabel>
          <FormControl type="text"
            value={this.state.username} 
            placeholder="Enter text"
            onChange={this.handleUsername}/>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup style={{width:'300px'}}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="text"
            value={this.state.password}
            placeholder="Enter text"
            onChange={this.handlePassword}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button className="btn btn-primary" style={{float:'right'}} type="submit">Engage</Button>
        <Link to="/signup">register</Link>
      </form>
    </Row>
    </Grid>
    );
  }
}

export default LoginForm;