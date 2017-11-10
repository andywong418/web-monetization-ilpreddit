import React from 'react';
// import {Link} from 'react-router';
import PropTypes from 'prop-types';
import { Form, Container } from 'semantic-ui-react';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      attachments: '',
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

  submitPost() {

  }

  render() {
    return (
      <Container>
      <h1> Create a New Post </h1>
      <Form>
        <Form.Group>
          <Form.Input onChange={this.handleInputChange} label='Title' name="title" placeholder='Title' name="title" value={this.state.title}/>
        </Form.Group>
        <Form.TextArea onChange={this.handleInputChange} label='About' name="content" value={this.state.content} placeholder='Post content...' />
        <Form.Button onClick={this.submitPost}>Submit</Form.Button>
      </Form>
      </Container>
    )
  }
}

export default NewPost;
