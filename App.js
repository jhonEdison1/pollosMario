import React, { useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { WebView } from "react-native-webview";
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen'

const App: () => ReactNode = () => {

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.init('226742ec-cad2-4b2e-bc7e-6fec2d676cbe', {
      kOSSettingsKeyAutoPrompt: true,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    SplashScreen.hide()
    // StatusBar.setBarStyle('dark-content');
    // StatusBar.setBackgroundColor('blue');

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  const onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };

  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  const onIds = (device) => {
    console.log('Device info: ', device);
  };

  const darkHandler = () => {
    setTimeout(() => StatusBar.setBarStyle("dark-content"), 3000)
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <WebView
        onLoad={() => { darkHandler(); }}
        scrollEnabled={true}
        source={{ uri: "https://pollosmariorestaurantwoodside.com/" }}
        onNavigationStateChange={() => StatusBar.setBarStyle("dark-content")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: 'stretch',
    backgroundColor: 'white',
  }
});

export default App;
