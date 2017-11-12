import React from 'react';
// import {Link} from 'react-router';
import PropTypes from 'prop-types';
import { Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {onPost} from '../actions/newPost';
class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      imageUrl: '',
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
    const {onPost} = this.props;
    return (
      <Container>
      <h1> Create a New Post </h1>
      <Form>
        <Form.Group>
          <Form.Input onChange={this.handleInputChange} label='Title' name="title" placeholder='Title' name="title" value={this.state.title}/>
        </Form.Group>
        <Form.TextArea onChange={this.handleInputChange} label='About' name="content" value={this.state.content} placeholder='Post content...' />
        <Form.Group>
          <Form.Input onChange={this.handleInputChange} label='Image or Link URL' name="imageUrl" placeholder='Image or Link' value={this.state.imageUrl}/>
        </Form.Group>
        <Form.Button onClick={() => onPost(this.state.title, this.state.content, this.state.imageUrl)}>Submit</Form.Button>
      </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({onPost}, dispatch);
};
export default connect(null, mapDispatchToProps)(NewPost);
