import {fromJS} from 'immutable';
import {NavigationActions,StackNavigator} from 'react-navigation';

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
        // console.log("preState----------------",AppStackNavigator.router)
        let nextState = state.merge(AppStackNavigator.router.getStateForAction(action, state.toJS()));
        //  const nextState = AppStackNavigator.router.getStateForAction(action, state);
        // Simply return the original `state` if `nextState` is null or undefined.
        //TLog("nextState----------------",nextState)
        return nextState || state;
}

export default navState