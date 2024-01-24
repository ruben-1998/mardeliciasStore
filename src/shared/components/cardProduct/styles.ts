import {StyleSheet} from 'react-native';
import {normalize} from '@/shared/helpers';
import {palette, semantic} from '@/shared/constants/colors';

export const _styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: normalize(24),
      paddingHorizontal: normalize(7),
    },
    containerImage: {
      flex: 1,
      backgroundColor: 'white',
      overflow: 'hidden',
      borderRadius: normalize(16),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.23,
      shadowRadius: 3.84,

      elevation: 9,
    },
    image: {
      width: '100%',
    },
    descriptionContainer: {
      flex: 1,
      paddingTop: normalize(12),
      paddingBottom: 12,
      paddingHorizontal: normalize(12),
      justifyContent: 'center',
    },

    name: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? semantic.text.white : semantic.text.black,
      opacity: 0.8,
      maxHeight: normalize(50),
    },
    category: {
      fontSize: normalize(16),
      color: semantic.text.grey,
      marginVertical: normalize(8),
    },
    price: {
      color: palette.main.p500,
      fontSize: 14,
      fontWeight: '500',
      marginBottom: normalize(15),
    },
  });
