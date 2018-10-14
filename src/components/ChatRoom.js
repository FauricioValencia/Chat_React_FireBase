import React, {Component} from 'react';

class ChatRoom extends Component{
constructor(props){
    super(props);
    this.state={
        message:'',
        messages:[
            // {id:0, text:'wasa'},
            // {id:1, text:'pasa'},
            // {id:2, text:'qasa'},
        ]
    }
}
handleSubmit =(e)=>{
    e.preventDefault();
    const list = this.state.messages;
    const newMessage ={
        id: this.state.messages.length,
        text: this.state.message
    }
    window.firebase.database().ref(`messages/${newMessage.id}`)
    .set(newMessage);
    this.setState({message:''});
}
updateMessage =(e)=>{
    this.setState({message:e.target.value})
    console.log(this.state.message);
}
componentDidMount(){
    window.firebase.database().ref('messages/').on('value', snap => {//    buscar la correcta definicion de este metodo de firebase
        const currentMessages =snap.val();//nos va a traer los mensajes que tiene en la base de datos
        if(currentMessages !== null){
            this.setState({
                messages:currentMessages
            })
        }
    });
}
    render() {
        const { messages, message } = this.state;
        const messageList = messages.map((item,index) => <li key={index}>{item.text}</li>)
      return(
        <div>
            <lo>
        {messageList}
            </lo>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input 
                type="text"
                value ={message}
                onChange={this.updateMessage.bind(this)}
                />
                <button>send</button>
            </form>
        </div>
        )
    }
}

export default ChatRoom;
