import Layout from '../components/layout';
import { Component } from 'react';
import io from 'socket.io-client';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';

class ExamplesPage extends Component {
  handleInputChange = this.handleInputChange.bind(this);

  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';

    const [resMessages, resUsers] = await Promise.all([
      fetch(`${baseUrl}/api/examples/messages`),
      fetch(`${baseUrl}/api/user/getAll`)
    ]);

    const messages = await resMessages.json();
    const users = await resUsers.json();

    return {
      messages,
      users
    };
  }

  static defaultProps = {
    messages: [],
    users: []
  };

  state = {
    socketMessage: '',
    messages: this.props.messages,
    users: this.props.users,
    newUser: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  };

  componentDidMount() {
    this.socket = io();
    this.socket.on('message', this.handleMessage);
    this.socket.on('newUser', this.handleNewUser);
  }

  componentWillUnmount() {
    this.socket.off('message', this.handleMessage);
    this.socket.off('newUser', this.handleNewUser);
    this.socket.close();
  }

  handleMessage = message => {
    this.setState(state => ({ messages: state.messages.concat(message) }));
  };

  handleNewUser = newUser => {
    this.setState(state => ({ users: state.users.concat(newUser) }));
  };

  handleSocketMessageChange = event => {
    this.setState({ socketMessage: event.target.value });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let newUser = { ...this.state.newUser, [name]: value };
    this.setState({ newUser });
  }

  handleSocketMessageSubmit = event => {
    event.preventDefault();

    // create message object
    const message = {
      id: new Date().getTime(),
      value: this.state.socketMessage
    };

    // send object to WS server
    this.socket.emit('message', message);

    // add it to state and clean current input value
    this.setState(state => ({
      socketMessage: '',
      messages: state.messages.concat(message)
    }));
  };

  async saveUser() {
    const res = await fetch('/api/user/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.newUser
      })
    });
    const newUser = await res.json();

    // send object to WS server
    this.socket.emit('newUser', newUser);

    // add it to state and clean current input value
    this.setState(state => ({
      users: state.users.concat(newUser),
      newUser: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      }
    }));
  }

  handleAddUser = event => {
    event.preventDefault();
    this.saveUser();
  };

  render() {
    return (
      <Layout title={'Examples'}>
        <h1>Socket IO</h1>
        <form onSubmit={this.handleSocketMessageSubmit}>
          <input
            onChange={this.handleSocketMessageChange}
            type="text"
            placeholder="Your message"
            value={this.state.socketMessage}
          />
          <button>Send</button>
        </form>
        <ul>
          {this.state.messages.map(message => (
            <li key={message.id}>{message.value}</li>
          ))}
        </ul>

        <hr />

        <h1>Users</h1>
        <ul>
          {this.state.users.map(user => (
            <li key={user._id}>
              {user.lastName}, {user.firstName}
            </li>
          ))}
        </ul>
        <br />
        <div className="input-group">
          <label htmlFor="firstName">Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={this.state.newUser.firstName}
            onChange={this.handleInputChange}
            placeholder="name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={this.state.newUser.lastName}
            onChange={this.handleInputChange}
            placeholder="name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={this.state.newUser.username}
            onChange={this.handleInputChange}
            placeholder="name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            value={this.state.newUser.email}
            onChange={this.handleInputChange}
            placeholder="name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={this.state.newUser.password}
            onChange={this.handleInputChange}
            placeholder="name"
          />
        </div>
        <button onClick={this.handleAddUser}>Add user!</button>

        <style jsx>{`
          ul {
            padding: 0;
            list-style: none;
          }
          .input-group {
            display: block;
          }
          .input-group label {
            display: block;
          }
        `}</style>
      </Layout>
    );
  }
}

ExamplesPage.propTypes = {
  messages: PropTypes.array,
  users: PropTypes.array
};

export default ExamplesPage;
