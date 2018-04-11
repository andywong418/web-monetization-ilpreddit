import React from 'react';
// import {Link} from 'react-router';
import PropTypes from 'prop-types';
import { Button, Modal, Header, Form, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {onRegister, onLogin, onLogOut, subscribeSubreddit, fetchUser} from '../actions/sidebar';
import {bindActionCreators} from 'redux';
import {isEmpty} from '../utils/index';
import { history } from '../store/configureStore';
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            paymentPointer: '',
            modalOpen: false,
            modalState: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitPost = this.submitPost.bind(this);
        this.submitSubreddit = this.submitSubreddit.bind(this);
    }
    componentDidMount() {
      this.props.fetchUser();
    }
    handleOpen(state) {this.setState({ modalOpen: true, modalState: state  });}

    handleClose() {this.setState({ modalOpen: false });}

    submitPost() {
      if(!isEmpty(this.props.user)) {
        // redirect to different page
        history.push('/post/new');
      } else {
        this.setState({modalOpen: true});
      }
    }

    submitSubreddit() {
      if(!isEmpty(this.props.user)) {
        // redirect to different page
        history.push('/subreddit/new');
      } else {
        this.setState({modalOpen: true});
      }
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        if(target.name === 'interests' || target.name === 'languages') {
            value = [value];
        }
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    render() {
        let subscribed = false;
        if(this.props.subredditId) {
          this.props.subscriptions.forEach(subscription => {
            if(subscription.subredditId === this.props.subredditId && subscription.subreddit.name === this.props.subreddit) {
              subscribed = true;
            }
          })
        }
        return (
          <div className="sidebar-container">
            {this.props.subreddit ?
              <div style= {{marginBottom: '30px'}}>
                <h3> /{this.props.subreddit} </h3>
                <p style = {{maxWidth: '80%', marginLeft: '10%'}}> {this.props.subredditDescription} </p>
                {isEmpty(this.props.user) ? null : subscribed ? <Button basic color="orange"> Subscribed </Button> : <Button color="orange" onClick={() => this.props.subscribeSubreddit(this.props.subredditId)}> Subscribe </Button>}
              </div>
              :
              null
            }
            <Button basic color="teal" className="create-subreddit" onClick={this.submitSubreddit}> Create a new subreddit </Button>
            <Button basic color="red" onClick={this.submitPost}>Submit a new post</Button>
            {isEmpty(this.props.user) ?
              <div className="register-login">
                <Modal trigger={
                        <Button.Group>
                          <Button onClick={() => this.handleOpen('login')} >Log in</Button>
                          <Button.Or />
                          <Button positive onClick={() => this.handleOpen('signup')}>Sign Up</Button>
                        </Button.Group>
                      }
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                >
                  <Modal.Header>{this.state.modalState === 'login' ? 'Log In' : 'Sign Up'}</Modal.Header>
                  <Modal.Content >
                    <Modal.Description>
                    <Form>
                      <Form.Field>
                        <label>Username</label>
                        <input onChange={this.handleInputChange} name="username" placeholder="Username" />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input onChange={this.handleInputChange} name="password" type="password" placeholder="Password" />
                      </Form.Field>
                      {this.state.modalState === 'signup' ?
                        <Form.Field>
                          <label>Payment Pointer</label>
                          <input onChange={this.handleInputChange} name="paymentPointer" placeholder="Payment Pointer" />
                        </Form.Field>
                        :
                        null
                      }
                      {this.state.modalState === 'login' ? <Button basic color ="orange" type="submit" onClick={() => this.props.onLogin(this.state.username, this.state.password)}>Log in</Button> : null}
                      {this.state.modalState === 'signup' ? <Button basic color ="teal" type="submit" onClick={() => this.props.onRegister(this.state.username, this.state.password, this.state.paymentPointer)}>Sign Up</Button> : null}
                      </Form>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </div>
              :
              <div style={{marginTop: '20px'}} className="logout-btn"><Button color="red" onClick={() => this.props.onLogOut(this.props.user)}>Log out</Button> </div>}
          </div>
        );
    }
}


SideBar.propTypes = {
    description: PropTypes.string,
    onRegister: PropTypes.func,
    onLogin: PropTypes.func,
    onLogOut: PropTypes.func,
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        description: state.sidebarReducer.description,
        user: state.sidebarReducer.user,
        routing: state.routing
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({onRegister, onLogin, onLogOut, subscribeSubreddit, fetchUser}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
