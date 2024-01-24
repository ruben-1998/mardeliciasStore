import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Typography from '@/shared/components/typography';
import {styles} from './styles';
import Icon from '@/shared/components/icon';
import {
  location,
  homeNotifications,
  homeLike,
  homeNotificationsDark,
  homeLikeDark,
} from '@/shared/assets/icons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@/shared/routes/stack';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {storage} from '@/shared/helpers';
import {StoreContext} from '@/context/context';

export default function Header() {
  const {isDarkMode} = useDarkMode();
  const {navigate} = useNavigation<NavigationProps>();
  const {user} = React.useContext(StoreContext);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          style={styles.avatar}
          source={require('@/shared/assets/icons/mardelicias.png')}
        />
        <View>
          <Typography style={styles.nameUser} translate={false}>
            {user
              ? `${user?.user_metadata?.first_name} ${user?.user_metadata?.last_name}`
              : 'Invitado'}
          </Typography>
          <View style={styles.row}>
            <Icon customStyles={styles.iconLocation} icon={location} />
            <Typography style={styles.location} translate={false}>
              {user ? user?.user_metadata?.city : 'Invitado'}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
}
