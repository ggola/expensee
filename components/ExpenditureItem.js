import React from 'react';
import { View, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Platform } from 'react-native';

import InfoItem from './InfoItem';
import CountItem from './CountItem';
import AmountItem from './AmountItem';
import Colors from '../constants/Colors';

let Touchable = TouchableOpacity;
if (Platform.OS === 'android' && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback
};

const ExpenditureItem = props => {
    return (
        <View style={styles.touchable}>
            <Touchable
                activeOpacity={0.7}
                useForeground
                onPress={props.onPress}>
                <View style={styles.expenditureContainer}>
                    <View style={styles.topRow}>
                        <View style={styles.indexAndHeaderContainer}>
                            <CountItem 
                                styleCountContainer={styles.countContainer}
                                styleCountText={styles.countText}
                                count={props.count}
                            />
                            <AmountItem 
                                styleContainer={styles.amountContainer}
                                styleText={styles.headerText}
                                amount={props.amount}
                                currency={props.currency}
                            />
                        </View>
                        <View style={styles.addOnsContainer}>
                            <InfoItem 
                                styleDetailContainer={styles.detailContainerAddOns}
                                styleIconContainer={styles.iconContainer}
                                styleText={props.comment !== '' ?styles.detailTextAddOns : styles.detailTextAddOnsEmpty}
                                iconSize={19}
                                iconName={Platform.OS === 'android' ? 'md-chatbubbles' : 'ios-chatbubbles'}
                                text={null}
                                iconColor={props.comment !== '' ? Colors.accent : 'rgba(8,217,214,0.3)'}
                            />
                            <InfoItem 
                                styleDetailContainer={styles.detailContainerAddOns}
                                styleIconContainer={styles.iconContainer}
                                styleText={props.receipts.length > 0 ?styles.detailTextAddOns : styles.detailTextAddOnsEmpty}
                                iconSize={19}
                                iconName={ Platform.OS === 'android' ? 'md-folder-open' : 'ios-folder-open'}
                                text={props.receipts.length}
                                iconColor={props.receipts.length > 0 ? Colors.accent : 'rgba(8,217,214,0.3)'}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <InfoItem 
                            styleDetailContainer={styles.detailContainerLeft}
                            styleIconContainer={styles.iconContainer}
                            styleText={styles.detailText}
                            iconSize={23}
                            iconName={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'}
                            text={props.name}
                            iconColor={Colors.accent}
                        />
                        <InfoItem 
                            styleDetailContainer={styles.detailContainerRight}
                            styleIconContainer={styles.iconContainer}
                            styleText={styles.detailText}
                            iconSize={23}
                            iconName={Platform.OS === 'android' ? 'md-at' : 'ios-at'}
                            text={props.email}
                            iconColor={Colors.accent}
                        />
                    </View>
                    <View style={styles.row}>
                        <InfoItem 
                            styleDetailContainer={styles.detailContainerLeft}
                            styleIconContainer={styles.iconContainer}
                            styleText={styles.detailText}
                            iconSize={23}
                            iconName={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
                            text={props.date}
                            iconColor={Colors.accent}
                        />
                        <InfoItem 
                            styleDetailContainer={styles.detailContainerRight}
                            styleIconContainer={styles.iconContainer}
                            styleText={styles.detailText}
                            iconSize={23}
                            iconName={Platform.OS === 'android' ? 'md-pin' : 'ios-pin'}
                            text={props.retail}
                            iconColor={Colors.accent}
                        />
                    </View>    
                </View>             
            </Touchable>
        </View>
    );
};

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    expenditureContainer: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 5, 
        borderRadius: 10,
        backgroundColor: Colors.background,
        height: 130,
        margin: 10,
        paddingHorizontal: 10
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '46%',
        paddingHorizontal: 1
    },
    indexAndHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    countContainer: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    countText: {
        fontSize: 15
    },
    amountContainer: {
        height: 40,
        marginLeft: 20
    },
    headerText: {
        fontSize: 30,
        marginRight: 5
    },
    addOnsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 50
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '27%',
        paddingHorizontal: 5
    },
    detailContainerLeft: {
        width: '38%',
        height: '100%',
        marginRight: 20
    },
    detailContainerAddOns: {
        height: '100%'
    },
    detailContainerRight: {
        width: '48%',
        height: '100%',
        marginRight: 20
    },
    iconContainer: {
        height: 23,
        width: 23
    },
    detailText: {
        marginLeft: 5,
        fontFamily: 'roboto-regular',
        fontSize: 13
    },
    detailTextAddOns: {
        marginLeft: 0,
        fontFamily: 'roboto-regular',
        fontSize: 12
    },
    detailTextAddOnsEmpty: {
        marginLeft: 0,
        fontFamily: 'roboto-regular',
        fontSize: 12,
        color: 'rgba(37,42,52,0.3)'
    }
});

export default ExpenditureItem;