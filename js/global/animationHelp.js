import {
    LayoutAnimation,
} from 'react-native';

//LayoutAnimation.Properties   opacity：透明度 scaleXY：缩放

global.G_LayoutAnimationHelp={
    defaultSpring:LayoutAnimation.Presets.spring,
    springNoDelete : {
        duration: 400,
        create: {
            //type: LayoutAnimation.Types.spring,
            type:LayoutAnimation.Types.easeInEaseOut,
            //  property: LayoutAnimation.Properties.scaleXY,
            property:LayoutAnimation.Properties.opacity,
            springDamping: 0.5,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.9,
        },
    },
    springNoCreate : {
        duration: 400,
        // create: {
        //     //type: LayoutAnimation.Types.spring,
        //     // type:LayoutAnimation.Types.easeInEaseOut,
        //     // //  property: LayoutAnimation.Properties.scaleXY,
        //     // property:LayoutAnimation.Properties.opacity,
        //     // springDamping: 0.5,
        // },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.9,
        },
    },
    springWithDelete : {
        duration: 400,
        create: {
            //type: LayoutAnimation.Types.spring,
            type:LayoutAnimation.Types.easeInEaseOut,
            //  property: LayoutAnimation.Properties.scaleXY,
            property:LayoutAnimation.Properties.opacity,
            springDamping: 0.5,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.7,
        },
        delete:{
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
        }
    },
    springSmallDelete : {
        duration: 300,
        create: {
            //type: LayoutAnimation.Types.spring,
            type:LayoutAnimation.Types.easeInEaseOut,
            //  property: LayoutAnimation.Properties.scaleXY,
            property:LayoutAnimation.Properties.opacity,
            springDamping: 0.5,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.7,
        },
    },
    springCreate : {
        duration: 300,
        create: {
            type: LayoutAnimation.Types.spring,
            //type:LayoutAnimation.Types.easeInEaseOut,
              property: LayoutAnimation.Properties.scaleXY,
           // property:LayoutAnimation.Properties.opacity,
            springDamping: 0.5,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.7,
        },
    }
}


