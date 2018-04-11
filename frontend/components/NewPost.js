import React from 'react';
// import {Link} from 'react-router';
import PropTypes from 'prop-types';
import { Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {onPost} from '../actions/newPost';
import { Dropdown } from 'semantic-ui-react';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      imageUrl: '',
      subreddit: '',
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

  setSubreddit(event, data) {
    this.setState({ subreddit: data.value });
  }
  render() {
    let {onPost, subreddits} = this.props;
    // Parse subreddits
    subreddits = subreddits.map(subreddit => {
      return {
        text: subreddit.name,
        value: subreddit.id
      }
    });
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
        <Form.Group>
          <Form.Field>
            <label> Subreddit to post to </label>
            <Dropdown placeholder='Select Subreddit' search selection options={subreddits} onChange={(event, data) => this.setSubreddit(event, data)}/>
          </Form.Field>
        </Form.Group>
        <Form.Button style={{marginTop: '10px'}} onClick={() => onPost(this.state.title, this.state.content, this.state.imageUrl, this.state.subreddit)}>Submit</Form.Button>
      </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    subreddits: state.subredditReducer.subreddits
  }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({onPost}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
