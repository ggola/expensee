import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import { strings } from '../locales/i18n';

const ReceiptImageScreen = props => {

    const imageUri = props.navigation.getParam('imageUri');

    return (
        <View style={styles.screen}>
            <Image 
                style={styles.image}
                source={{ uri: imageUri }}
            />
        </View>
    );
};

ReceiptImageScreen.navigationOptions = {
    headerTitle: strings('expense_picture.title')
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default ReceiptImageScreen;