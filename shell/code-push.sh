#! /bin/bash
code-push release tcp ios/bundle/index.ios.jsbundle 1.0.1 --deploymentName Staging --description '新版本' --mandatory true

code-push release-react tcp-ios ios -t 1.0.2  -m true --description '新版本测试'
code-push release-react tcp-ios ios -t 1.0.2  --description '新版本测试'

code-push release-react tcp-android android  -t 1.0.2   --description '新版本测试'

code-push release-react tcp-android android  -m true -t 1.0.2   --description '新版本测试'
react-native run-android --variant=release

react-native run-ios --configuration Release

code-push release-react tcp-ios ios  --description '新版本测试'
code-push release-react tcp-android android   --description '新版本测试'
code-push release-react tcp-android android  -m true  --description '新版本测试'