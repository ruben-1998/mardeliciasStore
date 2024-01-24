import React from 'react';
import {View} from 'react-native';

import {location} from '@/shared/assets/icons';

import Select from '../select';
import {StoreContext} from '@/context/context';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@/shared/routes/stack';

export default function AddressSelect() {
  const {navigate} = useNavigation<NavigationProps>();
  const {user} = React.useContext(StoreContext);

  function toggleModal() {
    navigate('addNewAddress');
  }

  return (
    <View>
      <Select
        value={{
          id: '1',
          active: true,
          icon: location,
          title: user?.user_metadata?.direction,
          description: user?.user_metadata?.direction_detail,
        }}
        callback={toggleModal}
        showChange={false}
        title={'Dirección'}
        description={'Escoger dirección de envio'}
        icon={location}
        showDescriptionValue
      />
    </View>
  );
}
