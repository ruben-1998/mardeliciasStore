import {palette, semantic} from '@/shared/constants/colors';
import {normalize} from '@/shared/helpers';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: normalize(30),
    flexDirection: 'column',
  },
  imageContainer: {
    marginTop: normalize(30),
    alignSelf: 'center',
    width: normalize(180),
    height: normalize(180),
    marginRight: normalize(12),
    backgroundColor: palette.main.p500,
    borderRadius: 100,
    color: semantic.text.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItem: {
    fontSize: normalize(60),
    fontWeight: '700',
    color: semantic.text.white,
  },
  formContainer: {
    marginVertical: normalize(30),
    gap: normalize(20),
  },
  formControl: {
    marginBottom: normalize(24),
  },
  textError: {
    color: 'red',
  },
  form: {
    marginTop: normalize(32),
  },
});
