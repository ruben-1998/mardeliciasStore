import React from 'react';
import {styles} from './styles';
import Typography from '@/shared/components/typography';
import {TouchableOpacity, View} from 'react-native';
import {arrowBack} from '@/shared/assets/icons';
import Icon from '../icon';
import {useNavigation} from '@react-navigation/native';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {semantic} from '@/shared/constants/colors';
import {normalize} from '@/shared/helpers';
import {NavigationProps} from '@/shared/routes/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

interface TitleAuthProps {
  title?: string;
  icon?: React.ReactNode | undefined;
}
export default function TitleAuth({title, icon}: TitleAuthProps) {
  const {navigate, goBack} = useNavigation<NavigationProps>();
  const {isDarkMode} = useDarkMode();
  const stylesIcon = {
    tintColor: isDarkMode ? semantic.background.white.w500 : semantic.text.grey,
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon
            customStyles={{
              ...stylesIcon,
              width: normalize(25),
              height: normalize(25),
            }}
            icon={icon ? icon : arrowBack}
          />
        </TouchableOpacity>
        {title && <Typography style={styles.title}>{title}</Typography>}
      </View>
    </SafeAreaView>
  );
}
