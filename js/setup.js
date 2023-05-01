'use strict';

var React = require('React');
var BuddyDoeApp = require('./BuddyDoeApp');
const DB = require('./services/DbServices');
const HttpServices = require('./services/HttpServices');


import {Provider} from 'react-redux'
var configureStore = require('./store/configureStore');

class setup extends React.Component {

    state: {
        isLoading: boolean;
        store: any;
    };

    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(() => this.setState({isLoading: false})),
        }

        HttpServices.getAllHotel().then((hotels) => {
            DB.saveHotel(hotels)
        });
    }


    render() {
        return (
            <Provider store={ this.state.store }>
                <BuddyDoeApp />
            </Provider>
        );
    }
}


module.exports = setup;
