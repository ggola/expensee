import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Constants
import Colors from '../constants/Colors';

// Screens
import ExpendituresOverviewScreen from '../screens/ExpendituresOverviewScreen';
import ExpenditureDetailsScreen from '../screens/ExpenditureDetailsScreen';
import ReceiptPictureScreen from '../screens/ReceiptPictureScreen';

// Default Navigation Options
const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? Colors.text : Colors.primary
};

// Main Stack Navigator
const MainNavigator = createStackNavigator({
    ExpendituresOverview: ExpendituresOverviewScreen,
    ExpenditureDetails: ExpenditureDetailsScreen,
    ReceiptPicture: ReceiptPictureScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

export default createAppContainer(MainNavigator);