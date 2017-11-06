import PageFront from 'components/PageFront';
import PageAdvertList from 'components/PageAdvertList';
import PageAdvertDetail2 from 'components/page_advert_detail_2';

export default [
    {
        path: '/',
        component: PageFront,
        exact: true
    },
    {
        path: '/adverts',
        component: PageAdvertList,
        exact: true
    },
    {
        path: '/adverts/:slug',
        component: PageAdvertDetail2,
        exact: true
    }
];
