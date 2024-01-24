import React, {useContext} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Typography from '@/shared/components/typography';
import {currencyType} from '@/shared/constants/global';
import {_styles} from './styles';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {normalize} from '@/shared/helpers';
import {useNavigation} from '@react-navigation/native';
import {ProductsStore} from '@/shared/DTO';
import {NavigationProps} from '@/shared/routes/stack';
import {Button} from '../buttons';
import {StoreContext} from '@/context/context';

interface Props {
  product: ProductsStore;
  width?: number;
  height?: number;
  imageHeight?: number;
}

export default function CardProduct({
  product,
  width = 190,
  height = 260,
  imageHeight = 120,
}: Props) {
  const {isDarkMode} = useDarkMode();
  const styles = _styles(isDarkMode);
  const navigation = useNavigation<NavigationProps>();
  const {handleAddItem} = useContext(StoreContext);

  function navigateTo() {
    navigation.navigate('detailPlant', {product: product});
  }

  return (
    <TouchableOpacity
      onPress={navigateTo}
      style={styles.container}
      activeOpacity={0.8}>
      <View
        style={[
          styles.containerImage,
          {width: normalize(width), height: 'auto'},
        ]}>
        {product.imageUrl && (
          <Image
            style={[styles.image, {height: imageHeight}]}
            resizeMode="contain"
            source={{uri: product.imageUrl}}
          />
        )}

        <View style={styles.descriptionContainer}>
          <Typography style={styles.name} translate={false}>
            {product.name}
          </Typography>
          <Typography style={styles.price} translate={false}>
            {currencyType} {product?.price}
          </Typography>
          <Button
            title={'Agregar'}
            onPress={() => handleAddItem({...product, qty: 1})}
            sm
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
