import * as actionTypes from 'constants/actionTypes';

export const defaultState = {
    advertList: [],
    advertDetail: {
        id: null,
        image: null,
        title: null,
        price: 0,
        slug: null,
        description: null
    }
};


export default function rootReducer(state, action) {
    switch (action.type) {
        case actionTypes.ADVERT_LIST_LOAD:
            return {
                ...state,
                advertList: action.payload
            };

        case actionTypes.ADVERT_DETAIL_LOAD:
            return {
                ...state,
                advertDetail: action.payload
            };

        default:
            return state;
    }
}
