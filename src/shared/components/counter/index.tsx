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
}

export default function Counter({cant = 1, product}: CounterProps) {
  const [count, setCounter] = useState(cant);
  const {handleIncrementItem, handleDecrementItem} =
    React.useContext(StoreContext);

  if (!product) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleDecrementItem(product)}
        style={styles.btnReduce}>
        <Icon customStyles={styles.minus} icon={Minus} />
      </TouchableOpacity>
      <Typography style={styles.value}>{String(product.qty)}</Typography>
      <TouchableOpacity
        onPress={() => handleIncrementItem(product)}
        style={styles.btnAument}>
        <Icon customStyles={styles.plus} icon={Plus} />
      </TouchableOpacity>
    </View>
  );
}
