import {StyleSheet} from 'react-native';
import {normalize} from '@/shared/helpers';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: normalize(24),
  },
  body: {
    marginVertical: normalize(20),
  },
});
