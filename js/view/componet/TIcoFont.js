import React, {PropTypes}from 'react';
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class TIcoFont extends React.PureComponent {
    static  propTypes = {
        name: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps={
        name:"",
        style:{color:"white", fontSize:14}
    }
    render() {
        let {name, style} = this.props

        return (<AIcon name={name} style={style} />)
    }
}

