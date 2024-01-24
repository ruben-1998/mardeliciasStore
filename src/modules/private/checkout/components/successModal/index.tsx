import React from 'react';
import {Modal, Text, View, useWindowDimensions} from 'react-native';
import {styles} from './styles';
import {normalize} from '@/shared/helpers';
import {Button} from '@/shared/components/buttons';
import Icon from '@/shared/components/icon';
import {check} from '@/shared/assets/icons';

interface SuccessModal {
  dispatch: boolean;
  handleOnSuccessOrder?: () => void;
}

const SuccessModal = ({
  dispatch = false,
  handleOnSuccessOrder = () => {},
}: SuccessModal) => {
  const {width, height} = useWindowDimensions();
  const modalWidth = width - 40;
  const modalHeight = height - 300;
  return (
    <Modal animationType="fade" transparent={true} visible={dispatch}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...styles.modalView,
            width: normalize(modalWidth),
            height: normalize(modalHeight),
          }}>
          <View style={styles.iconWrapper}>
            <Icon icon={check} customStyles={styles.icon} />
          </View>
          <Text style={styles.titleText}>Orden Creada</Text>
          <Text style={styles.descriptionText}>
            Tu orden ya se esta procesando!
          </Text>
          <Button title="Enviar" onPress={handleOnSuccessOrder} />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
