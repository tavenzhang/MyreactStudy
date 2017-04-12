
import {ActionType } from "./ActionType"

export const NoticeAct= {
    actionType:ActionType,
    flushNoticeListView: (data="") => ({
        type: ActionType.NoticeType.NOTICE_DATA_LIST,
        data
    }),
}

