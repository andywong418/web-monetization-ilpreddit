import React from 'react';
// import {Link} from 'react-router';
import PropTypes from 'prop-types';
import { Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchViewPost, fetchComments, postComments, replyComment} from '../actions/postPage';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import CommentList from '../components/CommentList';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      comment: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchViewPost(id);
    this.props.fetchComments(id);
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
    const {post, comments} = this.props;
    return(
      <div>
      <Header />
      <Container className="post-header-container">
        <img  height="50px" width="50px" style={{marginRight: '20px'}} src={post.imageUrl} />
        <div style={{display: 'inline-block'}}>
          <h1 style={{marginBottom: '0'}}><Link to={"/view/post/" + post.id}> {post.title} </Link></h1>
          <p> {post.content} </p>
        </div>
      </Container>
      <Container>
      <Form className="post-comment">
        <Form.TextArea className="post-comment-box" onChange={this.handleInputChange} label='Comment' name="comment" value={this.state.comment} placeholder='Post Comment...' />
        <Form.Button onClick={() => {this.props.postComments(this.state.comment, post.id); this.setState({comment: ''})}}>Submit</Form.Button>
      </Form>
      </Container>
      <Container className="commentlist-container">
      {comments.length !== 0 ? <CommentList comments={comments} replyComment = {this.props.replyComment} postId={post.id}/> : <div></div>}
      </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        post: state.postPageReducer.post,
        comments: state.postPageReducer.comments
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchViewPost, fetchComments, postComments, replyComment}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
