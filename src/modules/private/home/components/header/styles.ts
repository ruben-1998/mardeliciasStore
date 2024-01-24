import {StyleSheet} from 'react-native';
import {normalize} from '@/shared/helpers';
import {semantic} from '@/shared/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(24),
  },
  avatar: {
    width: normalize(60),
    height: normalize(60),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameUser: {
    fontSize: normalize(16),
    fontWeight: '700',
    marginBottom: normalize(6),
  },
  iconLocation: {
    width: normalize(16),
    height: normalize(16),
  },
  location: {
    color: semantic.text.grey,
    fontWeight: '500',
  },
  iconSize: {
    width: normalize(30),
    height: normalize(30),
  },
});
