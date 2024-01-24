import {StyleSheet} from 'react-native';
import {normalize} from '@/shared/helpers';
import {palette, semantic} from '@/shared/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: normalize(24),
  },
  container: {
    flex: 1,
  },
  form: {},
  formControl: {
    marginBottom: normalize(24),
  },
  containerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alreadyAccount: {
    fontSize: normalize(16),
  },
  link: {
    marginLeft: normalize(6),
    color: palette.main.p500,
    fontWeight: '700',
    fontSize: normalize(16),
  },
  textError: {
    color: 'red',
  },
  mapContainer: {
    height: 400,
    width: '100%',
    marginBottom: normalize(24),
  },
  map: {
    height: '100%',
    width: '100%',
  },
  marker: {
    height: 55,
    width: 55,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  label: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: semantic.text.black,
    marginBottom: normalize(10),
  },
});
