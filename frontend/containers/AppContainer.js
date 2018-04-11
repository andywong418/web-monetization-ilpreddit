import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import NewPost from '../components/NewPost';
import PostPage from './PostPage';
import NewSubreddit from '../components/NewSubreddit';
import { Route } from 'react-router-dom';
import { ConnectedRouter} from 'react-router-redux';
import {withRouter} from 'react-router';
const App = () => {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/post/new" component={NewPost} />
      <Route exact path="/subreddit/new" component={NewSubreddit} />
      <Route path="/subreddit/view/:name" component={Home} />
      <Route path="/view/post/:id" component={PostPage} />
    </div>
  );
}
const NonBlockApp = withRouter(App);
const AppContainer = ({history, store}) => {
    return (
        <div>
          <ConnectedRouter history={history}>
            <NonBlockApp />
          </ConnectedRouter>
        </div>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
    history: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
