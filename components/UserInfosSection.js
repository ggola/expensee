import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

import InfoItem from './InfoItem';
import Colors from '../constants/Colors';

const UserInfosSection = props => {
    return(
        <View style={styles.infoContainer}>
            <InfoItem 
                styleDetailContainer={styles.detailContainer}
                styleIconContainer={styles.iconContainer}
                styleText={styles.detailText}
                iconSize={30}
                iconName={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
                text={props.name}
                iconColor={Colors.accent}
            />
            <InfoItem 
                styleDetailContainer={styles.detailContainer}
                styleIconContainer={styles.iconContainer}
                styleText={styles.detailText}
                iconSize={30}
                iconName={Platform.OS === 'android' ? 'md-at' : 'ios-at'}
                text={props.email}
                iconColor={Colors.accent}
            />
            <InfoItem 
                styleDetailContainer={styles.detailContainer}
                styleIconContainer={styles.iconContainer}
                styleText={styles.detailText}
                iconSize={30}
                iconName={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
                text={props.date}
                iconColor={Colors.accent}
            />
            <InfoItem 
                styleDetailContainer={styles.detailContainer}
                styleIconContainer={styles.iconContainer}
                styleText={styles.detailText}
                iconSize={30}
                iconName={Platform.OS === 'android' ? 'md-pin' : 'ios-pin'}
                text={props.retail}
                iconColor={Colors.accent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    infoContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 200,
        width: '90%'
    },
    detailContainer: {
        marginVertical: 10
    },
    iconContainer: {
        height: 30,
        width: 30
    },
    detailText: {
        marginLeft: 10,
        fontFamily: 'roboto-regular',
        fontSize: 17
    }
});

export default UserInfosSection;