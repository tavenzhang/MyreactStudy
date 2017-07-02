
import React, {PropTypes} from 'react';
import {
    View,
    Text,
} from 'react-native';


 export  default  class NumberCircle extends React.Component {
    static propTypes={
         style:PropTypes.object
     }

    render() {
         let {style}=this.props
        const {data,radius,color, dim} = this.props;
        return (
          <View style={[{borderRadius:radius, marginTop: 1,width:radius*2,height:radius*2,backgroundColor:color,marginLeft:dim, justifyContent:"center",alignItems:"center"},style]}>
              <Text style={{color:"#fff", fontWeight:"bold"}}>{data}</Text>
          </View>
        )
    }
 };


