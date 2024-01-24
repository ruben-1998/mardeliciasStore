import React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CardProduct from '../cardProduct';
import {ProductsStore} from '@/shared/DTO';
import {styles} from './styles';
import Typography from '../typography';

interface Props {
  data?: ProductsStore[];
}

const ProductsSlider = ({data}: Props) => {
  return (
    <View style={styles.container}>
      <Typography style={styles.titleSection}>Productos Favoritos</Typography>
      <FlatList
        data={data}
        renderItem={baseData => <CardProduct product={baseData.item} />}
        keyExtractor={(item, index) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductsSlider;
