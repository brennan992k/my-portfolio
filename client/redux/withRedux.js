import React from 'react';
import { Provider } from 'react-redux';
import store from "./store"

const withRedux = (Component) => {
    const Wrapper = (props) => (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    )
    return Wrapper
};

export default withRedux