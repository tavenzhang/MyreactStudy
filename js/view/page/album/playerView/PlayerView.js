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
        super(props);
        this.state = {
            isPlaying: false,
            curTime: "00:00",
        };
    }

    componentWillUpdate() {
        LayoutAnimation.configureNext(G_LayoutAnimationHelp.springStart);
    }

    render() {
        let playControlView = <View style={{position: "absolute", bottom: 0, left: 0, width: G_Theme.windowWidth}}>
            <View style={{backgroundColor: "white", height: 75, alignItems: "center"}}>
                <View style={{
                    flexDirection: "row",
                    marginHorizontal: 60,
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignSelf: "stretch",
                    flex: 1
                }}>
                    <Text style={{width: 75}}>HQ {this.state.curTime}</Text>
                    {
                        this.state.isPlaying ? <TButtonImg onPress={this.stopMusic} img={SoundMusic.pause}/> :
                            <TButtonImg onPress={this.play} img={SoundMusic.play}/>
                    }
                    <TButtonImg onPress={this.onClickShare} img={SoundMusic.sharebtn}/>
                </View>
            </View>
        </View>

        return (
            <View style={G_Style.appCenterView}>
                <Image source={ImgMusic.playBg_1} style={{
                    width: G_Theme.windowWidth, height: G_Theme.windowHeight,
                    position: "absolute"
                }}/>
                {this.state.isPlaying ? playControlView :
                    <TButtonImg onPress={this.onPlayMusiceClick} img={SoundMusic.playViewbtn}/>}
            </View>
        );
    }

    componentDidMount() {
        if (G_MusicNow.Sound) {
            this.setState({isPlaying:true})
            this.timeId = setInterval(this.onUpdatePlayTime, 1000);
        }
    }


    componentWillUnmount() {
            clearInterval(this.timeId)
    }

    onPlayMusiceClick = () => {
        if (!this.state.isPlaying) {
            this.setState({startPlay: true}, () => {
                this.clickPlay()
            })
        } else {
            this.stopMusic()
        }
    }

    clickPlay = (data) => {
        // If the audio is a 'require' then the second parameter must be the callback.
        // if (testInfo.isRequire) {
        if (!G_MusicNow.Sound) {
            if (G_PLATFORM_IOS) {
                G_MusicNow.Sound = new Sound(SoundMusic.music, (error, props) => this.callback(error, props));
            }
            else {
                G_MusicNow.Sound = new Sound("music.mp3", '', (error, props) => this.callback(error, props));
            }
        }else{
            G_MusicNow.Sound.stop(()=>{
                G_MusicNow.Sound.release();
                G_MusicNow.Sound = null;
                if (G_PLATFORM_IOS) {
                    G_MusicNow.Sound = new Sound(SoundMusic.music, (error, props) => this.callback(error, props));
                }
                else {
                    G_MusicNow.Sound = new Sound("music.mp3", '', (error, props) => this.callback(error, props));
                }
            })

        }
    }

    callback = (error, props) => {
        //TLog("error------------==",error)
        if (error) {
            G_AlertUtil.show('error', error.message)
        } else {
            this.playMusic()
        }
    }

    pauseMusic = () => {
        this.setState({isPlaying: false}, () => {
            clearInterval(this.timeId)
            G_MusicNow.Sound.pause();
        })
    }

    stopMusic = () => {
        clearInterval(this.timeId)
        G_MusicNow.Sound.stop(() => {
            G_MusicNow.Sound.release();
            G_MusicNow.Sound = null;
            this.setState({isPlaying: false})
        });
    }

    playMusic = () => {
        this.setState({isPlaying: true}, () => {
            G_MusicNow.Sound.play((success) => {
                if (success) {
                    this.stopMusic();
                } else {
                    TLog('playback failed due to audio decoding errors');
                }
            });
            clearInterval(this.timeId);
            this.timeId = setInterval(this.onUpdatePlayTime, 1000);
        })
    }

    onUpdatePlayTime = () => {
        if (G_MusicNow.Sound) {
            G_MusicNow.Sound.getCurrentTime((seconds) => {
                seconds = parseInt(seconds);
                this.setState({curTime: G_DateUtil.formatSecondDate(seconds * 1000)})
            });
        }
    }



    onClickShare = () => {
        let shareOptions = {
            title: "React Native",
            message: "Hola mundo",
            url: "http://facebook.github.io/react-native/",
            subject: "Share Link" //  for email
        };
        Share.open(shareOptions).then(reuslt => {
            TLog("reuslt---", reuslt)
        }).catch(error => {
            TLog("error---", error)
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
