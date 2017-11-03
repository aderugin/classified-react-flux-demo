import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';

import routes from 'routes';
import { createStore } from 'utils/store';


export default function renderReact(request, response) {
    const store = createStore();
    const components = matchRoutes(routes, request.url).map(r => [r.route.component, r.match]);
    if (!components.length) {
        response.status(404).send('Url doesn\'t exist');
    }

    const promises = components
        .filter(c => c[0] && typeof c[0].fetchData === 'function')
        .map(c => c[0].fetchData({ match: c[1] }));

    Promise.all(promises).then(() => {
        response.send(template({
            html: renderToString(
                <StaticRouter location={request.url} context={{}}>
                    {renderRoutes(routes)}
                </StaticRouter>
            ),
            title: 'Classified',
            state: store.getState()
        }));
    }).catch(error => response.status(500).send(error.message));
}


function template(context) {
    const { title, html, state } = context;
    return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="stylesheet" href="/build/bundle.css">
    </head>
    <body>
        <div id="app">${html}</div>
        <script type="text/javascript" charset="utf-8">
            window.__INITIAL_STATE__ = ${JSON.stringify(state)};
        </script>
        <script type="application/javascript" src="/build/vendor.js"></script>
        <script type="application/javascript" src="/build/bundle.js"></script>
    </body>
</html>`;
}