import {
  arrowBack,
  dots,
  edit,
  eyeFilled,
  help,
  location,
  logout,
  notification,
  order,
  security,
  user as userIcon,
  vocher,
  walletFilled,
} from '@/shared/assets/icons';
import Icon from '@/shared/components/icon';
import Typography from '@/shared/components/typography';
import Wrapper from '@/shared/components/wrapper';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import Section from './components/section';
import Toggle from '@/shared/components/toggle';

import {styles} from './styles';
import {normalize, storage} from '@/shared/helpers';
import {NavigationProps} from '@/shared/routes/stack';
import {useNavigation} from '@react-navigation/native';
import ButtonSheet from '@/shared/components/buttonSheet';
import ListOptionCard, {
  OptionCardOptions,
} from '@/shared/components/ListOptionCard';
import {Button} from '@/shared/components/buttons';
import useDarkMode from '@/shared/hooks/useDarkMode';
import UserValidation from '@/shared/components/user-validation/userValidation';
import {StoreContext} from '@/context/context';
import {signOut} from '@/shared/helpers/services/login';
import Login from '@/modules/auth/login';
import {ScrollView} from 'react-native-gesture-handler';

const Profile = () => {
  const {navigate} = useNavigation<NavigationProps>();
  const {user, setUser} = React.useContext(StoreContext);
  const [initials, setInitials] = useState('NA');

  function navigateToNewAddress() {
    navigate('addNewAddress');
  }

  const handleLogOut = async () => {
    await signOut();
    await storage.delete('user');
    setUser(undefined);
  };

  useEffect(() => {
    setInitials(
      `${user?.user_metadata?.first_name?.charAt(
        0,
      )} ${user?.user_metadata?.last_name?.charAt(0)}`,
    );
  }, [user]);

  return (
    <>
      {user && user.user_metadata ? (
        <Wrapper isDark>
          <View style={styles.container}>
            <View style={styles.profileText}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon icon={userIcon} />
                <Typography
                  style={{
                    fontWeight: '700',
                    fontSize: 24,
                    marginLeft: normalize(10),
                  }}>
                  Perfil
                </Typography>
              </View>
            </View>

            <View style={styles.profileInfo}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={styles.profileInitials}>
                  <Text style={styles.profileInitialsText}>{initials}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}>
                  <Typography style={{fontWeight: '700', fontSize: 16}}>
                    {`${user?.user_metadata?.first_name} ${user?.user_metadata?.last_name}`}
                  </Typography>
                  <Typography style={{fontWeight: '500', fontSize: 14}}>
                    {`(593) ${user?.phone}`}
                  </Typography>
                  <Typography style={{fontWeight: '500', fontSize: 14}}>
                    {user.email}
                  </Typography>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigate('editProfile')}>
                <Icon icon={edit} />
              </TouchableOpacity>
            </View>
            <Section
              elements={[
                {
                  name: 'Dirección',
                  description: user?.user_metadata?.direction,
                  leftIcon: <Icon icon={location} />,
                  onPress: () => navigateToNewAddress(),
                },
                {
                  name: 'profile.logout',
                  leftIcon: <Icon icon={logout} />,
                  onPress: () => handleLogOut(),
                },
              ]}
            />
          </View>
        </Wrapper>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Profile;
