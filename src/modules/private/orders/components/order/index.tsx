import React, {useEffect, useState} from 'react';
import {Alert, ToastAndroid, TouchableOpacity, View} from 'react-native';
import Typography from '@/shared/components/typography';
import Icon from '@/shared/components/icon';
import {calendarDate, location, trash} from '@/shared/assets/icons';
import {_styles} from './styles';
import {
  ORDER_STATUS_DEFINITIONS,
  activeOpacity,
  currencyType,
} from '@/shared/constants/global';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {Order as OrderDTOP} from '@/shared/DTO';
import {Button} from '@/shared/components/buttons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@/shared/routes/stack';
import {format} from 'date-fns';
// import {updateOrder} from '@/shared/services/orders/orders';
import {mutate} from 'swr';
import {normalize} from '@/shared/helpers';

interface OrderProps {
  order: OrderDTOP;
  track?: boolean | undefined;
  map?: boolean;
}
export default function Order({order, track = true, map = false}: OrderProps) {
  const {navigate} = useNavigation<NavigationProps>();
  const {isDarkMode} = useDarkMode();
  const styles = _styles(isDarkMode);

  const [qty, setQty] = useState(0);

  useEffect(() => {
    setQty(order.products.reduce((total, product) => total + product.qty, 0));
  }, [order]);

  return (
    <View>
      {track && (
        <View style={styles.containerDate}>
          <Icon icon={calendarDate} />
          <Typography style={styles.date} translate={false}>
            {format(new Date(order.created_at), 'd-M-yyyy')}
          </Typography>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={activeOpacity}
        style={styles.containerOrder}>
        <View style={styles.containerInfo}>
          <View>
            <Typography style={styles.name} translate={false}>
              Orden #{order.id}
            </Typography>
          </View>
          <View style={{marginVertical: normalize(4)}}>
            <Typography style={styles.category} translate={false}>
              Repartidor:{' '}
              {order?.orders_driver_user_fkey
                ? `${order?.orders_driver_user_fkey?.first_name} ${order?.orders_driver_user_fkey?.last_name}`
                : 'No asignado'}
            </Typography>
            {order?.orders_driver_user_fkey && (
              <Typography style={styles.category} translate={false}>
                Teléfono: `+593 {order?.orders_driver_user_fkey?.phone}
              </Typography>
            )}
          </View>
          <Typography style={styles.category} translate={false}>
            Cantidad de Productos: {qty}
          </Typography>

          <View style={styles.containerCant}>
            <Typography style={styles.price} translate={false}>
              {currencyType} {order.total.toFixed(2)}
            </Typography>
            <View style={{width: 20}} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
