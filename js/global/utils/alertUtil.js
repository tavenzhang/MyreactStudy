import {Alert,Linking} from 'react-native';
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




global.G_Link= {
    openUrl: (url = 'weixin://', errorMsg = "请先安装XXX") => {
        // 2、跳转代码
        Linking.canOpenURL(url).then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL(url);
            } else {
                G_AlertUtil.show("", errorMsg);
            }
        }).catch(err => G_AlertUtil.show('An error occurred', err))
    }
}


