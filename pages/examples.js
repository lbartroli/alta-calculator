import Layout from "../components/layout";
import { Component } from "react";
import io from "socket.io-client";
import fetch from "isomorphic-unfetch";

class ExamplesPage extends Component {

    static async getInitialProps({ req, store, isServer }) {
        const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
        const res = await fetch(`${baseUrl}/api/examples/messages`);
        const messages = await res.json();
    
        return {
            messages
        };
    };
    
    static defaultProps = {
        messages: []
    };
    
    state = {
        field: "",
        messages: this.props.messages
    };
    
    componentDidMount() {
        this.socket = io();
        this.socket.on("message", this.handleMessage);
    }
    
    componentWillUnmount() {
        this.socket.off("message", this.handleMessage);
        this.socket.close();
    }
    
    handleMessage = message => {
        this.setState(state => ({ messages: state.messages.concat(message) }));
    };
    
    handleChange = event => {
        this.setState({ field: event.target.value });
    };
    
    handleSubmit = event => {
        event.preventDefault();
        
        // create message object
        const message = {
            id: new Date().getTime(),
            value: this.state.field
        };
        
        // send object to WS server
        this.socket.emit("message", message);
        
        // add it to state and clean current input value
        this.setState(state => ({
            field: "",
            messages: state.messages.concat(message)
        }));
    };

    render() {
        return (
            <Layout title={'Examples'}>
                <h1>Messages</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Hello world!"
                        value={this.state.field}
                        />
                    <button>Send</button>
                </form>
                <ul>
                    {this.state.messages.map((message) => (
                        <li key={message.id}>{message.value}</li>
                    ))}
                </ul>
                <style jsx>{`
                    ul {
                        padding: 0;
                        list-style: none;
                    }
                `}</style>
            </Layout>
        )
    }
}

export default ExamplesPage;