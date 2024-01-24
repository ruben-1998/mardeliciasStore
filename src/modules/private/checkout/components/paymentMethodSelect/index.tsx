import React, {useState} from 'react';
import Select from '@/modules/private/checkout/components/select';
import {
  arrowBack,
  bank,
  bankCash,
  cash,
  creditCardPlus,
  dolar,
  truck,
} from '@/shared/assets/icons';
import ButtonSheet from '@/shared/components/buttonSheet';
import {TouchableOpacity, View} from 'react-native';
import {normalize} from '@/shared/helpers';
import Icon from '@/shared/components/icon';
import Typography from '@/shared/components/typography';
import ListOptionCard, {
  OptionCardOptions,
} from '@/shared/components/ListOptionCard';
import {Button} from '@/shared/components/buttons';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {semantic} from '@/shared/constants/colors';
import {StoreContext} from '@/context/context';
import {PAYMENT_METHODS} from '@/shared/constants/global';

export default function PaymentMethodSelect() {
  const {isDarkMode} = useDarkMode();
  const [openModal, setOpenModal] = useState(false);
  const {paymentMethod, setPaymentMethod} = React.useContext(StoreContext);

  function onSelectPayment(option: OptionCardOptions) {
    setPaymentMethod(option);
  }
  function toggleModal() {
    setOpenModal(!openModal);
  }
  return (
    <View>
      <Select
        value={paymentMethod}
        callback={toggleModal}
        showChange={false}
        title={'Metodo de pago'}
        description={'Escoger metodo de pago'}
        icon={creditCardPlus}
        showDescriptionValue={false}
      />

      <ButtonSheet dispatch={openModal} onClose={toggleModal}>
        <View style={{padding: normalize(24)}}>
          <TouchableOpacity
            onPress={toggleModal}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              customStyles={{
                tintColor: isDarkMode
                  ? semantic.fill.f04
                  : semantic.background.dark.d500,
              }}
              icon={arrowBack}
            />
            <Typography
              style={{
                fontWeight: '700',
                fontSize: normalize(24),
                marginLeft: normalize(10),
              }}>
              {'Metodo de pago'}
            </Typography>
          </TouchableOpacity>

          <ListOptionCard
            value={paymentMethod}
            onChange={onSelectPayment}
            showDescriptionValue={false}
            options={[
              {
                id: '1',
                icon: cash,
                title: PAYMENT_METHODS.CASH,
                description: 'efectivo',
                active: false,
              },
              {
                id: '2',
                icon: bank,
                title: PAYMENT_METHODS.TRANSFER,
                description: 'transferencia',
                active: false,
              },
              {
                id: '3',
                icon: bankCash,
                title: PAYMENT_METHODS.MIX,
                description: 'mixto',
                active: false,
              },
            ]}
          />

          <Button onPress={toggleModal} title="Aceptar" />
        </View>
      </ButtonSheet>
    </View>
  );
}
