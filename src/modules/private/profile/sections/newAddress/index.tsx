import {Image, ToastAndroid, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import HeaderWithIcon from '@/shared/components/headerBack';

import {Button} from '@/shared/components/buttons';
import {normalize, storage} from '@/shared/helpers';
import Typography from '@/shared/components/typography';
import Input from '@/shared/components/input';
import {location, map} from '@/shared/assets/icons';
import Icon from '@/shared/components/icon';
import useDarkMode from '@/shared/hooks/useDarkMode';
import CustomStatusBar from '@/shared/components/customStatusBar';
import {_styles} from './styles';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {StoreContext} from '@/context/context';
import * as Yup from 'yup';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import {NewUser} from '@/shared/DTO';
import {updateAddress} from '@/shared/helpers/services/login';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@/shared/routes/stack';
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {PermissionsContext} from '@/context/PermissionsContext';

const NewAddress = () => {
  const {isDarkMode} = useDarkMode();
  const styles = _styles(isDarkMode);
  const {user, setUser} = React.useContext(StoreContext);
  const {askLocationPermission} = React.useContext(PermissionsContext);
  const {goBack} = useNavigation<NavigationProps>();
  const [region, setRegion] = useState<Region>({
    latitude: user?.user_metadata?.latitude ?? -0.949952,
    longitude: user?.user_metadata?.longitude ?? -80.720673,
    latitudeDelta: 0.01469,
    longitudeDelta: 0.0087,
  });

  const onRegionChangeComplete = (change: Region) => {
    setRegion(change);
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '60%', '75%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    askLocationPermission();
  }, []);

  const validations = Yup.object().shape({
    city: Yup.string(),
    direction: Yup.string(),
    direction_detail: Yup.string(),
  });

  const onSubmit = async (
    values: NewUser,
    {setErrors, setStatus, setSubmitting, resetForm}: FormikHelpers<NewUser>,
  ) => {
    const {data, error} = await updateAddress(user.id, {
      ...values,
      latitude: region.latitude,
      longitude: region.longitude,
    });

    if (error) {
      setErrors({submit: error.message});
      ToastAndroid.show('Error al editar el usuario', ToastAndroid.SHORT);
      setStatus({success: false});
      setSubmitting(false);
      return;
    }

    setStatus({success: true});
    setSubmitting(false);
    setUser(data.user);
    await storage.create('user', data.user);
    resetForm();

    goBack();
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <View style={styles.topSpace} />
      <View style={styles.headerBack}>
        <HeaderWithIcon title="Dirección" />
      </View>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
        />
        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={require('@/shared/assets/icons/marker.png')}
          />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{paddingHorizontal: normalize(24), paddingTop: normalize(15)}}>
        <View style={{...styles.alignCenter}}>
          <Typography style={styles.fontBold}>Detalle</Typography>
          <View style={styles.dividerLight} />
        </View>

        <BottomSheetScrollView>
          <Formik
            initialValues={{
              dni: user.user_metadata.dni,
              first_name: user.user_metadata.first_name,
              last_name: user.user_metadata.last_name,
              phone: `0${user.phone}`,
              email: user.email,
              password: '',
              role: user.user_metadata.role,
              city: user.user_metadata.city,
              direction: user.user_metadata.direction,
              direction_detail: user.user_metadata.direction_detail,
              submit: '',
            }}
            validationSchema={validations}
            onSubmit={onSubmit}>
            {({
              errors,
              handleChange,
              isSubmitting,
              submitForm,
              touched,
              values,
            }: FormikProps<NewUser>) => (
              <View>
                <View style={{marginBottom: normalize(24)}}>
                  <Input
                    leftIcon={<Icon icon={location} />}
                    label="Dirección"
                    placeholder="Dirección"
                    onChangeText={handleChange('direction')}
                    value={values.direction}
                  />
                  {touched.direction && errors.direction && (
                    <Typography style={styles.textError}>
                      {errors.direction}
                    </Typography>
                  )}
                </View>
                <View style={{marginBottom: normalize(24)}}>
                  <Input
                    leftIcon={<Icon icon={location} />}
                    label="Detalle de la Direccón"
                    placeholder="Piso 4 Edificio color Azul"
                    multiline
                    onChangeText={handleChange('direction_detail')}
                    value={values.direction_detail}
                  />
                  {touched.direction_detail && errors.direction_detail && (
                    <Typography style={styles.textError}>
                      {errors.direction_detail}
                    </Typography>
                  )}
                </View>
                <View style={{marginBottom: normalize(24)}}>
                  <Input
                    leftIcon={<Icon icon={location} />}
                    label="Ciudad"
                    placeholder="Ciudad"
                    multiline
                    onChangeText={handleChange('city')}
                    value={values.city}
                  />
                  {touched.city && errors.city && (
                    <Typography style={styles.textError}>
                      {errors.city}
                    </Typography>
                  )}
                </View>

                {errors.submit && (
                  <View style={{marginBottom: normalize(24)}}>
                    <Typography style={styles.textError}>
                      {errors.submit}
                    </Typography>
                  </View>
                )}
                <Button
                  title="Actualizar"
                  onPress={() => submitForm()}
                  loading={isSubmitting}
                />
              </View>
            )}
          </Formik>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default NewAddress;
