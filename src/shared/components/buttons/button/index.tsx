import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {_styles} from './styles';
import Typography from '@/shared/components/typography';
import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {semantic} from '@/shared/constants/colors';
import Icon from '../../icon';
import {shippingCart} from '@/shared/assets/icons';
import {normalize} from '@/shared/helpers';

interface ButtonProps {
  disabled?: boolean | undefined;
  leftIcon?: React.ReactNode | undefined;
  title?: string | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  loading?: boolean | undefined;
  sm?: boolean;
  rightIcon?: any;
}
export default function Button({
  disabled,
  leftIcon,
  title = 'Done',
  onPress,
  loading,
  sm,
  rightIcon,
}: ButtonProps) {
  const styles = _styles(disabled, sm);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}>
      {leftIcon && leftIcon}
      {loading ? (
        <ActivityIndicator color={semantic.background.white.w500} />
      ) : (
        <View style={styles.textContainer}>
          <Typography style={styles.text}>{title}</Typography>
          {rightIcon && <Icon customStyles={styles.icon} icon={shippingCart} />}
        </View>
      )}
    </TouchableOpacity>
  );
}
