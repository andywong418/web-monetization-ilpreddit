import React from 'react';
import { Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {onNewSubreddit} from '../actions/NewSubreddit';
class NewSubreddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title : '',
      description: ''
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
    const {onNewSubreddit} = this.props;
    return (
      <Container>
      <h1> Create a New Subreddit </h1>
      <Form>
        <Form.Group>
          <Form.Input onChange={this.handleInputChange} label='Title' name="title" placeholder='Title' name="title" value={this.state.title}/>
        </Form.Group>
        <Form.TextArea onChange={this.handleInputChange} label='About' name="description" value={this.state.description} placeholder='Post description...' />
        <Form.Button onClick={() => onNewSubreddit(this.state.title, this.state.description)}>Submit</Form.Button>
      </Form>
      </Container>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({onNewSubreddit}, dispatch);
};

export default connect(null, mapDispatchToProps)(NewSubreddit);
