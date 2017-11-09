import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import { Route } from 'react-router-dom';
import { ConnectedRouter} from 'react-router-redux';
const AppContainer = ({history}) => {
    return (
        <div>
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/" component={Home}/>

            </div>
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
