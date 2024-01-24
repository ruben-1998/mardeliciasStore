import React, {useEffect, useRef} from 'react';
import {Animated, Image, Platform, ScrollView, View} from 'react-native';
import OverlayLoader from '@/shared/components/overlayLoader';
import CustomStatusBar from '@/shared/components/customStatusBar';
import {StatusBarStyle} from 'react-native/Libraries/Components/StatusBar/StatusBar';
import {normalize} from '@/shared/helpers';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {semantic} from '@/shared/constants/colors';
import {styles} from '../titleAuth/styles';

interface WrapperProps {
  children: React.ReactNode;
  backgroundColorStatusBar?: string;
  barStyle?: StatusBarStyle;
  loading?: boolean;
  titleLoader?: string;
  isCentered?: boolean;
  isDark?: boolean;
}
export default function Wrapper({
  children,
  backgroundColorStatusBar,
  barStyle,
  loading,
  titleLoader,
  isCentered = false,
  isDark = false,
}: WrapperProps) {
  const animationScale = useRef(new Animated.Value(1)).current;

  const backgroundColor = isDark ? '#F5F5F5' : 'white';

  useEffect(() => {
    let animation: any;

    if (loading) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animationScale, {
            toValue: 1.2, // El círculo se expande a 1.5 veces su tamaño
            duration: 1000, // Duración de la expansión
            useNativeDriver: true,
          }),
          Animated.timing(animationScale, {
            toValue: 1, // El círculo vuelve a su tamaño original
            duration: 500, // Duración de la contracción
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
    return () => {
      if (animation) {
        animation.stop(); // Detiene la animación cuando el componente se desmonta o isLoading cambia
      }
    };
  }, [loading, animationScale]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
      }}>
      <OverlayLoader loading={loading} title={titleLoader}>
        <Animated.View
          style={[
            styles.logoContainer,
            {transform: [{scale: animationScale}]},
          ]}>
          <Image
            source={require('@/shared/assets/icons/mardelicias.png')}
            style={styles.logoLoader}
          />
        </Animated.View>
      </OverlayLoader>
      <CustomStatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColorStatusBar}
      />
      <View style={{height: normalize(32)}} />
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      {Platform.OS === 'ios' && <View style={{height: normalize(20)}} />}
    </View>
  );
}
