import React from 'react';
import {Container, Grid, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
class Feed extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {posts} = this.props;
    return(
      <Container className="post-container">
      {posts.map(post => {
        return(
          <div key={post.id} style={{marginBottom: '20px'}}>
              <img  height="50px" width="50px" style={{marginRight: '20px'}} src={post.imageUrl} />
              <div style={{display: 'inline-block'}}>
                <h1 style={{marginBottom: '0'}}><Link to={"/view/post/" + post.id}> {post.title} </Link> <Link to={"/subreddit/view/" + post.subreddit.name}><span style={{fontSize: '15px', color: 'grey'}}>{'/' + post.subreddit.name}</span></Link></h1>
                <p> {post.content.length > 120 ? post.content.slice(0,120) : post.content} </p>
              </div>
          </div>
        )
      })}
      </Container>
    )
  }
}

export default Feed;
