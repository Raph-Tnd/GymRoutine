import { StyleSheet } from 'react-native'
import { Colors } from '../../Colors';
import { Font } from '@/style/Font';

export default StyleSheet.create({
    sheet: {
        backgroundColor: Colors.seasalt,
        padding: 16,
        height: 300,
        width: "100%",
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 2,
        alignItems: 'center',
	},
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    backdropTouch: {
        flex: 1,
    },
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
        marginTop: 20,
        width: "100%",
        flexGrow: 0,
        alignSelf: 'center',
    },
    numberList:{
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    longPressable:{
        backgroundColor: Colors.dim_gray,
        margin: 7,
        paddingHorizontal: 10,
        height: 40,
        borderRadius : 5,
        justifyContent: 'center',
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 3,
        elevation: 3,
    },
    pressable:{
        backgroundColor: Colors.dim_gray,
        margin: 7,
        width: 40,
        height: 40,
        borderRadius : 5,
        justifyContent: 'center',
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 3,
        elevation: 3,

    },
    pressableLabel:{
        textAlign: 'center',
        fontFamily: Font.global,
        fontSize:  14,
        fontWeight: 'bold'
    }
});