import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    sheet: {
        backgroundColor: 'red',
        padding: 16,
        height: 300,
        width: Dimensions.get("window").width,
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    backdropTouch: {
        flex: 1,
    }
  });