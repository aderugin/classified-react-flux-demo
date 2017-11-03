import React from 'react';
import { ReduceStore } from 'flux/utils';
import _ from 'lodash';
import dispatcher from './dispatcher';
import rootReducer, { defaultState } from 'reducers';

let _store = null;


export function createStore(initialState = {}) {
    class Store extends ReduceStore {
        constructor() {
            super(dispatcher);
        }

        getInitialState() {
            return _.merge(defaultState, initialState);
        }

        reduce = rootReducer;
    }
    _store = new Store();
    return _store;
}


export function getStore() {
    if (_store === null) {
        throw new Error('You must createStore before using getStore');
    }
    return _store;
}


export function connect(Component, selectState = null) {
    selectState = selectState || (state => state);
    const fetchData = Component.fetchData;
    if (fetchData) {
        delete Component.fetchData;
    }

    return class extends React.Component {
        static displayName = `connected(${Component.displayName || Component.name})`

        static fetchData = fetchData

        _changeListener = null;

        constructor(props, context) {
            super();
            this.store = getStore();
            this.state = { data: selectState(this.store.getState()) };
        }
    
        componentDidMount() {
            this._changeListener = this.store.addListener(this.handleChangeStore);
        }
    
        componentWillUnmount() {
            this._changeListener.remove();
        }
    
        handleChangeStore = () => {
            this.setState({ data: selectState(this.store.getState()) });
        }

        render() {
            return <Component
                data={this.state.data}
                store={this.store}
                dispatch={dispatcher.dispatch}
                {...this.props}
            />;
        }
    };
}