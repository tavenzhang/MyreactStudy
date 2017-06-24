/**
 * Created by soga on 16/10/25.
 */
import React, {Component, PropTypes} from 'react';
import Toast from 'react-native-root-toast';

class ToastBox extends Component {

    constructor(props) {
        super(props);
        let {open, msg, style}=props;
        this.state = {
            open: open,
            msg: msg,
            style: style
        }
    }

    static propTypes = {
        open: PropTypes.bool,
        msg: PropTypes.string,
        onClose: PropTypes.func,
        style: PropTypes.string
    };

    render() {
        return (
            <Toast
                visible={true}
                position={Toast.positions.CENTER}
                shadow={true}
                animation={true}
                hideOnPress={true}
                onHidden={() => {
                    this.props.onClose();
                }}
            >{this.props.msg}</Toast>
        )
    }


    componentDidMount() {
        this.time=setTimeout(()=>{
            this.props.onClose();
        },2000)
    }
}
export default ToastBox;