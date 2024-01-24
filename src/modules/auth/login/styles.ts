import {StyleSheet} from 'react-native';
import {normalize} from '@/shared/helpers';
import {palette} from '@/shared/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: normalize(24),
  },
  imageWrapper: {
    alignItems: 'center',
    marginVertical: normalize(10),
  },
  logo: {
    width: normalize(150),
    height: normalize(150),
  },
  form: {
    marginTop: normalize(32),
  },
  formControl: {
    marginBottom: normalize(24),
  },
  containerRemember: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRemember: {
    marginLeft: normalize(10),
  },
  forgot: {
    fontWeight: '700',
  },
  textError: {
    color: 'red',
  },
  signUp: {
    width: '100%',
  },
  newAccount: {
    width: '100%',
    paddingVertical: normalize(15),
  },
  signUpText: {
    width: '100%',
    color: palette.main.p500,
    opacity: 0.5,
    textAlign: 'center',
  },
});
