import {
    LayoutAnimation,
} from 'react-native';

//LayoutAnimation.Properties   opacity：透明度 scaleXY：缩放
export const LayoutAnimationHelp={
     defaultSpring:LayoutAnimation.Presets.spring,
     springNoDelete : {
        duration: 400,
        create: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.8,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.6,
        },
        // delete:{
        //     type: LayoutAnimation.Types.spring,
        //     property: LayoutAnimation.Properties.scaleXY,
        // }
    },
}

global.LayoutAnimationHelp=LayoutAnimationHelp;