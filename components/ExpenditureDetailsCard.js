import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, FlatList, ActivityIndicator, ActionSheetIOS, NativeModules } from 'react-native';

import { strings } from '../locales/i18n';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['requires main queue setup']);

import AmountItem from './AmountItem';
import UserInfosSection from './UserInfosSection';
import UserEditableItem from './UserEditableItem';
import ThumbImageItem from './ThumbImageItem';
import Colors from '../constants/Colors';

import ENV from '../env';

let inputRef = React.createRef();

const ExpenditureDetailsCard = props => {

    const [addComment, setAddComment] = useState(false);
    const [commentValue, setCommentValue] = useState();
    const [isLoadingReceiptImages, setIsLoadingReceiptImages] = useState(false);

    let { receipts, navigation } = props;
    
    // Fetches receipts images from server
    const fetchReceiptsImages = useCallback(async () => {
        for (var i = 0; i < receipts.length; i++) {
            const receiptWithData = {
                url: receipts[i].url,
                data: '',
                isError: false
            };
            receipts[i] = receiptWithData;
            try {
                const response = await fetch(ENV.baseUrl + receipts[i].url);
                if (response.ok) {
                    const blob = await response.blob();
                    if (blob) {
                        receiptWithData.data = await getImage(blob);
                        if (i === receipts.length - 1) {
                            receipts = receipts.reverse();
                            setIsLoadingReceiptImages(false);
                        }
                    } else {
                        receipts[i].error = true;  
                    }
                } else {
                    receipts[i].error = true;   
                }
            } catch {
                receipts[i].error = true;
            }         
        }
    }, [setIsLoadingReceiptImages, receipts]);

    // Gets image from blob
    const getImage = async (blob) => {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (event) => {
                var data = event.target.result;
                resolve(data);
            };
            reader.readAsDataURL(blob);
        });
    };

    // Loads receitps images
    useEffect(() => {
        setIsLoadingReceiptImages(true);
        fetchReceiptsImages();
    }, [receipts, fetchReceiptsImages, setIsLoadingReceiptImages]);

    // Opens alert actionSheet style to choose image source
    const addReceiptHandler = useCallback(() => {
        ActionSheetIOS.showActionSheetWithOptions({
                title: strings('expense_details.image_picker_menu_title'),
                options: [
                    strings('expense_details.cancel_button'),
                    strings('expense_details.image_picker_menu_photo_option'),
                    strings('expense_details.image_picker_menu_library_option')
                ],
                cancelButtonIndex: 0,
                tintColor: Colors.primary
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    // JS Realm calls Swift
                    // Open image picker native in camera mode
                    NativeModules.ImagePickerInstantiator.instantiateImagePicker('camera', imageData => {
                        addReceipt(imageData);
                    });
                } else if (buttonIndex === 2) {
                    // JS Realm calls Swift
                    // Open image picker native in photo library mode
                    NativeModules.ImagePickerInstantiator.instantiateImagePicker('library', imageData => {
                        addReceipt(imageData);
                    });
                }
            },
        );
    }, []);

    // Adds receipt
    const addReceipt = useCallback((imageData) => {
        const sourceData = { uri: 'data:image/jpeg;base64,' + imageData };
        props.addReceipt(sourceData);
    }, []);
    
    // Adds comment
    const addCommentHandler = () => {
        if (!addComment) {
            // Open text input
            inputRef = true;
            setAddComment(true);
        } else {
            // Pressed "done", save comment, close text input
            setAddComment(false);
            if (commentValue != null) {
                // Save comment only if user has actually added or edited it
                props.addComment(commentValue);
            }
            setCommentValue();
        }
    };

    // text input handler for comment
    const commentInputHandler = (inputText) => {
        setCommentValue(inputText);
    };
    
    return (      
        <ScrollView style={styles.scrollView}>
            <KeyboardAvoidingView 
                behavior = 'position'
                keyboardVerticalOffset = {receipts.length > 0 ? -130 : 50}>
                <View style={styles.expenditureContainer}>
                    <AmountItem 
                        styleContainer={styles.headerContainer}
                        styleText={styles.headerText}
                        amount={props.amount}
                        currency={props.currency}
                    />
                    <UserInfosSection 
                        name={props.name}
                        email={props.email}
                        date={props.date}
                        retail={props.retail}                    
                    />
                    <View style={styles.editInfoContainer}>
                        <UserEditableItem
                            styleExternalContainer={styles.detailButtonAndInputContainer}
                            infoItemStyleText={
                                props.comment == "" ? styles.detailTextEmpty : styles.detailText
                            }
                            infoItemIconName={
                                Platform.OS === 'android' ? 'md-chatbubbles' : 'ios-chatbubbles'
                            }
                            infoItemText={
                                props.comment == "" ? strings('expense_details.no_comments_label') : props.comment
                            }
                            isLoading={props.isLoadingComment}
                            buttonTitle={
                                addComment ? strings('expense_details.done_button') : props.comment == "" ? strings('expense_details.add_button') : strings('expense_details.edit_button')
                            }
                            onPressButton={addCommentHandler}
                            styleBottomContainer={styles.detailAndButtonContainer}
                            >
                            {addComment && <TextInput
                                autoFocus={!!inputRef} 
                                blurOnSubmit
                                autoCapitalize='sentences'
                                autoCorrect={true}
                                keyboardType='default'
                                returnKeyType = 'done'
                                onSubmitEditing={addCommentHandler}
                                maxLength={200}
                                style={styles.commentInput}
                                onChangeText={commentInputHandler}
                                value={commentValue}/>}
                        </UserEditableItem>
                        <UserEditableItem
                            styleExternalContainer={styles.detailButtonAndListContainer}
                            infoItemStyleText={styles.detailText}
                            infoItemIconName={
                                Platform.OS === 'android' ? 'md-folder-open' : 'ios-folder-open'
                            }
                            infoItemText={
                                receipts.length === 0 ? strings('expense_details.no_recepits_attached_label') : receipts.length === 1 ? strings('expense_details.one_receipt_attached_label') : receipts.length + strings('expense_details.receipts_attached_label')
                            }
                            isLoading={props.isLoadingReceipt}
                            buttonTitle = {strings('expense_details.add_button')}
                            onPressButton={addReceiptHandler}
                            styleBottomContainer = {
                                receipts.length > 0 ? styles.listContainer : null
                            }
                            >
                            {receipts.length > 0 ? 
                                isLoadingReceiptImages ?
                                    <View style={styles.activityIndicatorContainer}>
                                        <ActivityIndicator size='small' color={Colors.primary}/>
                                    </View>
                                    :
                                    <FlatList
                                        horizontal
                                        keyExtractor={(item) => item.url}
                                        data={receipts}
                                        renderItem={(itemData) =>
                                            <ThumbImageItem 
                                                navigation={navigation}
                                                imageUri = {itemData.item.data}
                                                error={itemData.item.error}/>
                                        }
                                    />
                                :
                                null
                            }
                        </UserEditableItem>
                    </View>      
                </View>
            </KeyboardAvoidingView>
        </ScrollView>             
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
    expenditureContainer: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 5, 
        borderRadius: 10,
        backgroundColor: Colors.background,
        margin: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    headerContainer: {
        justifyContent: 'center',
        padding: 10,
        margin: 30,
        width: '90%',
        backgroundColor: Colors.primary,
        borderRadius: 10
    },
    headerText: {
        color: 'white',
        fontSize: 35,
        marginHorizontal: 5
    },
    detailText: {
        marginLeft: 10,
        fontFamily: 'roboto-regular',
        fontSize: 17
    },
    detailTextEmpty: {
        marginLeft: 10,
        fontFamily: 'roboto-light-italic',
        fontSize: 17,
        color: Colors.text
    },
    editInfoContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '90%',
        marginTop: 30,
        marginBottom: 20
    },
    detailButtonAndInputContainer: {
        justifyContent: 'space-between'
    },
    detailButtonAndListContainer: {
        justifyContent: 'flex-start'
    },
    commentInput: {
        width: '100%',
        textAlign: 'left',
        color: Colors.text,
        fontFamily: 'roboto-regular',
        fontSize: 17,
        height: 30,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        marginVertical: 10
    },
    listContainer: {
        height: 150,
        width: '100%',
        marginVertical: 10
    },
    activityIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});

export default ExpenditureDetailsCard;