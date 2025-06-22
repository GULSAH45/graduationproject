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
import FreqAskScreen from "./screens/FreqAskScreen";
import ContactScreen from "./screens/ContactScreen";
import AccountInfoScreen from "./screens/AccountInfoScreen";
import Adressess from "./screens/Adressess";
import AboutScreen from "./screens/AboutScreen";

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  initialRouteName: "AboutScreen",
  screens: {
  AboutScreen: {
      screen: AboutScreen,
      options: {
        title: "AboutScreen",
        headerShown: false,
      },
    },



    Adressess: {
      screen: Adressess,
      options: {
        title: "Adressess",
        headerShown: false,
      },
    },

    AccountInfoScreen: {
      screen: AccountInfoScreen,
      options: {
        title: "AccountInfoScreen",
        headerShown: false,
      },
    },

    ContactScreen: {
      screen: ContactScreen,
      options: {
        title: "ContactScreen",
        headerShown: false,
      },
    },

    FreqAskScreen: {
      screen: FreqAskScreen,
      options: {
        title: "FreqAskScreen",
        headerShown: false,
      },
    },

    LogScreen: {
      screen: LogScreen,
      options: {
        title: "LogScreen",
        headerShown: false,
      },
    },
    SignUpScreen: {
      screen: SignUpScreen,
      options: {
        title: "SignUpScreen",
        headerShown: false,
      },
    },

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
        title: "MenuListScreen",
        headerShown: false,
      },
    },
  },
});

/* const HomeTabs = createBottomTabNavigator({
  screens: {
    FreqAskScreen: {
      screen: FreqAskScreen,
      options: {
        title: "FreqAskScreen",
        headerShown: false,
      },
    },

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
}); */

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
