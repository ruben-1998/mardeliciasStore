import React, {useState} from 'react';
import {View} from 'react-native';
import Wrapper from '@/shared/components/wrapper';
import HeaderWithIcon from '@/shared/components/headerBack';
import {Button} from '@/shared/components/buttons';
import {normalize} from '@/shared/helpers';
import {styles} from './styles';
import AddressSelect from '@/modules/private/checkout/components/addressSelect';
import ProductList from '@/shared/components/productList';
import PaymentMethodSelect from '@/modules/private/checkout/components/paymentMethodSelect';
import ResumeTransaction from '@/shared/components/resumeTransaction';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {semantic} from '@/shared/constants/colors';
import {StoreContext} from '@/context/context';
import SuccessModal from './components/successModal';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@/shared/routes/stack';
import FileUpdater from './components/fileUpdater';

export default function Checkout() {
  const {isDarkMode} = useDarkMode();
  const {
    cart,
    total,
    pending,
    handleSubmitOrder,
    orderCreated,
    setOrderCreated,
    isLoading,
  } = React.useContext(StoreContext);
  const {navigate} = useNavigation<any>();

  const handleOnSuccessOrder = () => {
    setOrderCreated(false);
    navigate('orders');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: normalize(24),
        backgroundColor: isDarkMode
          ? semantic.background.dark.d500
          : semantic.background.white.w500,
      }}>
      <Wrapper>
        <View>
          <HeaderWithIcon title={'checkout.title'} />

          <View style={styles.body}>
            <AddressSelect />
            <ProductList products={cart} />
            <PaymentMethodSelect />
            <FileUpdater />
            <ResumeTransaction total={total} pending={pending} />
          </View>
        </View>
        <Button
          title="Enviar"
          onPress={handleSubmitOrder}
          loading={isLoading}
          disabled={isLoading}
        />
      </Wrapper>
      <View style={{height: normalize(40)}} />
      <SuccessModal
        dispatch={orderCreated}
        handleOnSuccessOrder={handleOnSuccessOrder}
      />
    </View>
  );
}
