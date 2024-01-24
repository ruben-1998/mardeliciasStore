import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Typography from '@/shared/components/typography';
import Icon from '@/shared/components/icon';
import {Minus, Plus} from '@/shared/assets/icons';
import {StoreContext} from '@/context/context';
import {Product} from '@/shared/DTO';

export enum TypeChange {
  minus = 0,
  plus = 1,
}

interface CounterProps {
  cant?: number;
  product?: Product;
  setQuantity?: (quantity: number) => void;
}

export default function CounterAdd({
  product,
  setQuantity = () => {},
}: CounterProps) {
  const {handleAddItem} = React.useContext(StoreContext);

  if (!product) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setQuantity(product.qty - 1)}
        style={styles.btnReduce}>
        <Icon customStyles={styles.minus} icon={Minus} />
      </TouchableOpacity>
      <Typography style={styles.value}>{String(product.qty)}</Typography>
      <TouchableOpacity
        onPress={() => setQuantity(product.qty + 1)}
        style={styles.btnAument}>
        <Icon customStyles={styles.plus} icon={Plus} />
      </TouchableOpacity>
    </View>
  );
}
