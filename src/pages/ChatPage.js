import React from 'react'
import axios from 'axios'
import {Button,Modal,Badge,FormControl,FormGroup,ControlLabel,Form,Table,ButtonGroup} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import io from 'socket.io-client'
import '../styles/custom.css'

class ChatPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn:true,
            username:'',
            name:'',
            chatrooms:[],
            join_users:[],
            join_user:'',
            join_user_msg:'',
            showmodal: false,
            showmodal2: false,
            joinGroupID: '',
            currentroom: '',
            message: '',
            messages: [],
            lastSeenMessage: '',
            userInRoom: [],
            endPath:'',
            err2:''
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAddMember = this.handleAddMember.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
        this.handleChatRoom = this.handleChatRoom.bind(this);
        this.handleSendMsg = this.handleSendMsg.bind(this);
        this.handleBreak = this.handleBreak.bind(this);
        this.handleJoinGroup = this.handleJoinGroup.bind(this);
        this.socket = io(this.state.endPath);
    }

    handleLogout(){
        fetch('/logout',{method:'post',credentials:'same-origin'}).then((res)=>{
            if (res.status === 200){
                this.setState({logout:true});
                res.json().then((data)=>{console.log(data)})
            }
        });
    }

    handleAddMember(){
        fetch('/validate-username'+'?username='+this.state.join_user,{method:'get'}).then((res)=>{
            res.json().then((data)=>{
                if(data.available === false){
                    let user = this.state.join_user;
                    this.setState({join_users:this.state.join_users.concat([user])});
                }
                else {
                    this.setState({join_user_msg:"not available"})
                }
            });
        })
    }

    async handleChatRoom(token){
        await this.setState({currentroom:token})
        await axios.get('/message',{params:{roomToken:this.state.currentroom}}).then((res)=>{
            console.log('all msg',res.data);
            this.setState({messages:res.data.messages,lastSeenMessage:res.data.lastSeenMessage});
        });
        let obj = {}
        if (this.state.messages.length !== 0){
            obj.username = this.state.username
            obj.room = this.state.currentroom
            obj.messageID = this.state.messages[this.state.messages.length-1]._id
        }
        let sub = {}
        sub.token = this.state.currentroom;
        this.socket.emit('subscribe',sub);
        await this.socket.emit('read',obj)
        await axios.get('/getusersinroom',{params:{roomToken:this.state.currentroom}}).then((res)=>{
            this.setState({userInRoom:res.data.users})
        });
    }

    handleBreak(){
        let unsub = {}
        unsub.token = this.state.currentroom;
        this.socket.emit('unsubscribe',unsub);
    }

    handleSendMsg(){
        let obj = {content:this.state.message,room:this.state.currentroom}
        this.socket.emit('send',obj)
        this.setState({message:''})
    }

    handleCreateRoom(){
        axios.post('/newroom',{join_users:this.state.join_users}).then((res)=>{
            console.log(res.data);
        });
        this.setState({showmodal:false});
        window.location.reload();
    }

    handleUnsubscribed(token){
        //this.socket.emit('unsub')
    }

    handleLeaveRoom(token){
        console.log('test');
        console.log(token)
        let obj = {}
        obj.roomToken = token;
        console.log('connect',this.socket.connected)
        this.socket.emit('leave',obj);
    }

    handleJoinGroup(){
        let obj = {}
        obj.roomToken = this.state.joinGroupID
        console.log('handle',this.state.joinGroupID);
        this.setState({showmodal2:false})
        this.socket.emit('join',obj);
    }

    componentDidMount(){
        fetch('/user',{method:'GET',credentials:'same-origin'}).then((res)=>{
            res.json().then((data)=>{
                console.log('userdata',data);
                this.setState({username:data.user.username,
                               name:data.user.name,
                               endPath:data.host})
            });
        });
        axios.get('/getallrooms').then((res)=>{
            this.setState({chatrooms:res.data.chatrooms});
        });
        this.socket.on('left', (data)=>{console.log('leave',data)});
        this.socket.on('err', (data)=>{console.log(data);this.setState({err2:data.msg})});
        this.socket.on('new message',(data)=>{
            console.log(data);
            if(this.state.currentroom && this.state.currentroom === data.room){
                let obj = {};
                obj = {content:data.content,room:data.room}
                obj.sender = {username:data.username,name:data.sender}
                obj.createdDate = data.createdTime;
                this.setState({messages:this.state.messages.concat([obj]),lastSeenMessage:''})
                let obj2 = {};
                obj2.username = this.state.username;
                obj2.room = this.state.currentroom;
                obj2.messageID = data.messageID;
                this.socket.emit('read',obj2);
            }
        });
    }
    
    render(){
        if (this.state.logout) return <Redirect to='/'/>
        return(  
            <div>
                <div className="groupbox">
                    <div className="userpanel">
                        <table style={{margin:'auto',width:'70%'}}> 
                            <tbody>
                                <tr style={{height:'40px'}}>
                                    <td id='mytd' style={{textAlign:"left"}}>username</td>
                                    <td id='mytd'>{this.state.username}</td>
                                </tr>
                                <tr style={{height:'40px'}}>
                                    <td id='mytd' style={{textAlign:"left"}}>spartan's</td>
                                    <td id='mytd'>{this.state.name}</td>
                                </tr>
                            </tbody>
                        </table>
                        <ButtonGroup >
                            <Button bsStyle="success" onClick={()=>{this.setState({showmodal:true})}}><i className="fas fa-plus"/> Create Group</Button>
                            <Button bsStyle="warning" onClick={()=>{this.setState({showmodal2:true})}}><i className="fas fa-sign-in-alt"></i> Join Group</Button>
                        </ButtonGroup>
                        <div style={{height:'5px'}}/>
                        <Button bsStyle="danger" onClick={this.handleLogout}><i className="far fa-times-circle"/> Leave Battle</Button>
                    </div>
                    <div className="grouppanel">
                        <Table striped hover >
                            <thead>
                                <tr>
                                    <th style={{textAlign:'center'}}>GroupID</th>
                                    <th style={{textAlign:'center'}}>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.chatrooms.map((room,index)=>{
                                    if (room.token === this.state.currentroom){
                                        return (
                                        <tr style={{backgroundColor:'wheat'}} key={index}>
                                            <td style={{width:'100px',wordBreak:'break-all'}}>{room.token}</td>
                                            <td>
                                                <ButtonGroup style={{margin:'auto'}}>
                                                    <Button onClick={this.handleChatRoom.bind(this,room.token)}><i className="far fa-comments"></i></Button>
                                                    <Button onClick={this.handleBreak}><i className="fas fa-comment-slash"></i></Button>
                                                    <Button onClick={this.handleLeaveRoom.bind(this,room.token)}><i className="fas fa-times"></i></Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                        )
                                    }
                                    else return(
                                    <tr key={index}>
                                        <td style={{width:'130px',wordBreak:'break-all'}}>{room.token}</td>
                                        <td>
                                            <ButtonGroup style={{margin:'auto'}}>
                                                <Button onClick={this.handleChatRoom.bind(this,room.token)}><i className="far fa-comments"></i></Button>
                                                <Button onClick={this.handleLeaveRoom.bind(this,room.token)}><i className="fas fa-times"></i></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="flex-container2">
                    <p>Group : <i>{this.state.currentroom}</i></p>
                    <div className='groupmember'>
                        <p>member: </p>
                        {this.state.userInRoom.map((user,idx)=>(<Badge style={{margin:'5px 5px 5px 5px'}} key={idx}>{user.username}</Badge>))}
                    </div>
                    <div style={{borderBottom:'2px solid',width:"100%"}}>
                    </div>
                    <div className="msgbox">
                        {this.state.messages.map((msg,idx)=>{
                            if (msg.sender.username === this.state.username){
                                return (
                                    <div key={idx} className="usermsg">
                                        <div className="usermsg-content">
                                            <p>{msg.content}</p>
                                        </div>
                                        <p className="time">{new Date(msg.createdDate).toLocaleString()}</p>
                                    </div>
                                )
                            }
                            else {
                                if (msg._id === this.state.lastSeenMessage && idx !== this.state.messages.length-1){
                                    return (
                                        <React.Fragment>
                                        <div key={idx} className="guestmsg">
                                            <p>{msg.sender.username}</p>
                                            <div className="guestmsg-content">
                                                <p>{msg.content}</p>
                                            </div>
                                            <p className="time">{new Date(msg.createdDate).toLocaleString()}</p>
                                        </div>
                                        <p key={idx} style={{margin:'auto',marginTop:'10px'}}> Unread Message</p>
                                        <div key={idx} style={{borderBottom:"3px solid"}}/>
                                        </React.Fragment>
                                    )
                                }
                                else return (
                                    <div key={idx} className="guestmsg">
                                        <p>{msg.sender.username}</p>
                                        <div className="guestmsg-content">
                                            <p>{msg.content}</p>
                                        </div>
                                        <p className="time">{new Date(msg.createdDate).toLocaleString()}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <Form inline>
                        <FormGroup style={{width:'90%'}}>
                            <FormControl value={this.state.message} onChange={(e)=>{this.setState({message:e.target.value})}} style={{width:'100%'}} componentClass="textarea"/>
                        </FormGroup>
                        <Button onClick={this.handleSendMsg} style={{width:'10%',height:'100%'}}><i style={{fontSize:'300%'}} className="far fa-arrow-alt-circle-right"></i></Button>
                    </Form>
                </div> 

                <Modal show={this.state.showmodal} onHide={()=>{this.setState({showmodal:false})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{color:'red'}}>{this.state.join_user_msg}</p>
                        <Form inline style={{textAlign:'center'}}>
                            <FormGroup style={{margin:"auto"}}>
                                <ControlLabel>Group member</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Member name"
                                    onChange={(e)=>this.setState({join_user:e.target.value,join_user_msg:''})}
                                    style={{margin:'0 10px 0 10px'}}
                                />
                                <Button onClick={this.handleAddMember}>add member</Button>   
                            </FormGroup>
                        </Form>
                        <div className="flex-container" style={{margin:'5px 5px 5px 5px'}}>
                            {this.state.join_users.map((join_user,index)=>(<Badge style={{margin:"4px 4px 4px 4px"}} key={index}>{join_user}</Badge>))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{this.setState({showmodal:false,join_users:[]})}}>Close</Button>
                        <Button onClick={this.handleCreateRoom} bsStyle="primary">Save</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showmodal2} onHide={()=>{this.setState({showmodal:false})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Join Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{color:'red'}}>{this.state.err2}</p>
                        <Form inline style={{textAlign:'center'}}>
                            <FormGroup style={{margin:"auto"}}>
                                <ControlLabel>Group ID</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Enter GroupID"
                                    onChange={(e)=>this.setState({joinGroupID:e.target.value})}
                                    style={{margin:'0 10px 0 10px'}}
                                />  
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{this.setState({showmodal2:false})}}>Close</Button>
                        <Button onClick={this.handleJoinGroup} bsStyle="primary">Join Group</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ChatPage;