import {connect} from 'react-redux';
import App from './App';

const AppContainer = connect(
    state => ({
        temperature: state.temperature
    }),
    dispatch => ({})
)(App);

export default AppContainer;

