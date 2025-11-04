import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { BasketProvider } from "./contexts/BasketContext";
import "./global.css"
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Ionicons } from '@expo/vector-icons';

const toastConfig = {
  successCustom: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        marginHorizontal: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "#222" }}
      text2Style={{ fontSize: 13, color: "#555" }}
      renderLeadingIcon={() => (
        <Ionicons name="checkmark-circle" size={24} color="green" style={{ marginLeft: 10 }} />
      )}
    />
  ),
  errorCustom: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        borderRadius: 12,
        marginHorizontal: 10,
      }}
      text1Style={{ fontSize: 15, fontWeight: "bold" }}
      renderLeadingIcon={() => (
        <Ionicons name="close-circle" size={24} color="red" style={{ marginLeft: 10 }} />
      )}
    />
  ),
};

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();
export function App() {
  return (
    <BasketProvider>
      <Navigation
        linking={{
          enabled: 'auto',
          prefixes: [
            // Change the scheme to match your app's scheme defined in app.json
            'helloworld://',
          ],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
      <Toast config={toastConfig} />
    </BasketProvider>
  );
}
