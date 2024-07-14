import { Colors } from "../Colors";
import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    icon: {
        width: 50,
        height : 50, 
        backgroundColor: Colors.dim_gray, 
        borderRadius : 10, 
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 5,
        elevation : 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "80%",
        height: "80%",
    }

});