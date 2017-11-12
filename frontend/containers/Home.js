import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import {fetchPosts} from '../actions/fetchPosts';
import {bindActionCreators} from 'redux';
import {Container} from 'semantic-ui-react';
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.props.fetchPosts();
    }
    render() {
        return (
          <div>
            <Header />
            <Feed posts={this.props.posts} />
            <SideBar />
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
        posts: state.fetchPostsReducer.posts
    };
};

const mapDispatchToProps = (dispatch) => {
      return bindActionCreators({fetchPosts}, dispatch);

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
