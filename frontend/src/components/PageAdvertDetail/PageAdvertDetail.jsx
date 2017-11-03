import React from 'react';
import actions from 'actions';
import { connect } from 'utils/store';


class PageAdvertList extends React.Component {
    static fetchData({ match }) {
        const { params: { slug } } = match;
        return actions.loadAdvertDetail(slug);
    }

    componentDidMount() {
        const { match: { params: { slug } } } = this.props;
        actions.loadAdvertDetailIfNeeded(slug);
    }

    render() {
        const advertDetail = this.props.data;
        return (
            <div>
                <h1>Advert detail</h1>
                {advertDetail.title}
            </div>
        );
    }
}


export default connect(PageAdvertList, state => state.advertDetail);
