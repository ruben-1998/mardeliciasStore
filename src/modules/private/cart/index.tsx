import React, {useState} from 'react';
import Wrapper from '@/shared/components/wrapper';
import {ScrollView, View} from 'react-native';
import HeaderWithIcon from '@/shared/components/headerBack';
import {shoppingBag} from '@/shared/assets/icons';
import CardProductHorizontal from '@/shared/components/cardProductHorizontal';
import List from '@/shared/components/list';
import {Button, ButtonOutline} from '@/shared/components/buttons';
import {normalize} from '@/shared/helpers';
import ButtonSheet from '@/shared/components/buttonSheet';
import Typography from '@/shared/components/typography';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@/shared/routes/stack';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {semantic} from '@/shared/constants/colors';
import {StoreContext} from '@/context/context';
import Login from '@/modules/auth/login';
import {Product} from '@/shared/DTO';

export default function Cart() {
  const {isDarkMode} = useDarkMode();
  const {navigate} = useNavigation<NavigationProps>();
  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [selectedProductToRemove, setSelectedProductToRemove] = useState<
    Product | undefined
  >(undefined);
  const {user, cart, handleRemoveItem} = React.useContext(StoreContext);

  const toggleOpenDeleteItem = () => {
    setOpenDeleteItem(!openDeleteItem);
  };

  const removeFormCart = (product: Product) => {
    setSelectedProductToRemove(product);
    toggleOpenDeleteItem();
  };

  const handleRemoveOk = () => {
    handleRemoveItem(selectedProductToRemove);
    toggleOpenDeleteItem();
  };

  const renderItem = (item: Product, key: number) => {
    return (
      <View style={{marginBottom: 20, flex: 1}} key={key}>
        <CardProductHorizontal onRemoveCart={removeFormCart} product={item} />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {user ? (
        <>
          <Wrapper>
            <View style={{flex: 1, paddingHorizontal: normalize(24)}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}>
                <HeaderWithIcon icon={shoppingBag} title="cart.title" />
                <View style={{height: normalize(32)}} />
                {cart && cart?.length > 0 ? (
                  <List between data={cart} rows={1} renderItem={renderItem} />
                ) : (
                  <Typography style={{fontSize: 24, textAlign: 'center'}}>
                    No tienes items en tu carrito
                  </Typography>
                )}
              </ScrollView>
            </View>
            <ButtonSheet
              onClose={toggleOpenDeleteItem}
              dispatch={openDeleteItem}>
              <View style={styles.bodyButtonSheet}>
                <Typography style={styles.titleButtonSheet}>
                  {'cart.remove_cart'}
                </Typography>
                {selectedProductToRemove && (
                  <View style={styles.containerProduct}>
                    <CardProductHorizontal
                      actions={false}
                      product={selectedProductToRemove}
                    />
                  </View>
                )}

                <View style={styles.footerButtonSheet}>
                  <View style={{flex: 1}}>
                    <ButtonOutline
                      onPress={toggleOpenDeleteItem}
                      title="Cancelar"
                    />
                  </View>
                  <View style={{width: 10}} />
                  <View style={{flex: 1}}>
                    <Button title="Si, remover" onPress={handleRemoveOk} />
                  </View>
                </View>
              </View>
            </ButtonSheet>
          </Wrapper>
          {cart && cart?.length > 0 && (
            <View
              style={{
                paddingHorizontal: normalize(24),
                backgroundColor: isDarkMode
                  ? semantic.background.dark.d500
                  : semantic.background.white.w500,
                marginBottom: 10,
              }}>
              <Button onPress={() => navigate('checkout')} title="Comprar" />
            </View>
          )}
        </>
      ) : (
        <Login />
      )}
    </View>
  );
}
