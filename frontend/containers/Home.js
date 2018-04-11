import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import {fetchPosts} from '../actions/fetchPosts';
import {fetchSubreddits} from '../actions/fetchSubreddits';
import {fetchSubscriptions} from '../actions/fetchSubscriptions';
import {bindActionCreators} from 'redux';
import {Container} from 'semantic-ui-react';
import {isEmpty} from '../utils/index';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          subscriptionsFetched : false,
        }
    }

    componentDidMount() {
      this.props.fetchPosts();
      this.props.fetchSubreddits();
      if(!isEmpty(this.props.user)) {
        this.props.fetchSubscriptions();
      }
    }

    componentWillReceiveProps(nextProps) {
      if(!isEmpty(nextProps.user) && !this.state.subscriptionsFetched) {
        this.props.fetchSubscriptions();
        this.setState({ subscriptionsFetched: true });
      }
    }
    render() {
        let {posts, subscriptions} = this.props;
        let subreddit = null;
        let description = '';
        let subredditId = null;
        if(this.props.match.params.name) {
          subreddit = this.props.match.params.name;
          posts = posts.filter(post => {
            if(post.subreddit.name === subreddit) {
              description = post.subreddit.description;
              subredditId = post.subreddit.id;
            }

            return post.subreddit.name === subreddit;
          })
        } else {
          // let posts be ranked by subscribed and date
        }

        return (
          <div>
            <Header />
            <Feed posts={posts} />
            <SideBar subreddit={subreddit} subredditDescription={description} subredditId={subredditId} subscriptions = {subscriptions}/>
          </div>
        );
    }
}
Home.propTypes = {
    name: PropTypes.string,
    history: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        name: state.name,
        posts: state.fetchPostsReducer.posts,
        subscriptions: state.subscriptionReducer.subscriptions,
        user: state.sidebarReducer.user,
    };
};

const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({fetchPosts, fetchSubreddits, fetchSubscriptions}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
