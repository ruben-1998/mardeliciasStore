import React from 'react';
import List from '@/shared/components/list';
import {View} from 'react-native';
import CardProductHorizontal from '@/shared/components/cardProductHorizontal';
import {Product} from '@/shared/DTO';

interface ProductList {
  products: Product[];
}

export default function ProductList({products}: ProductList) {
  function renderItem(item: any, key: number) {
    return (
      <View style={{marginBottom: 20, marginTop: 20, flex: 1}} key={key}>
        <CardProductHorizontal actions={false} checkout product={item} />
      </View>
    );
  }

  if (!products) return;
  return <List between data={products} rows={1} renderItem={renderItem} />;
}
