import {palette, semantic} from '@/shared/constants/colors';
import {normalize} from '@/shared/helpers';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.main.p100,
  },
  modalView: {
    margin: 20,
    borderRadius: normalize(20),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: palette.main.p500,
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    tintColor: semantic.text.white,
    width: 30,
    height: 30,
  },
  titleText: {
    fontSize: normalize(22),
    color: semantic.text.black,
    fontWeight: '700',
  },
  descriptionText: {
    fontSize: normalize(18),
    color: semantic.text.grey,
    marginBottom: 60,
  },
});
