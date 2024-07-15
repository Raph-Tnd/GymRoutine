import { Colors } from "../Colors";
import { StyleSheet } from 'react-native'
import { Font } from "../Font";


export default StyleSheet.create({
    icon: {
        width: 50,
        height : 50, 
        backgroundColor: Colors.dim_gray, 
        borderRadius : 50, 
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 5,
        elevation : 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "80%",
        height: "80%",
    },
    iconActive : {
        width : 50,
        height : 50,
        backgroundColor : Colors.french_gray,
        borderRadius: 50,
        borderWidth: 3,
        borderColor : Colors.dim_gray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timer : {
        width : "100%",
        height : "100%",
        fontFamily : Font.global,
        fontSize : 14,
        fontWeight : "bold",
        textAlign : 'center',
        alignContent : "center"
    }
});