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
import DeliveredOrder from "./screens/DeliveredOrder";
import BasketScreen from "./screens/BasketScreen";

const HomeTabs = createBottomTabNavigator({
  screens: {
    MenuListScreen: {
      screen: MenuListScreen,
      options: {
        title: "Menü",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MenuSvg width={size} height={size} fill={color} />
        ),
      },
    },
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
    SearchScreen: {
      screen: SearchScreen,
      options: {
        title: "Arama",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MagnifySVG width={size} height={size} fill={color} />
        ),
      },
    },
    MainpageMainScreen: {
      screen: MainpageMainScreen,
      options: {
        title: "Anasayfa",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <HomeSVG width={size} height={size} fill={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  initialRouteName: "HomeTabs",
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    DeliveredOrder: {
      screen: DeliveredOrder,
      options: {
        title: "Teslim Edilen Siparişler",
        headerShown: false,
      },
    },
    FreqAskScreen: {
      screen: FreqAskScreen,
      options: {
        title: "S.S.S.",
        headerShown: false,
      },
    },
    ContactScreen: {
      screen: ContactScreen,
      options: {
        title: "Bize Ulaşın",
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
    SignUpScreen: {
      screen: SignUpScreen,
      options: {
        title: "Üye Ol",
        headerShown: false,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      options: {
        title: "Şifre Sıfırla",
        headerShown: false,
      },
    },
    AccountInfoScreen: {
      screen: AccountInfoScreen,
      options: {
        title: "Hesap Bilgileri",
        headerShown: false,
      },
    },
    Adressess: {
      screen: Adressess,
      options: {
        title: "Adreslerim",
        headerShown: false,
      },
    },
    AboutScreen: {
      screen: AboutScreen,
      options: {
        title: "Hakkımızda",
        headerShown: false,
      },
    },
    OrderScreen: {
      screen: OrderScreen,
      options: {
        title: "Siparişlerim",
        headerShown: false,
      },
    },
    BasketScreen: {
      screen: BasketScreen,
      options: {
        title: "Sepetim",
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
