import { StyleSheet } from 'react-native'
import { Colors } from '../../../Colors'
import { Font } from '../../../Font'


export default StyleSheet.create({
    body: {
        marginTop: 5,
        marginLeft: 10,
        paddingHorizontal: 10,
        flexDirection : 'row',
        backgroundColor: Colors.azure,
        height: "100%",
        maxHeight : 30,
        borderRadius : 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize : 14,
        fontFamily: Font.global,
        paddingRight : 10,
        borderRightWidth : 1,
    },
    value: {
        paddingLeft : 10,
        fontSize : 14,
        fontFamily: Font.global,
    }
})