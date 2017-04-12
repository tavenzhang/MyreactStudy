import {fromJS} from 'immutable';
const initHomeState = fromJS({
    bannerList:[]
})

const homeState = (state = initHomeState, action) => {

    switch (action.type) {
        case ActionType.HomeType.BANNERS_RESULT:
            return state.merge({bannerList:action.bannerList});
        default:
            return state;
    }
}

export default homeState