import React from 'react';
import { Link } from 'react-router-dom';


export default class PageFront extends React.Component {
    render() {
        return (
            <div>
                <h1>Frontpage</h1>
                <Link to="/adverts/">Adverts</Link>
            </div>
        );
    }
}
