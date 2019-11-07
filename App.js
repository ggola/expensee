/* 
***** Installed Packages *****

***** REDUX *****
redux 
react-redux 
redux-thunk

***** EXPO *****
@expo/vector-icons 
expo-font

***** REACT NAVIGATION *****
react-navigation 
react-navigation-stack 
react-navigation-header-buttons r
eact-native-gesture-handler 
react-native-reanimated 
react-native-screens
*/

import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';

import * as Font from 'expo-font';

// Redux packages
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Redux Store
import expendituresReducer from './store/reducers/expenditures';

// Navigator
import Navigator from './navigation/Navigator';

import { useScreens } from 'react-native-screens';
useScreens();

// Redux combined root reducer
const rootReducer = combineReducers({
  expenditures: expendituresReducer
});

// Redux Store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  // Upload fonts
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    // Load new fonts
    const fetchFonts = async () => {
      return Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-light-italic': require('./assets/fonts/Roboto-LightItalic.ttf'),
      }).then(() => setDataLoaded(true));
    };
    fetchFonts();
  }, [setDataLoaded]);

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'never' }}>
        {dataLoaded && <Navigator />}
      </SafeAreaView>
    </Provider>
  );

}
