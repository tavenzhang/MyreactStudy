import {fromJS} from 'immutable';
const initFetchState = fromJS({
    requesting : false,
    fail: false,
    success: true
})

const fetchState = (state = initFetchState, action) => {
    switch (action.type){
        case ActionType.FetchType.FETCH_REQUEST :
            return state.merge({requesting:true,fail:false,success:false});
        case ActionType.FetchType.FETCH_FAILED :
            return state.merge({requesting:false,fail:true,success:false});
        case ActionType.FetchType.FETCH_SUCCEED :
            return state.merge({requesting:false,fail:false,success:true});
        default:
            return state;
    }
}

export default fetchState;