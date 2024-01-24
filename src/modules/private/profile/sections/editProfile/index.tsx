import React, {useEffect, useState} from 'react';
import {Image, ToastAndroid, TouchableOpacity, View, Text} from 'react-native';
import Wrapper from '@/shared/components/wrapper';
import HeaderWithIcon from '@/shared/components/headerBack';
import Icon from '@/shared/components/icon';
import {
  edit,
  eyeFilled,
  eyeOff,
  location,
  lock,
  mail,
  phone,
  user as userIcon,
} from '@/shared/assets/icons';
import Input from '@/shared/components/input';
import {Button} from '@/shared/components/buttons';
import {styles} from './styles';
import Typography from '@/shared/components/typography';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import {StoreContext} from '@/context/context';
import * as Yup from 'yup';
import {dniRegExp} from '@/shared/constants/global';
import {NewUser} from '@/shared/DTO';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@/shared/routes/stack';
import {updateUser} from '@/shared/helpers/services/login';
import {storage} from '@/shared/helpers';

const EditProfile = () => {
  const {user, setUser} = React.useContext(StoreContext);
  const [isSecureActive, setIsSecureActive] = useState(true);
  const {goBack} = useNavigation<NavigationProps>();

  const togglePassword = () => {
    setIsSecureActive(!isSecureActive);
  };

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
    city: Yup.string(),
    direction: Yup.string(),
    direction_detail: Yup.string(),
  });

  const [initials, setInitials] = useState('NA');

  useEffect(() => {
    setInitials(
      `${user?.user_metadata?.first_name?.charAt(
        0,
      )} ${user?.user_metadata?.last_name?.charAt(0)}`,
    );
  }, [user]);

  const onSubmit = async (
    values: NewUser,
    {setErrors, setStatus, setSubmitting, resetForm}: FormikHelpers<NewUser>,
  ) => {
    const {data, error} = await updateUser(user.id, {...values});

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
    <Wrapper>
      {user && user.user_metadata && (
        <View style={styles.container}>
          <HeaderWithIcon title="Editar Perfil" />
          <View style={styles.imageContainer}>
            <Text style={styles.textItem}>{initials}</Text>
          </View>
          <View style={styles.formContainer}>
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
                        leftIcon={<Icon icon={userIcon} />}
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
                        leftIcon={<Icon icon={userIcon} />}
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
                      title="Actualizar"
                      onPress={() => submitForm()}
                      loading={isSubmitting}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
    </Wrapper>
  );
};

export default EditProfile;
