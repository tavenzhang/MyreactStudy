import {Alert} from 'react-native';
//'default': string, 'cancel': string,  'destructive': string,
//alert 简单封装 方便控制 样式，减少import
global.G_AlertUtil={

    show:(title=String,message=String,actList:Array=[])=>{
        if(actList.length>0) {
            actList[0].style='default'
        }
        Alert.alert(title,message,actList);
    },
    showWithCancel:(title=String,message=String,actList:Array=[])=>{
        if(actList.length>0) {
            actList[0].style='cancel'
        }
        Alert.alert(title,message,actList);
    },
    showWithDestructive:(title=String,message=String,actList:Array=[])=>{
        if(actList.length>0) {
            actList[0].style='destructive'
        }
        Alert.alert(title,message,actList);
    },
}
