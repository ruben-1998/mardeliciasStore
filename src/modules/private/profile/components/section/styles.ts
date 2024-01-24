import {normalize} from '@/shared/helpers';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#7A8499',
    marginBottom: normalize(10),
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(18),
    backgroundColor: 'white',
    marginBottom: normalize(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  descriptionContainer: {
    marginLeft: normalize(10),
    flexDirection: 'column',
    alignContent: 'center',
  },
  name: {
    fontWeight: '800',
    fontSize: 16,
  },
  detail: {
    fontWeight: '500',
    fontSize: 14,
  },
});
