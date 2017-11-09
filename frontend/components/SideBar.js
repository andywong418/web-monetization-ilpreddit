import React from 'react';
// import {Link} from 'react-router';
import PropTypes from 'prop-types';
import { Button, Modal, Header, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {onRegister, onLogin, onLogOut} from '../actions/sidebar';
import {bindActionCreators} from 'redux';
import {isEmpty} from '../utils/index';
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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
        return (
          <div className="sidebar-container">
            <Button basic color="red">Submit a new post</Button>
            {isEmpty(this.props.user) ?   <div className="register-login">
              <Modal trigger={        <Button.Group>
                        <Button>Log in</Button>
                        <Button.Or />
                        <Button positive>Sign Up</Button>
                      </Button.Group>}>
                <Modal.Header>Log In Or Sign Up!</Modal.Header>
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
                    <Button basic color ="orange" type="submit" onClick={() => this.props.onLogin(this.state.username, this.state.password)}>Log in</Button>
                    <Button basic color ="teal" type="submit" onClick={() => this.props.onRegister(this.state.username, this.state.password)}>Sign Up</Button>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              </div> : <div style={{marginTop: '20px'}} className="logout-btn"><Button color="red" onClick={() => this.props.onLogOut(this.props.user)}>Log out</Button> </div>}

            <div>
              {this.props.description}
            </div>
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
        user: state.sidebarReducer.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({onRegister, onLogin, onLogOut}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
