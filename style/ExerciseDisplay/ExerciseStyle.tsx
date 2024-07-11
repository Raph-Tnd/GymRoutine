import { StyleSheet } from 'react-native'
import { Colors } from '../Colors'
import { Font } from '../Font'

export default StyleSheet.create({
    element: {
        flexDirection: 'row',
        backgroundColor: Colors.french_gray,
        width: "95%",
        marginTop: 10,
        maxWidth: 800,
        height: 50,
        borderRadius: 5,
        paddingLeft: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowOffset: {height: 1, width: 1},
        shadowRadius: 5,
    },
    delimiter: {
        borderLeftWidth : 0.5,
        height : "60%"
    },
    exerciseName:{
        fontFamily: Font.global,
        fontWeight: "bold"
    },

})