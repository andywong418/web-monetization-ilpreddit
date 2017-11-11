import React from 'react';
import { Form, Container, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// import {replyComment} from '../actions/postPage';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  searchRecursiveNodes(topLevelComments, comments) {
    return topLevelComments.map(comment => {
      console.log("comment", comment);
      return(
        <div style={{marginLeft: '10px'}}>
        {comment.content}
        {comments.filter(x => x.parentId===comment.id).length !== 0 ? this.searchRecursiveNodes(comments.filter(x => x.parentId===comment.id), comments) : <div></div>}
        </div>

      )

    })
  }
  render() {
    const {comments} = this.props.comments;
    //recursion
    console.log("THISPROPS", this.props.comments);
    let topLevelComments;
    if(this.props.comments) {
      topLevelComments = this.props.comments.filter(x => !x.parentId);
    }

    //recursively look for
    console.log("topLevelComments", topLevelComments);
    return(
      <div>
        {topLevelComments ? this.searchRecursiveNodes(topLevelComments, this.props.comments) : <div></div>}
      </div>
    )
  }
}

export default CommentList;
