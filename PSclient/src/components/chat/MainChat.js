import React from "react";


import http from "http";
import io from "socket.io-client";

class MainChat extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            chatInput: "",
            msgs: [],
            playerConnected: false
        }
        this.socket = io(http);

        this.ioChatListener();

        this.ioConnectedUserListener();
    }

    ioChatListener(){
        this.socket.on("chat message", (msg) => {

            let msgs = [...this.state.msgs, msg];
            this.setState({ msgs });
        });
    }

    playerConnected(){
        this.socket.on("user connected", () => {
            this.setState({playerConnected: true})

            setTimeout(() => {
                this.setState({playerConnected: false});
            }, 3000);
        });

    }

    ioConnectedUserListener(){
        this.playerConnected();
    }

    onSumit(e){
        e.preventDefault();
        let msgs = [...this.state.msgs, this.state.chatInput];
        this.setState({ msgs });
        this.socket.emit("chat message", this.state.chatInput);
        this.setState({
            chatInput: ""
        });
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){

        const msgs = this.state.msgs.reverse().map((msg, i) => <li key={i}>{msg}</li>);

        return (
            <div><form onSubmit={this.onSumit.bind(this)}>
                <input onChange={this.onChange.bind(this)} value={this.state.chatInput} type="text" name="chatInput" />
                </form>
                <h1>Messages</h1>
                {this.state.playerConnected && <div>Player connected</div>}
                {msgs}
            </div>
        );
    }
}

export default MainChat;
