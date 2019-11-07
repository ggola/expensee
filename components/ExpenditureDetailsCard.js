import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, FlatList, ActivityIndicator } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import AmountItem from './AmountItem';
import UserInfosSection from './UserInfosSection';
import UserEditableItem from './UserEditableItem';
import ThumbImageItem from './ThumbImageItem';
import Colors from '../constants/Colors';

import ENV from '../env';

const imagePickerOptions = {
    title: 'Select Receipt Picture',
    allowsEditing: false,
    tintColor: Colors.primary,
    quality: 0.6,
    maxWidth: 400,
    maxHeight: 700,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

var reader = new FileReader();

let inputRef = React.createRef();

const ExpenditureDetailsCard = props => {

    const [addComment, setAddComment] = useState(false);
    const [commentValue, setCommentValue] = useState();
    const [isLoadingReceiptImages, setIsLoadingReceiptImages] = useState(false);

    const { receipts, navigation } = props;
    
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
                        reader.onload = () => {
                            receiptWithData.data = reader.result;
                            if (i === receipts.length) {
                                setIsLoadingReceiptImages(false);
                            }
                        }
                        reader.readAsDataURL(blob);
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
    }, [receipts]);
    
    useEffect(() => {
        setIsLoadingReceiptImages(true);
        fetchReceiptsImages();
    }, [receipts, fetchReceiptsImages, setIsLoadingReceiptImages]);

    
    const addReceiptHandler = useCallback(() => {
        // https://github.com/react-native-community/react-native-image-picker
        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const sourceData = { uri: 'data:image/jpeg;base64,' + response.data };
                props.addReceipt(sourceData);
            }
        });
        // Swift Native Module
    }, [ImagePicker]);
    
    const addCommentHandler = () => {
        if (!addComment) {
            inputRef = true;
            setAddComment(true);
        } else {
            setAddComment(false);
            if (commentValue != null) {
                // Save comment only if user has actually added or edited it
                props.addComment(commentValue);
            }
            setCommentValue();
        }
    };

    const commentInputHandler = (inputText) => {
        setCommentValue(inputText);
    };

    return (      
        <ScrollView style={styles.scrollView}>
            <KeyboardAvoidingView 
                behavior = 'position'
                keyboardVerticalOffset = {receipts.length > 0 ? -130 : 50}
            >
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
                                props.comment == "" ? 'NO COMMENTS' : props.comment
                            }
                            isLoading={props.isLoadingComment}
                            buttonTitle={
                                addComment ? 'Done' : props.comment == "" ? 'Add' : 'Edit'
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
                                receipts.length === 0 ? 'No receipts attached' : receipts.length === 1 ? '1 receipt attached' : receipts.length + ' receipts attached'
                            }
                            isLoading={props.isLoadingReceipt}
                            buttonTitle='Add'
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
                                                imageUri={itemData.item.data}
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
        height: 160,
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