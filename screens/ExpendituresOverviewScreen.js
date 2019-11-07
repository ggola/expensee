import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, Text, FlatList, ActivityIndicator, Alert, StyleSheet, Platform, TextInput, Animated } from 'react-native';

// Header Buttons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import HeaderButton from '../components/HeaderButton';
import ExpenditureItem from '../components/ExpenditureItem';
import LoadExpendituresSection from '../components/LoadExpendituresSection';

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Dispatch actions
import * as expenditureActions from '../store/actions/expenditures';

import Colors from '../constants/Colors';
import Parameters from '../constants/Parameters';

// Animation for opening/closing the search box
const animationValue = {
    yValue: new Animated.Value(-60)
};

const ExpendituresOverviewScreen = props => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [initialCount, setInitialCount] = useState(1);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
    const [searchBoxDisappear, setSearchBoxDisappear] = useState(true);
    const [searchValue, setSearchValue] = useState();
    const [isFilteredResults, setIsFilteredResults] = useState(false);

    const slideInAnimation = useCallback(() => {
        Animated.timing(animationValue.yValue, {
            toValue: 0,
            duration: 500
        }).start()
    }, [animationValue]);

    const slideOutAnimation = useCallback(() => {
        Animated.timing(animationValue.yValue, {
            toValue: -60,
            duration: 350
        }).start(() => {
            setSearchBoxDisappear(true);
            if (isFilteredResults) {
                loadData(Parameters.limit, initialCount - 1, null)
                    .then(() => {
                        setIsFilteredResults(false);
                        setSearchValue();
                    });
            } else {
                setIsFilteredResults(false);
                setSearchValue();
            }
        })
    }, [animationValue, isFilteredResults]);

    // Retrieve totalExpenditures and expenditures from redux store
    const totalExpenditures = useSelector((state) => state.expenditures.totalExpenditures);
    
    const expenditures = useSelector((state) => state.expenditures.expenditures.sort((a, b) => {
            if (a.index > b.index) {
                return 1;
            }
            return -1;
        })
    );

    //********* DATA LOADING
    // Load data from server/db
    const loadData = useCallback(async (limit, offset, searchQuery) => {
        setError(null);
        setIsLoading(true);  
        try {
            await dispatch(expenditureActions.getExpenditures(limit, offset, searchQuery));
            setIsLoading(false);
        } catch (err) {
            // Error rethrown from the dispatch action
            setError(err.message);
            setIsLoading(false);
        }
    }, [dispatch, setIsLoading, setError]);

    // Retrieve expense after view is loaded
    useEffect(() => {
        loadData(Parameters.limit, initialCount - 1, null);
    }, [dispatch, loadData]);

    // Handles loading of new expenses when pressing the prev 25/next 25 buttons
    const loadNewExpensesHandler = (selectedButton) => {
        let offset;
        if (selectedButton === 'Prev') {
            offset = initialCount - Parameters.limit - 1;
            setInitialCount(prevCount => prevCount - Parameters.limit);
        } else {
            offset = initialCount + Parameters.limit - 1;
            setInitialCount(prevCount => prevCount + Parameters.limit);
        }
        loadData(Parameters.limit, offset, null);
    };

    // Shows error alert for networking problems
    useEffect(() => {
        if (!isLoading && error) {
            Alert.alert('There was a problem fetching the expenses', error, [{
                text: 'Try again',
                style: 'default',
                onPress: () => loadData(Parameters.limit, initialCount - 1, null)
            }]);
        }
    }, [isLoading, error]);

    //********** EXPENSE SELECTION
    // Handles expenditure selection
    const expenditureSelectedHandler = (expenditureId, expenditureIndex) => {
        props.navigation.navigate({
            routeName: 'ExpenditureDetails',
            params: {
                expenditureId: expenditureId,
                expenditureIndex: expenditureIndex
            }
        })
    }

    // ********** EXPENSE FILTERING
    // Pass searchBoxHandler pointer to header button to open textInput
    useEffect(() => {
        props.navigation.setParams({
            searchBoxHandler: searchBoxHandler
        })
    }, [searchBoxHandler]);

    // Handles opening/closing of search box
    const searchBoxHandler = () => {
        setIsSearchBoxOpen(prevState => !prevState);
    };

    // Handles search input
    const searchInputHandler = (inputText) => {
        setSearchValue(inputText);
    };

    // Handles expenditures filtering
    const searchExpendituresHandler = () => {
        setIsFilteredResults(true);
        loadData(totalExpenditures, 0, searchValue);
    };

    // Search box has been closed -> slide out animation
    useEffect(() => {
        if (!isSearchBoxOpen) {
            slideOutAnimation();
        } else {
            setSearchBoxDisappear(false);
            slideInAnimation();
        }
    }, [isSearchBoxOpen, setSearchBoxDisappear]);

    //********* JSX
    if (!isLoading && totalExpenditures === 0) {
        return (
            <View style={styles.screenCentered}>
                <Text style={styles.text}>There are no expenses to show</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.screen}>
            <View style={styles.searchBoxContainer}>
                {!searchBoxDisappear &&
                <Animated.View
                    style={{ marginTop: animationValue.yValue }}>
                    <TextInput
                        autoFocus={true}  
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Try: EUR or 2000 GBP or Hoover'
                        placeholderTextColor='rgba(37,42,52,0.7)'
                        keyboardType='default'
                        returnKeyType='search'
                        onSubmitEditing={searchExpendituresHandler}
                        style={styles.searchInput}
                        onChangeText={searchInputHandler}
                        value={searchValue}/> 
                </Animated.View>  
                }               
            </View>
            {isLoading ? 
            <View style={styles.screenCentered}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
            :
            (expenditures.length > 0 ?
                <FlatList 
                    keyExtractor={(item) => item.id}
                    data={expenditures}
                    renderItem={(itemData) => 
                        <ExpenditureItem
                            onPress={expenditureSelectedHandler.bind(this, itemData.item.id, itemData.item.index)}
                            count={itemData.item.index.toString()}
                            amount={itemData.item.amount}
                            currency={itemData.item.currency}
                            name={itemData.item.name}
                            email={itemData.item.email}
                            date={itemData.item.date}
                            retail={itemData.item.retail}
                            comment={itemData.item.comment}
                            receipts={itemData.item.receipts}
                        />
                    }
                />
                :
                    <Text style={styles.text}>Ops... nothing came out of your search</Text>
                )
            }
            {totalExpenditures !== 0 ? 
            <LoadExpendituresSection
                prevButtonDisabled={isFilteredResults ? true : initialCount === 1 ? true : false}
                prevButtonOnPress={loadNewExpensesHandler.bind(this, 'Prev')}
                nextButtonDisabled={isFilteredResults ? true : (totalExpenditures - initialCount) + 1 <= Parameters.limit ? true : false}
                nextButtonOnPress={loadNewExpensesHandler.bind(this, 'Next')}
                >
                {isFilteredResults ? 
                'Filtered results'
                :
                initialCount + '-' + ((initialCount + Parameters.limit - 1) > totalExpenditures ? totalExpenditures : initialCount + Parameters.limit - 1) + ' of ' + totalExpenditures
                }
            </LoadExpendituresSection>
            :
            null
            }
        </View>
    );
};

ExpendituresOverviewScreen.navigationOptions = (navigationData) => {
    const searchBoxHandler = navigationData.navigation.getParam('searchBoxHandler');
    return {
        headerTitle: 'Expenses',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Cart' 
                    iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                    onPress={searchBoxHandler}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screenCentered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchBoxContainer: {
        width: '90%'
    },
    text: {
        fontFamily: 'roboto-bold',
        fontSize: 17,
        color: Colors.text,
        margin: 30
    },
    searchInput: {
        textAlign: 'left',
        color: Colors.text,
        fontFamily: 'roboto-regular',
        fontSize: 17,
        height: 40,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        marginVertical: 10
    },
    slideView: {
        backgroundColor: '#aaa'
    },
    invalidSearchText: {
        fontFamily: 'roboto-medium',
        fontSize: 14
    }
});

export default ExpendituresOverviewScreen;