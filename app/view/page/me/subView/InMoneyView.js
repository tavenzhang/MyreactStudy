
import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TextInput
} from 'react-native';

import {connect} from 'react-redux';

import Button from 'react-native-button'
import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../../../componet/BaseView";
const mapStateToProps = state => {
    return {

    }
}

@connect(mapStateToProps)
export default class InMoneyView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            nameText: "",
            pwdText:""
        };
    }


    renderBody() {
        const {title} = this.props;
        return (
            <View style={G_Style.appView}>
                <View style={{flex:2,marginLeft:40,marginRight: 40,justifyContent: "center"}}>
                    <View style={styles.inputContain}>
                        <AIcon name="user-o" style={styles.iconUser}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(nameText) => this.setState({nameText})}
                            value={this.state.oldPwd}
                            placeholder={"输入账号"}
                            autoFocus={true}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwdText) => this.setState({pwdText})}
                            value={this.state.newPwd}
                            maxLength={8}
                            placeholder={"密码6-8个字符"}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwdText) => this.setState({pwdText})}
                            value={this.state.newPwd}
                            maxLength={8}
                            placeholder={"重复密码"}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwdText) => this.setState({pwdText})}
                            value={this.state.newPwd}
                            maxLength={8}
                            placeholder={"重复密码"}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwdText) => this.setState({pwdText})}
                            value={this.state.newPwd}
                            maxLength={8}
                            placeholder={"重复密码"}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwdText) => this.setState({pwdText})}
                            value={this.state.newPwd}
                            maxLength={8}
                            placeholder={"重复密码"}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        containerStyle={{padding:5,margin: 10,  overflow:'hidden', borderRadius:3, backgroundColor: '#d7213c'}}
                        style={{ fontSize: 14,color:"white"}}
                        styleDisabled={{color: '#fff'}}
                        onPress={this.clickReg}>
                        注册
                    </Button>
                </View>
            </View>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}


const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14
    },
    iconUser: {
        color: G_Theme.gray,
        fontSize: 18,
    },
    icoPwd: {
        color: G_Theme.gray,
        fontSize: 20,
    },
    inputContain: {
        paddingBottom: 5,
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 5,
        flexDirection: "row",
        height: 30,
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: 'gray',
        borderBottomWidth: 0.2
    }


});
