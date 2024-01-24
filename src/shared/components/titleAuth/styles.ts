import {StyleSheet} from 'react-native';
import {normalize} from '@/shared/helpers';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: normalize(32),
  },
  title: {
    fontSize: normalize(16),
    fontWeight: '700',
    marginLeft: normalize(10),
  },
  logoContainer: {
    width: normalize(150),
    height: normalize(150),
    alignSelf: 'center',
  },
  logoLoader: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
