import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import {Container} from 'semantic-ui-react';
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <Header />
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
)(Home);
