import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";

import LogScreen from "./screens/LogScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPassword from "./screens/Forgotpassword";
import MainpageMainScreen from "./screens/MainpageMainScreen";
import MenuListScreen from "./screens/MenuListScreen";



const HomeTabs = createBottomTabNavigator({
  screens: {

       MainpageMainScreen: {
      screen: MainpageMainScreen,
      options: {
        title: "MainpageMainScreen",
        headerShown: false,
      },
    },

   MenuListScreen: {
      screen: MenuListScreen,
      options: {
        title: "Menu List",
        headerShown: false,
      },
    },

 SignUpScreen: {
  screen: SignUpScreen, 
  options: {
    title: "Üye Ol",
    headerShown: false,
  },
},
    LogScreen: {
      screen: LogScreen,
      options: {
        title: "Giriş",
        headerShown: false,
      },
    },
   ForgotPassword: {
      screen: ForgotPassword,
      options: {
        title: "şifre",
        headerShown: false,
      },
    },

  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
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
