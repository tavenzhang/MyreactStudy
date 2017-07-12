import {fromJS} from 'immutable';
import {NavigationActions} from 'react-navigation';
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
export const AppStackNavigator = StackNavigator(G_NavAppRoutConfig,G_NavAppOptionsConfig);
const initialNavState = fromJS(AppStackNavigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'Main',
        }),
    ],
})));

const navState = (state = initialNavState, action) => {
    let nextState=null
    if(action.type.indexOf("Navigation/")>-1)
    {
        //TLog("nextState----------------action",action)
         nextState = state.merge(AppStackNavigator.router.getStateForAction(action, state.toJS()));
        // TLog("nextState----------------after",nextState)
    }

    return nextState || state;
}

export default navState