import React from 'react';
import { Form, Container, Icon, Card, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// import {replyComment} from '../actions/postPage';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      comment: '',
      commentId: 0,
      modalOpen: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchRecursiveNodes = this.searchRecursiveNodes.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  handleOpen(id) {this.setState({ modalOpen: true, commentId: id });}

  handleClose() {this.setState({ modalOpen: false });}

  searchRecursiveNodes(topLevelComments, comments) {
    const postId = this.props.postId;
    return topLevelComments.map(comment => {
      return(
        <div key={comment.id} style={{marginLeft: '10px'}}>
        <Card key={comment.id}>
        <Card.Content>
          <Card.Description>
            <Icon name='terminal' />
            <span>{comment.content}</span>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Modal trigger={<Button onClick={() => this.handleOpen(comment.id)}>Reply</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        >
          <Modal.Content>
            <Modal.Description>
              <Form className="post-comment">
                <Form.TextArea className="post-comment-box" onChange={this.handleInputChange} label='Reply' name="comment" value={this.state.comment} placeholder='Post Comment...' />
                <Form.Button onClick={() => {console.log("commentid", this.state.commentId);this.props.replyComment(this.state.comment, this.state.commentId, postId); this.setState({comment: '', modalOpen: false})}}>Submit</Form.Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        </Card.Content>
        </Card>
        {comments.filter(x => x.parentId===comment.id).length !== 0 ? this.searchRecursiveNodes(comments.filter(x => x.parentId===comment.id), comments) : <div></div>}
        </div>

      )

    })
  }

  render() {
    const {comments} = this.props.comments;
    //recursion
    let topLevelComments;
    if(this.props.comments) {
      topLevelComments = this.props.comments.filter(x => !x.parentId);
    }

    //recursively look for
    return(
      <div style={{marginTop: '20px'}}>
        {topLevelComments ? this.searchRecursiveNodes(topLevelComments, this.props.comments) : <div></div>}
      </div>
    )
  }
}

export default CommentList;
