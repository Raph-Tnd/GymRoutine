import { StyleSheet } from 'react-native'
import { Colors } from '../Colors'


export default StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    exerciseListContainer:{
        alignSelf: 'center',
        width: "95%",
        maxWidth: 820,
        backgroundColor: Colors.dim_gray,
        borderRadius : 10,
    },
    exerciseList:{
        width: "100%",
        flexGrow: 0,
    }
})