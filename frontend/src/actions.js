import * as actionTypes from 'constants/actionTypes';
import dispatcher from 'utils/dispatcher';
import { getStore } from 'utils/store';
import { advertsApi } from 'api';

const actions = {
    loadAdverts: () => {
        dispatcher.dispatch({ type: actionTypes.ADVERT_LIST_LOAD_REQUEST });
        return advertsApi.list().then(
            response => dispatcher.dispatch({
                type: actionTypes.ADVERT_LIST_LOAD,
                payload: response.data.results
            })
        ).catch(error => console.log(error));
    },
    loadAdvertsIfNeeded: () => {
        if (shouldLoadAdverts()) {
            return actions.loadAdverts();
        }
    },
    loadAdvertDetail: slug => {
        dispatcher.dispatch({ type: actionTypes.ADVERT_DETAIL_LOAD_REQUEST });
        return advertsApi.detail(slug).then(
            response => dispatcher.dispatch({
                type: actionTypes.ADVERT_DETAIL_LOAD,
                payload: response.data
            })
        ).catch(error => console.log(error));
    },
    loadAdvertDetailIfNeeded: slug => {
        if (shouldLoadAdvertDetail()) {
            return actions.loadAdvertDetail(slug);
        }
    }
};

export default actions;


function shouldLoadAdverts() {
    const state = getStore().getState();
    return !state.advertList || !state.advertList.length;
}


function shouldLoadAdvertDetail() {
    const state = getStore().getState();
    return !state.advertDetail.id;
}
