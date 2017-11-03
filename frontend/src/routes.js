import PageFront from 'components/PageFront';
import PageAdvertList from 'components/PageAdvertList';
import PageAdvertDetail from 'components/PageAdvertDetail';

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
        component: PageAdvertDetail,
        exact: true
    }
];
