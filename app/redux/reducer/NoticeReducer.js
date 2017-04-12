import {ActionType} from "../action/ActionType";
import {fromJS} from 'immutable';

const initNoticeState = fromJS({
    awardMondy:0,
    noticeList:[],
})

const noticState = (state = initNoticeState, action) => {
    switch (action.type) {
        case ActionType.NoticeType.NOTICE_DATA_LIST:
            return state.set({noticeList:[],awardMondy:0});
        default:
            return state;
    }
}

export default noticState