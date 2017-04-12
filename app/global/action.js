/**
 * Created by zhangxinhua on 16/12/11.
 */
import { FetchAct } from '../redux/action/FetchAction';
import { HomeAct } from '../redux/action/HomeAction';
import { AppAct } from '../redux/action/AppAction';
import { NoticeAct } from '../redux/action/NoticeAction';
import { ActionType } from '../redux/action/ActionType';
export {
    FetchAct,
    HomeAct,
    AppAct,
    NoticeAct,
    ActionType
}

//全局dispatch 以免四处 import 需要利用redux 的bindActionCreators 进行一次全局绑定
const ActDispatch={
    FetchAct,
    HomeAct,
    AppAct,
    NoticeAct,
}
global.ActDispatch=ActDispatch;

//纯action 枚举
const ActionEnum={
    FetchAct,
    HomeAct,
    AppAct,
    NoticeAct,
}

global.ActionEnum=ActionEnum;
