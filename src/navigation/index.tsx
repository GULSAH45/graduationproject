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
import AboutScreen from "./screens/AboutScreen";
import HomeSVG from "../svgs/tabsvgs/HomeSVG";
import SearchScreen from "./screens/SearchScreen";
import MagnifySVG from "../svgs/tabsvgs/MagnifySVG";
import WholeProduct from "./screens/WholeProduct";
import WholeProSvg from "../svgs/WholeProSvg";

import MenuSvg from "../svgs/tabsvgs/MenuSvg";
import Adressess from "./screens/Adressess";
import OrderScreen from "./screens/OrderScreen";

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  initialRouteName: "OrderScreen",
  screens: {

OrderScreen: {
      screen: OrderScreen,
      options: {
        title: "OrderScreen",
        headerShown: false,
      },
    },

    WholeProduct: {
      screen: WholeProduct,
      options: {
        title: "WholeProduct",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <HomeSVG width={size} height={size} fill={color} />
        ),
      },
    },
    SearchScreen: {
      screen: SearchScreen,
      options: {
        title: "SearchScreen",
        headerShown: false,
      },
    },

    ForgotPassword: {
      screen: ForgotPassword,
      options: {
        title: "ForgotPassword",
        headerShown: false,
      },
    },

    AboutScreen: {
      screen: AboutScreen,
      options: {
        title: "AboutScreen",
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

    Adressess: {
      screen: Adressess,
      options: {
        title: "Adressess",
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

const HomeTabs = createBottomTabNavigator({
  screens: {
    WholeProduct: {
      screen: WholeProduct,
      options: {
        title: "Tüm Ürünler",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <WholeProSvg width={size} height={size} fill={color} />
        ),
      },
    },
    /*  AboutScreen: {
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
    }, */
    MainpageMainScreen: {
      screen: MainpageMainScreen,
      options: {
        title: "MainpageMainScreen",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <HomeSVG width={30} height={size} fill={color} />
        ),
      },
    },
    MenuListScreen: {
      screen: MenuListScreen,
      options: {
        title: "Menu List",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MenuSvg width={size} height={size} fill={color} />
        ),
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
    SearchScreen: {
      screen: SearchScreen,
      options: {
        title: "SearchScreen",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MagnifySVG width={30} height={size} fill={color} />
        ),
      },
    },
  },
});

export const Navigation = createStaticNavigation(HomeTabs);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
