import 'page_advert_detail.less';

import React from 'react';
import actions from 'actions';
import { connect } from 'utils/store';

class PageAdvertDetail2 extends React.Component {
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
        <h1 className='page-advert-detail'>Advert detail 2</h1>
        {advertDetail.title}
      </div>
    );
  }
}


PageAdvertDetail2 = connect(PageAdvertDetail2, state => state.advertDetail);

export default PageAdvertDetail2;