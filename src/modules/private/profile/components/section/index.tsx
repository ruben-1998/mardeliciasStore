import {TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Typography from '@/shared/components/typography';
import Icon from '@/shared/components/icon';
import {chevronLeft} from '@/shared/assets/icons';
import {normalize} from '@/shared/helpers';
import {styles} from './styles';
import useDarkMode from '@/shared/hooks/useDarkMode';
import {semantic} from '@/shared/constants/colors';

interface Element {
  name: string;
  description?: string;
  leftIcon: React.ReactNode;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

interface SectionProps {
  elements: Element[];
}

const Section: FC<SectionProps> = ({elements}) => {
  const {isDarkMode} = useDarkMode();
  const stylesIcon = {
    tintColor: isDarkMode ? semantic.background.white.w500 : semantic.text.grey,
  };
  return (
    <View
      style={{
        marginVertical: normalize(10),
        marginTop: normalize(16),
      }}>
      {elements.map((element, index) => (
        <TouchableOpacity
          key={index}
          style={styles.rowContainer}
          onPress={element?.onPress}
          activeOpacity={0.9}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {element.leftIcon}
            <View style={styles.descriptionContainer}>
              <Typography style={styles.name}>{element.name}</Typography>
              {element.description && (
                <Typography style={styles.detail}>
                  {element.description}
                </Typography>
              )}
            </View>
          </View>
          {element.rightElement ? (
            element.rightElement
          ) : (
            <Icon customStyles={stylesIcon} icon={chevronLeft} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Section;
