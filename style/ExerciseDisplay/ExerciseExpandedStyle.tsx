import { StyleSheet } from 'react-native'
import { Colors } from '../Colors'


export default StyleSheet.create({
    body: {
        height: "100%",
        maxHeight: 40,
        width: "90%",
        maxWidth: 700,
        alignSelf: 'center',
        backgroundColor: Colors.french_gray_80,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    metricListContainer:{
        flexDirection: 'row',
        height : "100%"
    },
    metricList:{

    }
})