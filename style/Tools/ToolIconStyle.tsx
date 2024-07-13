import { Colors } from "../Colors";
import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    icon: {
        width: 50,
        height : 50, 
        backgroundColor: Colors.dim_gray, 
        borderRadius : 50, 
        borderWidth: 2,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 5,
    }

});