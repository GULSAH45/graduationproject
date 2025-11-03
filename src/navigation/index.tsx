import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";

import HomeSVG from "@svgs/tabsvgs/HomeSVG";
import MagnifySVG from "@svgs/tabsvgs/MagnifySVG";
import WholeProSvg from "@svgs/WholeProSvg";
import MenuSvg from "@svgs/tabsvgs/MenuSvg";

import Adressess from "@/navigation/screens/Menu/Adressess";
import OrderScreen from "@/navigation/screens/Menu/OrderScreen";
import DeliveredOrder from "./screens/Menu/DeliveredOrder";
import BasketScreen from "@/navigation/screens/Basket/Basket";
import MainpageMainScreen from "@/navigation/screens/TabBar/Home";
import SearchScreen from "@/navigation/screens/TabBar/Search";
import WholeProduct from "@/navigation/screens/TabBar/WholeProduct";
import MenuListScreen from "@/navigation/screens/TabBar/MenuList";
import LogScreen from "@/navigation/screens/Auth/LogScreen";
import SignUpScreen from "@/navigation/screens/Auth/SignUpScreen";
import ContactScreen from "@/navigation/screens/Menu/ContactScreen";
import FreqAskScreen from "@/navigation/screens/Menu/FreqAskScreen";

import AccountInfoScreen from "@screens/Menu/AccountInfoScreen";
import AboutScreen from "@/navigation/screens/Menu/AboutScreen";

import CategoryPage from "@/navigation/screens/Categories/CategoryPage";
import ProductDetailPage from "@screens/ProductDetailPage";
import ForgotPassword from "@/navigation/screens/Auth/Forgotpassword";
  
const HomeTabs = createBottomTabNavigator({
  screens: {
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

  },
});

const RootStack = createNativeStackNavigator({
  initialRouteName: "HomeTabs", // HomeTabs as the initial screen
  screenOptions: { headerShown: false },

  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    CategoryPage: {
      screen: CategoryPage,
      options: {
        title: "Kategori",
        headerShown: false,
      },
    } as const,

    ProductDetailPage: {
      screen: ProductDetailPage,
      options:{
        title: "ProductDetailPage",
        headerShown: false,
      }
    } as const,

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
