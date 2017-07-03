import React from 'react';
import {
    View,
    Text
    , StyleSheet, Image,
    LayoutAnimation
} from 'react-native'
import {ImgHome, ImgMusic, SoundMusic} from "../../../../assets/index";
import {TButtonImg} from "../../../componet/button/TButton";
import Sound from 'react-native-sound';
import Share  from 'react-native-share';
export default class PlayerView extends React.Component {
    constructor(props) {
        TLog("PlayerView====,constructor")
        super(props);
        this.state = {
            isPlaying:false,
            startPlay:false,
            curTime:"00:00",
            shareShow:false
        };
    }

    componentWillUpdate() {
            LayoutAnimation.configureNext(G_LayoutAnimationHelp.springStart);
    }

    render() {
        let playControlView=null;
        playControlView=  <View style={{position:"absolute",bottom: 0,left:0, width:G_Theme.windowWidth}}>
            <View style={{backgroundColor:"white", height:90, alignItems:"center"}}>
                <View style={{flexDirection:"row", marginHorizontal: 60,alignItems: "center",justifyContent: "space-between",alignSelf: "stretch",flex:1}}>
                    <Text>HQ {this.state.curTime}</Text>
                    {
                       this.state.isPlaying ? <TButtonImg  onPress={this.pauseMusic} img={SoundMusic.pause}/>:<TButtonImg  onPress={this.play} img={SoundMusic.play}/>
                    }
                    <TButtonImg  onPress={this.onClickShare}  img={SoundMusic.sharebtn}/>
                </View>
            </View>
        </View>

        return (
            <View style={G_Style.appCenterView}>
                <Image source={ImgMusic.playBg_1} style={{width:G_Theme.windowWidth, height:G_Theme.windowHeight,
                    position:"absolute"
                }}/>
                {this.state.startPlay ? null:<TButtonImg onPress={this.onPlayMusiceClick} img={SoundMusic.playViewbtn}/>}
                {this.state.startPlay ? playControlView:null}
            </View>
        );
    }

    componentDidMount() {

    }


    componentWillUnmount() {
        TLog("componentDidUnMount---playerView")
        if(this.sound)
        {
            clearInterval(this.timeId)
            this.sound.stop(() => {
                this.sound.release()
            });
        }
    }

    onPlayMusiceClick=()=>{
        if(!this.state.startPlay){
            this.setState({startPlay:true},()=>{
                this.playMuisc()
            })

        }else{
            clearInterval(this.timeId)
            this.sound.pause()
        }
    }


    playMuisc=(data)=>{
        // If the audio is a 'require' then the second parameter must be the callback.
       // if (testInfo.isRequire) {
        this.sound = new Sound(SoundMusic.music, error => this.callback(error));
       // } else {
        //    const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
       // }
    }

    callback=(error, sound) => {
        TLog("error------------",error)
        if (error) {
            G_AlertUtil.show('error', error.message)
        } else {
            this.play()
        }
    }

    pauseMusic=()=>{
        this.setState({isPlaying:false,startPlay:false},()=> {
            clearInterval(this.timeId)
            this.sound.pause()
        })
    }

    stopMusic=()=>{
        this.setState({isPlaying:false},()=> {
            clearInterval(this.timeId)
            this.sound.stop(() => {
                this.sound.release();
                // Note: If you want to play a sound after stopping and rewinding it,
                // it is important to call play() in a callback.
                // this.sound.play();
            });
        })
    }

    play=()=>{
        if(!this.state.isPlaying) {
            this.setState({isPlaying:true},()=>{
                this.sound.play((success) => {
                    if (success) {
                        TLog('successfully finished playing');
                    } else {
                        TLog('playback failed due to audio decoding errors');
                    }
                });
                clearInterval(this.timeId);
                this.timeId=setInterval(this.onUpdatePlayTime,1000);
            })
        }
    }

    onUpdatePlayTime=()=>{
        if(this.sound)
        {
            this.sound.getCurrentTime((seconds) =>{
                seconds= parseInt(seconds);
                this.setState({curTime:G_DateUtil.formatSecondDate(seconds*1000)})
            });
        }
    }

    onShareShow=(state)=>{
        this.setState({shareShow:state})
    }

    onClickShare=()=>{
        let shareOptions = {
            title: "React Native",
            message: "Hola mundo",
            url: "http://facebook.github.io/react-native/",
            subject: "Share Link" //  for email
        };
        Share.open(shareOptions).then(reuslt=>{
            TLog("reuslt---",reuslt)
        }).catch(error=>{
            TLog("error---",error)
        })
    }
}


const styles = StyleSheet.create({
    btnMenuSp: {
        alignItems: "center",
        marginRight: 40,
        marginLeft: 15
    },
    textMunu: {
        marginTop: 10
    }

});
