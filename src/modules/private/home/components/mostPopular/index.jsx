import React from 'react';
import List from '@/shared/components/list';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import Typography from '@/shared/components/typography';
import {styles} from './styles';
import CardProductFull from '@/shared/components/cardProductFull';

export default function MostPopular({products}) {
  function renderItem(item, key) {
    return <CardProductFull key={key} product={item} imageHeight={103} />;
  }
  return (
    <View>
      <Typography style={styles.titleSection}>Productos</Typography>
      {!products ? (
        <Typography style={styles.titleSection}>
          Productos no disponibles
        </Typography>
      ) : (
        <List between data={products} rows={2} renderItem={renderItem} />
      )}
    </View>
  );
}
