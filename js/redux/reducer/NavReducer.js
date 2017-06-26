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
        //TLog("nextState----------------action",action)
        let nextState = state.merge(AppStackNavigator.router.getStateForAction(action, state.toJS()));
        //TLog("nextState----------------",nextState)
        return nextState || state;
}

export default navState