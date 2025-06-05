import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';


import LogScreen from './screens/LogScreen';

const HomeTabs = createBottomTabNavigator({
  screens: {
      SignUpScreen: {
      screen: () => <Text>Sign Up Screen</Text>, // Placeholder for SignUpScreen
      options: {
        title: 'Üye Ol',
        headerShown: false,
      },
    },
    LogScreen: {
      screen: LogScreen,
      options: {
        title: 'Giriş',
        headerShown: false,
      },
    },
  
    ForgotPassword: {
      screen: () => <Text>Forgot Password Screen</Text>, // Placeholder for ForgotPassword
      options: {
        title: 'Şifremi Unuttum',
        headerShown: false,
      },
    },
  }
});

const RootStack = createNativeStackNavigator({

  screens: {
    
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },

  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
