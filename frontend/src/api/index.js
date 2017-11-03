import axios from 'axios';

const BASE_URL = BROWSER ? '' : 'http://webapp:8000';

export const urls = {
    advertList: () => `${BASE_URL}/api/adverts/`,
    advertDetail: slug => `${BASE_URL}/api/adverts/${slug}/`
};


export const advertsApi = {
    list: () => axios.get(urls.advertList()),
    detail: slug => axios.get(urls.advertDetail(slug))
};