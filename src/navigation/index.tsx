import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  createStaticNavigation,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
import CheckoutScreen from "@/navigation/screens/Payment/CheckoutScreen";
import OrderSuccessScreen from "@/navigation/screens/Payment/OrderSuccessScreen";
import LogScreen from "@/navigation/screens/Auth/LogScreen";
import SignUpScreen from "@/navigation/screens/Auth/SignUpScreen";
import ContactScreen from "@/navigation/screens/Menu/ContactScreen";
import FreqAskScreen from "@/navigation/screens/Menu/FreqAskScreen";

import AccountInfoScreen from "@screens/Menu/AccountInfoScreen";
import AboutScreen from "@/navigation/screens/Menu/AboutScreen";

import CategoryPage from "@/navigation/screens/Categories/CategoryPage";
import ProductDetailPage from "@screens/ProductDetailPage";
import { ProductDetailRouteParams, CategoryPageRouteParams } from "@/types/Product";

import SplashScreen from "@/navigation/screens/Auth/SplashScreen";

export type HomeTabParamList = {
  MainpageMainScreen: undefined;
  SearchScreen: undefined;
  WholeProduct: undefined;
  MenuListScreen: undefined;
};

export type RootStackParamList = {
  SplashScreen: undefined;
  HomeTabs: NavigatorScreenParams<HomeTabParamList>;
  CategoryPage: CategoryPageRouteParams;
  ProductDetailPage: ProductDetailRouteParams;
  DeliveredOrder: undefined;
  FreqAskScreen: undefined;
  ContactScreen: undefined;
  LogScreen: undefined;
  SignUpScreen: undefined;
  AccountInfoScreen: undefined;
  Adressess: undefined;
  AboutScreen: undefined;
  OrderScreen: undefined;
  BasketScreen: undefined;
  CheckoutScreen: undefined;
  OrderSuccessScreen: {
    orderData?: {
      orderNumber?: string;
      items?: any[];
      address?: any;
      shipping?: string;
    };
  };
};

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

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: "SplashScreen", // Start with SplashScreen
  screenOptions: { headerShown: false },

  screens: {
    SplashScreen: {
      screen: SplashScreen,
      options: {
        headerShown: false,
      },
    },
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
    },

    ProductDetailPage: {
      screen: ProductDetailPage,
      options: {
        title: "ProductDetailPage",
        headerShown: false,
      }
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
    CheckoutScreen: {
      screen: CheckoutScreen,
      options: {
        title: "Ödeme",
        headerShown: false,
      },
    },
    OrderSuccessScreen: {
      screen: OrderSuccessScreen,
      options: {
        title: "Sipariş Onayı",
        headerShown: false,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}