import {StyleSheet} from 'react-native';
import {normalize} from '@/shared/helpers';

export const styles = StyleSheet.create({
  containerSearch: {
    paddingHorizontal: normalize(15),
    marginVertical: normalize(14),
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '700',
    color: 'black',
  },
});
