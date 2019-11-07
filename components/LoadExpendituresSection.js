import React from 'react';
import { View, Button, Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const LoadExpendituresSection = props => {

    return (
        <View style={styles.bottomContainer}>
            <Text style={styles.bottomContainerText}>
            {props.children}
            </Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <Button 
                        style={styles.button}
                        title='Prev 25'
                        disabled={props.prevButtonDisabled}
                        color={Colors.primary}
                        onPress={props.prevButtonOnPress}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        style={styles.button}
                        title='Next 25'
                        disabled={props.nextButtonDisabled}
                        color={Colors.primary}
                        onPress={props.nextButtonOnPress}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomContainer: {
        width: '92%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor: Colors.background
    },
    bottomContainerText: {
        fontSize: 17,
        fontFamily: 'roboto-regular'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonContainer: {
        marginHorizontal: 5,
        overflow: 'hidden'
    },
    button: {
        fontFamily: 'roboto-medium',
        fontSize: 18
    }
});

export default LoadExpendituresSection;