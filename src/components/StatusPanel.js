import React from 'react';
import '../styles/custom.css';

class StatusPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            name:'',
            chatroom:[]
        };
    }

    handleLogout(){
        fetch('http://localhost:1111/logout',{method:'post'}).then((res)=>{
            if (res.status === 200){
                this.setState({logout:true});
                res.json().then((data)=>{console.log(data)})
            }
        });
    }

    componentDidMount(){
        componentWillMount(){
            fetch('/user',{
                method:'GET',
                credentials:'same-origin'
              }).then((res)=>{
                  res.json().then((data)=>{
                      console.log(data);
                      this.setState({user:data.user});
                      console.log('page',this.state)
                  });
            });
        }
    }

    render(){
        return(
            <div className="statuspanel">
                <p>{}</p>
            </div>
        )
    }
}

export default StatusPanel;