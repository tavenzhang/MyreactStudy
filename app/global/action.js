
import { FetchAct } from '../redux/action/FetchAction';
import { HomeAct } from '../redux/action/HomeAction';
import { GameAct } from '../redux/action/GameAction';
import { AppAct } from '../redux/action/AppAction';
import { NoticeAct } from '../redux/action/NoticeAction';

//全局dispatch 以免四处 import 需要利用redux 的bindActionCreators 进行一次全局绑定
global.ActDispatch={
    FetchAct,
    HomeAct,
    AppAct,
    GameAct,
    NoticeAct,
}

//纯action 枚举
global.ActionEnum={
    FetchAct,
    HomeAct,
    AppAct,
    NoticeAct,
    GameAct
}

