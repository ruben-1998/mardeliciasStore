import React, {useState} from 'react';
import Wrapper from '@/shared/components/wrapper';
import Input from '@/shared/components/input';
import {
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from '@/shared/components/buttons';
import {styles} from './styles';
import TitleAuth from '@/shared/components/titleAuth';
import Icon from '@/shared/components/icon';
import {
  eyeOff,
  lock,
  mail,
  user,
  location,
  phone,
  eyeFilled,
} from '@/shared/assets/icons';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import * as Yup from 'yup';
import {dniRegExp} from '@/shared/constants/global';
import {useNavigation} from '@react-navigation/native';
import Typography from '@/shared/components/typography';
import {NewUser} from '@/shared/DTO';
import {createUser} from '@/shared/helpers/services/login';
import {NavigationProps} from '@/shared/routes/stack';
import {normalize} from '@/shared/helpers';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';

export default function CreateAccount() {
  const validations = Yup.object().shape({
    dni: Yup.string()
      .min(10, 'El numero de cedula debe tener 10 caracteres')
      .max(10, 'El numero de cedula debe tener 10 caracteres')
      .matches(dniRegExp, 'El número de cédula es invalido')
      .required('El número de cédula'),
    first_name: Yup.string()
      .min(3, 'El nombre debe tener minimo 3 caracteres')
      .required('El nombre es requerido'),
    last_name: Yup.string()
      .min(3, 'El apellido debe tener minimo 3 caracteres')
      .required('El apellido es requerido'),
    phone: Yup.string()
      .min(10, 'El numero de célular debe tener 10 caracteres')
      .max(10, 'El numero de célular debe tener 10 caracteres')
      .required('El número de celular es requerido'),
    email: Yup.string()
      .email('El email debe ser valido')
      .max(255)
      .required('El email es requerido'),
    password: Yup.string().max(255).required('La contraseña es requerida'),
    city: Yup.string().required('La ciudad es requerida'),
    direction: Yup.string().required('La dirección es requerida'),
    direction_detail: Yup.string().required(
      'El detalle de la dirección es requerida',
    ),
  });

  const [region, setRegion] = useState<Region>({
    latitude: -0.949952,
    longitude: -80.720673,
    latitudeDelta: 0.01469,
    longitudeDelta: 0.0087,
  });
  const [isSecureActive, setIsSecureActive] = useState(true);
  const {navigate} = useNavigation<NavigationProps>();

  const onRegionChangeComplete = (change: Region) => {
    setRegion(change);
  };

  const togglePassword = () => {
    setIsSecureActive(!isSecureActive);
  };

  const onSubmit = async (
    values: NewUser,
    {setErrors, setStatus, setSubmitting, resetForm}: FormikHelpers<NewUser>,
  ) => {
    const {error} = await createUser({
      ...values,
      latitude: region.latitude,
      longitude: region.longitude,
    });

    if (error) {
      setErrors({submit: error.message});
      ToastAndroid.show('Error al crear el usuario', ToastAndroid.SHORT);
      setStatus({success: false});
      setSubmitting(false);
      return;
    }

    setStatus({success: true});
    setSubmitting(false);
    resetForm();
    ToastAndroid.show('Usuario creado correctamente', ToastAndroid.SHORT);

    navigate('login');
  };

  return (
    <View style={styles.wrapper}>
      <TitleAuth title="Regresar" />

      <ScrollView>
        <Formik
          initialValues={{
            dni: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            password: '',
            role: '',
            city: '',
            direction: '',
            direction_detail: '',
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
            <View style={styles.container}>
              <View style={styles.form}>
                <View style={styles.formControl}>
                  <Input
                    label="Numero de Cédula"
                    placeholder="13xxxxxxxx"
                    onChangeText={handleChange('dni')}
                    value={values.dni}
                  />
                  {touched.dni && errors.dni && (
                    <Typography style={styles.textError}>
                      {errors.dni}
                    </Typography>
                  )}
                </View>
                <View style={styles.formControl}>
                  <Input
                    leftIcon={<Icon icon={user} />}
                    label="Nombres"
                    placeholder="Nombres"
                    onChangeText={handleChange('first_name')}
                    value={values.first_name}
                  />
                  {touched.first_name && errors.first_name && (
                    <Typography style={styles.textError}>
                      {errors.first_name}
                    </Typography>
                  )}
                </View>
                <View style={styles.formControl}>
                  <Input
                    leftIcon={<Icon icon={user} />}
                    label="Apellidos"
                    placeholder="Apellidos"
                    onChangeText={handleChange('last_name')}
                    value={values.last_name}
                  />
                  {touched.last_name && errors.last_name && (
                    <Typography style={styles.textError}>
                      {errors.last_name}
                    </Typography>
                  )}
                </View>
                <View style={styles.formControl}>
                  <Input
                    leftIcon={<Icon icon={mail} />}
                    label="Correo Electrónico"
                    placeholder="Correo Electrónico"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Typography style={styles.textError}>
                      {errors.email}
                    </Typography>
                  )}
                </View>
                <View style={styles.formControl}>
                  <Input
                    leftIcon={<Icon icon={lock} />}
                    rightIcon={
                      <TouchableOpacity onPress={togglePassword}>
                        <Icon icon={isSecureActive ? eyeOff : eyeFilled} />
                      </TouchableOpacity>
                    }
                    secureTextEntry={isSecureActive}
                    label="Contraseña"
                    placeholder="contraseña"
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Typography style={styles.textError}>
                      {errors.password}
                    </Typography>
                  )}
                </View>
                <View style={styles.formControl}>
                  <Input
                    leftIcon={<Icon icon={phone} />}
                    label="Celular"
                    placeholder="09xxxxxxx"
                    keyboardType="phone-pad"
                    onChangeText={handleChange('phone')}
                    value={values.phone}
                  />
                  {touched.phone && errors.phone && (
                    <Typography style={styles.textError}>
                      {errors.phone}
                    </Typography>
                  )}
                </View>
                <View style={styles.formControl}>
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
                <View style={styles.formControl}>
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
                <View style={styles.formControl}>
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
                <View style={styles.formControl}>
                  <Typography style={styles.label}>Ubicación</Typography>

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
                </View>
              </View>

              <View style={styles.formControl}>
                {errors.submit && (
                  <View style={styles.formControl}>
                    <Typography style={styles.textError}>
                      {errors.submit}
                    </Typography>
                  </View>
                )}
                <Button
                  title="Registrar"
                  onPress={() => submitForm()}
                  loading={isSubmitting}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
