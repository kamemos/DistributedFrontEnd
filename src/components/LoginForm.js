import React from 'react';
import {FormGroup,ControlLabel,} from 'react-bootstrap';

const FieldGroup = ({id,label,type,placholder}) => (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
);

class LoginForm extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    }
    render(){
        return(
            <form>

            </form>
        );
    }
}
