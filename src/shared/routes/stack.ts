import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ProductsStore} from '@/shared/DTO';
import Login from '@/modules/auth/login';
import CreateAccount from '@/modules/auth/createAccount';
import EnterNewPassword from '@/modules/auth/enterNewPassword';
import ForgotPassword from '@/modules/auth/forgotPassword';
import DetailPlant from '@/modules/private/detailPlant';
import PlantList from '@/modules/private/plantList';
import Checkout from '@/modules/private/checkout';
import EditProfile from '@/modules/private/profile/sections/editProfile';

import NewAddress from '@/modules/private/profile/sections/newAddress';

export type RootStackParamList = {
  tab: undefined;
  login: undefined;
  createAccount: undefined;
  enterOtp: undefined;
  enterNewPassword: undefined;
  forgotPassword: undefined;
  welcome: undefined;
  detailPlant: {product: ProductsStore};
  plantList: undefined;
  favorites: undefined;
  notifications: undefined;
  reviews: undefined;
  checkout: undefined;
  editProfile: undefined;
  vouchers: undefined;
  tracking: undefined;
  eReceipt: undefined;
  payments: undefined;
  newPayment: undefined;
  addNewAddress: undefined;
  language: undefined;
  conversation: undefined;
  chats: undefined;
};
export type RouteItem = {
  path: keyof RootStackParamList;
  component: any;
  private: boolean;
};
export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type NavigationProps = StackNavigationProp<RootStackParamList>;

const RoutesStack: RouteItem[] = [
  {
    path: 'login',
    component: Login,
    private: false,
  },
  {
    path: 'createAccount',
    component: CreateAccount,
    private: false,
  },
  {
    path: 'enterNewPassword',
    component: EnterNewPassword,
    private: true,
  },
  {
    path: 'forgotPassword',
    component: ForgotPassword,
    private: true,
  },
  {
    path: 'detailPlant',
    component: DetailPlant,
    private: true,
  },
  {
    path: 'plantList',
    component: PlantList,
    private: true,
  },
  {
    path: 'checkout',
    component: Checkout,
    private: true,
  },
  {
    path: 'editProfile',
    component: EditProfile,
    private: true,
  },
  {
    path: 'addNewAddress',
    component: NewAddress,
    private: true,
  },
];
export default RoutesStack;
