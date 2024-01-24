import {StoreContext} from '@/context/context';
import Input from '@/shared/components/input';
import {PAYMENT_METHODS} from '@/shared/constants/global';
import React from 'react';
import {Text, View, Image, Button} from 'react-native';
import TitleSection from '../titleSection';
import {styles} from './styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Typography from '@/shared/components/typography';
import {semantic} from '@/shared/constants/colors';
import {normalize} from '@/shared/helpers';
import useBanks from '@/shared/hooks/useBanks';

const FileUpdater = () => {
  const {paymentMethod, setPending, imageVoucher, setImageVoucher} =
    React.useContext(StoreContext);
  const {data: bankData, isLoading, error} = useBanks();
  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) return;
        if (!response.assets) return;
        setImageVoucher(response?.assets[0]);
      },
    );
  };
  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) return;
        if (!response.assets) return;
        setImageVoucher(response?.assets[0]);
      },
    );
  };

  const renderImage = () => {
    return (
      <View>
        <Image
          source={{uri: imageVoucher?.uri}}
          style={{
            marginTop: 20,
            width: '100%',
            height: 400,
          }}
        />
      </View>
    );
  };

  const transferAccounts = ({
    id_number,
    account_number,
    account_name,
    bank_name,
    account_type,
  }: any) => {
    return (
      <View style={styles.resume}>
        <View style={styles.containerResumeText}>
          <Typography style={styles.textWeigth}>
            {'Numero de identificación'}
          </Typography>
          <Typography translate={false}>{id_number}</Typography>
        </View>
        <View style={styles.containerResumeText}>
          <Typography style={styles.textWeigth}>
            {'Nombre de la cuenta'}
          </Typography>
          <Typography translate={false}>{account_name}</Typography>
        </View>
        <View style={styles.containerResumeText}>
          <Typography style={styles.textWeigth}>
            {'Numero de cuenta'}
          </Typography>
          <Typography translate={false}>{account_number}</Typography>
        </View>
        <View style={styles.containerResumeText}>
          <Typography style={styles.textWeigth}>
            {'Nombre del Banco'}
          </Typography>
          <Typography translate={false}>{bank_name}</Typography>
        </View>
        <View style={styles.containerResumeText}>
          <Typography style={styles.textWeigth}>{'Tipo de cuenta'}</Typography>
          <Typography translate={false}>{account_type}</Typography>
        </View>
      </View>
    );
  };

  const imageButtons = () => {
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={takePhoto}
          style={styles.button}>
          <Text style={styles.textButton}>Tomar foto</Text>
        </TouchableOpacity>
        <Text style={styles.textPlane}>- o -</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={takePhotoFromGallery}
          style={styles.button}>
          <Text style={styles.textButton}>Subir imagen</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!paymentMethod || paymentMethod.title === PAYMENT_METHODS.CASH)
    return null;

  if (paymentMethod.title === PAYMENT_METHODS.TRANSFER)
    return (
      <View style={styles.container}>
        <TitleSection title={'Cuentas para transferencia'} showChange={false} />
        <View style={styles.accounts}>
          {bankData?.map(bank => transferAccounts(bank))}
        </View>
        <TitleSection
          title={'Comprobante de transferencia'}
          showChange={false}
        />
        {imageButtons()}
        {imageVoucher ? (
          renderImage()
        ) : (
          <Image
            source={require('@/shared/assets/icons/placeholder-image.png')}
            style={styles.placeholderImage}
          />
        )}
      </View>
    );

  if (paymentMethod.title === PAYMENT_METHODS.MIX)
    return (
      <View style={styles.container}>
        <TitleSection title={'Cuentas para transferencia'} showChange={false} />
        <View style={styles.accounts}>
          {bankData?.map(bank => transferAccounts(bank))}
        </View>
        <View style={styles.sectionContainer}>
          <TitleSection title={'Monto en efectivo'} showChange={false} />
          <Input
            keyboardType="number-pad"
            placeholder="Cantidad en efectivo a pagar"
            onChangeText={value => setPending(value)}
          />
        </View>
        <View style={styles.sectionContainer}>
          <TitleSection
            title={'Comprobante de transferencia'}
            showChange={false}
          />
          {imageButtons()}
          {imageVoucher ? (
            renderImage()
          ) : (
            <Image
              source={require('@/shared/assets/icons/placeholder-image.png')}
              style={styles.placeholderImage}
            />
          )}
        </View>
      </View>
    );
};

export default FileUpdater;
