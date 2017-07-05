#! /bin/bash
code-push release tcp ios/bundle/index.ios.jsbundle 1.0.1 --deploymentName Staging --description '新版本' --mandatory true

code-push release-react tcpTest-ios ios -t 1.0.2  -m true --description '新版本测试'
code-push release-react tcpTest-ios  ios -t 1.0.2  --description '新版本测试'

code-push release-react tcpTest-android android  -t 1.0.2   --description '新版本测试'

code-push release-react tcpTest-android android  -m true -t 1.0.2   --description '新版本测试'
react-native run-android --variant=release

react-native run-ios --configuration Release

code-push release-react tcpTest-ios  ios  --description '新版本测试'
code-push release-react tcpTest-android android   --description '新版本测试'
code-push release-react tcpTest-android android  -m true  --description '新版本测试'

react-native bundle --platform 平台 --entry-file 启动文件 --bundle-output 打包js输出文件 --assets-dest 资源输出目录 --dev 是否调试。
react-native bundle --platform ios --entry-file index.ios.js --bundle-output ./bundle/main.jsbundle --dev false

 code-push release tcpTest-android /Users/thomas/Desktop/taven  1.0.1 --description "1.0" --mandatory true