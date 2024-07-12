import { Colors } from '@/style/Colors'
import { Font } from '@/style/Font'
import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    body:{
        backgroundColor: Colors.dim_gray,
        margin: 7,
        width: 40,
        height: 40,
        borderRadius : 5,
        justifyContent: 'center',
    },
    label:{
        textAlign: 'center',
        fontFamily: Font.global,
        fontSize:  14,
        fontWeight: 'bold'
    }
})