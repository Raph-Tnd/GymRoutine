import { StyleSheet } from 'react-native'
import { Font } from '../Font'
import { Colors } from '../Colors'

export default StyleSheet.create({
    body: {
        marginTop : 10,
        alignSelf : 'center',
        alignItems: 'center',
        width : "95%",
        borderRadius: 15,
        backgroundColor: Colors.raisin_black
    },
    programLabel: {
        width : "97%",
        minHeight: 50,
        backgroundColor: Colors.dim_gray,
        marginTop: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent :'center',
        fontFamily: Font.global,
        fontSize: 16,
        fontWeight : 'bold',
    },
    sessionLabel:{
        width : "97%",
        marginTop: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent :'center',
        fontFamily: Font.global,
        fontSize: 16,
        fontWeight : 'bold',
    },
    session:{
        marginTop : 10,
        alignSelf: 'center',
        width: "95%",
        maxWidth: 820,
        backgroundColor: Colors.dim_gray,
        borderRadius : 10,
    },
    list:{
        width: "100%",
        flexGrow: 0,
    },
    exercise: {
        flexShrink : 1,
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
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 5,
        elevation: 5,
    },
    delimiter: {
        marginHorizontal : 5,
        borderLeftWidth : 0.5,
        height : "60%"
    },
    exerciseMainLabel:{
        width : "100%",
        fontFamily: Font.global,
        fontWeight: "bold",
        fontSize: 14
    },
    exerciseLabel:{
        width : "100%",
        textAlign: 'center',
        fontFamily: Font.global,
        fontSize: 14
    }
})