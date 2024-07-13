import { Colors } from '@/style/Colors'
import { Font } from '@/style/Font'
import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    name:{
        textAlign: 'center',
        borderBottomWidth : 1,
        borderColor: Colors.dim_gray,
        paddingBottom: 10,
        width: "95%",
        alignSelf: 'center',
        fontFamily: Font.global,
        fontSize:  20,
        fontWeight: 'bold',
    },
    numberListContainer:{
        marginTop: "10%",
        width: "100%",
        flexGrow: 0,
        alignSelf: 'center',
    },
    numberList:{
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap : 'wrap',
    },
    number:{
        textAlign : 'center',
        backgroundColor: Colors.dim_gray,
        margin: 7,
        width: 40,
        height: 40,
        borderRadius : 5,
        justifyContent: 'center',
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 3,
    }
})