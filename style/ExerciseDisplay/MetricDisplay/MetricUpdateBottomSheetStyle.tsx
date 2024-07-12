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
    }
});