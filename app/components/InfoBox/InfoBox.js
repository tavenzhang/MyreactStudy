/**
 * Created by soga on 16/10/25.
 */
import React, {Component,PropTypes} from 'react';
import Toast from 'react-native-root-toast';

class InfoBox extends Component {

    static propTypes = {
        open : PropTypes.bool,
        msg  : PropTypes.string,
        onClose : PropTypes.func,
        style : PropTypes.string
    };

    static defaultProps = {
        open : false,
        msg  : '',
        style: ''
    };

    render() {
        const {open} = this.props;
        //if(this.props.style=="error") styles.infoBox.backgroundColor = '#e84548';
        //if(this.props.style=="success") styles.infoBox.backgroundColor = '#222';

        return (
            <Toast
                visible={open}
                position={250}
                duration={2}
                shadow={true}
                animation={true}
                hideOnPress={true}
                //onHidden={this.props.onClose}
                onHidden={()=>{console.log(11111)}}
                >{this.props.msg}</Toast>
            )
    }};

export default InfoBox;