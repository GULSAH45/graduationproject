import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

import { Home } from './screens/Home';
import ForgotPassword from './screens/forgotpassword';



const RootStack = createNativeStackNavigator({

  screens: {
    
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    ForgotPassword: {
  
      screen: ForgotPassword,
      options: {
   
        headerShown: false,
        title: 'Feed',
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
