import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'routes';
import { createStore } from 'utils/store';

createStore(window.__INITIAL_STATE__);

ReactDOM.hydrate(
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>,
    document.getElementById('app')
);
