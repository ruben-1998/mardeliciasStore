import {StyleSheet} from 'react-native';
import {palette, semantic} from '@/shared/constants/colors';
import {normalize} from '@/shared/helpers';

export const _styles = (
  disabled: boolean | undefined,
  sm: boolean | undefined,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: disabled ? semantic.fill.f04 : palette.main.p500,
      paddingHorizontal: normalize(sm ? 6 : 10),
      paddingVertical: normalize(sm ? 12 : 16),
      borderRadius: normalize(sm ? 10 : 16),
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      color: disabled ? semantic.text.black : semantic.text.white,
      fontWeight: '700',
      marginHorizontal: normalize(4),
      fontSize: normalize(16),
      textAlign: 'center',
    },
    icon: {
      tintColor: semantic.text.white,
      width: normalize(24),
      height: normalize(24),
      marginLeft: normalize(5),
    },
  });
