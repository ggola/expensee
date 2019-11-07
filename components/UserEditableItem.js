import React from 'react';
import { ActivityIndicator, Button, View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

import InfoItem from './InfoItem';

const UserEditableItem = props => {
    return (
        <View style={{...styles.externalContainer, ...props.styleExternalContainer}}>
            <View style={styles.topContainer}>
                <InfoItem 
                    styleDetailContainer={styles.detailContainer}
                    styleIconContainer={styles.iconContainer}
                    styleText={props.infoItemStyleText}
                    iconSize={30}
                    iconName={props.infoItemIconName}
                    text={props.infoItemText}
                    iconColor={Colors.accent}
                />      
                <View style={styles.buttonContainer}>
                    {props.isLoading ? 
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator size='small' color={Colors.primary}/>
                    </View> 
                    :
                    <Button
                        style={styles.button} 
                        title={props.buttonTitle}
                        color={Colors.primary}
                        onPress={props.onPressButton}/>
                    }
                </View>
            </View>
            <View style={{...styles.bottomContainer, ...props.styleBottomContainer}}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    externalContainer: {
        justifyContent: 'space-between'
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    detailContainer: {
        marginVertical: 10,
        width: 200
    },
    iconContainer: {
        height: 30,
        width: 30
    },
    buttonContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    button: {
        fontFamily: 'roboto-medium'
    },
    activityIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    }
});

export default UserEditableItem;