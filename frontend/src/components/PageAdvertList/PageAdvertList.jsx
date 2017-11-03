import React from 'react';
import actions from 'actions';
import { Link } from 'react-router-dom';
import { connect } from 'utils/store';


class PageAdvertList extends React.Component {
    static fetchData() {
        return actions.loadAdverts();
    }

    componentDidMount() {
        actions.loadAdvertsIfNeeded();
    }

    render() {
        const advertList = this.props.data;
        return (
            <div>
                <h1>Advert list</h1>
                {advertList.map(advert => (
                    <div key={advert.id}>
                        <Link to={`/adverts/${advert.slug}/`}>{advert.title}</Link><br />
                    </div>
                ))}
            </div>
        );
    }
}


export default connect(PageAdvertList, state => state.advertList);
