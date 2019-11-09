# expensee
Pleo mobile challenge

<h3><b>Product</b></h3>
<ul>
  <li>Name: Expensee</li>
  <li>Focus: iOS (React Native + Native module)</li>
</ul>

<h3><b>Set up</b></h3>
<ul>
  <li>Run mobile-challenge/api server locally</li>
  <li>Go to expensee and run npm install</li>
  <li>Navigate to expensee/ios and run pod install</li>
</ul>
<b>IMPORTANT:</b> In expensee/ENV.js set the base url to read from/post to server
<ul>
  <li>To run on ios simulator:</li>
  <ul>
    <li>set baseUrl: 'http://localhost:3000'</li>
  </ul>
  <li>To run on iphone:</li>
  <ul>
    <li>make sure your iphone is on the same wifi network as the machine where the server is running</li>
    <li>set baseUrl: 'http://YOUR_WIFI_NETWORK_IP_ADDRESS:3000'</li>
    <li>Launch the iOS simulator or open the project in Xcode and launch it on a real device from there</li>
  </ul>
</ul>

<b>IMPORTANT:</b></br>
<b>If the app does not build correctly on the javascript IDE you are using, build it directly from Xcode by opening the expensee.xcworkspace from the ios folder</b>

<h3><b>Implementation</b></h3>
<ul>
  <li>Javascript and Swift</li>
  <li>Non-Expo</li>
  <li>State management: REDUX</li>
  <li>Native module (Swift): Image picker (get called in JS realm, operates in Native Realm, returns data to JS realm)</li>
  <li>External libraries</li>
  <ul>
    <li>REDUX: redux, react-redux, redux-thunk</li>
    <li>EXPO: @expo/vector-icons expo-font</li>
    <li>REACT NAVIGATION: react-navigation react-navigation-stack react-navigation-header-buttons react-native-gesture-handler react-native-reanimated react-native-screens</li>
  </ul>
</ul>

<h3><b>Functionalities</b></h3>
<h4>Landing page</h4>
<ul>
  <li>User can list expenses</li>
  <li>Expenses are listed in with a limit of 25 per page showing for each expense: 
  <ul>
    <li>Index</li>
    <li>Amount and currency</li>
    <li>Name (first and last) of the person who did the expense</li>
    <li>Email of the person who did the expense</li>
    <li>Date of the expense (MM/dd/YYYY, hh:mm 24hours)</li>
    <li>Merchant name</li>
    <li>If a comment has been added (bubble icon on top-right corner has full opacity)</li>
    <li>If and how many receipts have been added (folder icon on top-right corner has full opacity and the number next to it has value > 0)</li>
  </ul>
  <li>Upload next 25 or previous 25 by pressing the buttons at the bottom</li>
  <li>User can tap on expense to navigate to the expense detail page</li>
  <li>User can filter on expenses (NOTE: the search/filtering is done on all expenses (not just the 25 appearing on the page)</li>
  <li>Tap on search icon on top right corner in navigation bar</li>
  <li>Search for: 
  <ul>
    <li>Currencies EUR, GBP, DKK: e.g. EUR -> all the expenses in EUR</li>
    <li>Minimum amount and currency: e.g. 2000 EUR -> filters all the expenses >= 2000 EUR</li>
    <li>Name or email of the person who did the expense (part of the name also works): e.g. Vick -> returns Vickie Lee</li>
    <li>Last names starting with a letter: e.g. R -> retunrs all Last Names starting with R</li>  
  </ul>
  <li>Re-tap the icon to close the search box and reload the expenses if any search has been done</li>
</ul>

<h4>Expense detail page</h4>
<ul>
  <li>User sees expense details</li>
  <li>User can add/edit a comment on an expense</li>
  <li>Comment is displayed next to the bubble icon</li>
  <li>User can add a receipt image on an expense</li>
  <li>Select picture from photo library or take new picture</li>
  <li>See added receipt in a horizontal gallery below</li>
  <li>Tap on receipt image to navigate to receipt detail page</li>
</ul>

<h4>Receipt detail page</h4>
<ul>
  <li>User sees receipt picture full screen</li>
</ul>

<h3><b>Extras</b></h3>
<ul>
  <li>Localization: it, en, da</li>
</ul>
