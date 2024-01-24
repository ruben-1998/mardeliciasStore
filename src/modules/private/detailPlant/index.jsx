import React from 'react';
import Wrapper from "@/shared/components/wrapper";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {_styles} from './styles'
import Header from "./components/header";
import useDarkMode from "@/shared/hooks/useDarkMode";
import Typography from "@/shared/components/typography";
import Icon from "@/shared/components/icon";
import {  shippingCart } from "@/shared/assets/icons";
import { currencyType } from "@/shared/constants/global";
import { Button } from "@/shared/components/buttons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StoreContext } from '@/context/context';
import CounterAdd from '@/shared/components/counterAdd';

export default function DetailPlant({route}) {
  const {navigate} = useNavigation()
  const {isDarkMode} = useDarkMode()
  const {product} = route.params;
  const styles = _styles(isDarkMode)
  const [quantity, setQuantity] = React.useState(1)
  const {handleAddItem} = React.useContext(StoreContext)

  const addToCart = () => {
    handleAddItem({...product, qty:quantity})
    navigate('shop')
  }
  
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Header title={product.name}/>
        <View style={styles.containerImage}>
          <Image resizeMode="contain" style={styles.image} source={{uri: product.imageUrl}} />
        </View>

        <View style={styles.containerName}>
          <Typography style={styles.name} translate={false}>{product.name}</Typography>
        </View>

        <View style={styles.containerDescription}>
          <Typography style={styles.descriptionTitle}>Descripción del producto</Typography>

          <Typography style={styles.description} translate={false}>
            {product.description}
          </Typography>
        </View>

        <View style={styles.containerName}>
          <Typography style={styles.quantity}>Cantidad</Typography>
          <CounterAdd product={{...product, qty:quantity}} setQuantity={setQuantity} />
        </View>

        <View style={styles.containerName}>
          <View style={{flex: 1}}>
            <Typography style={styles.price}>Precio</Typography>
            <Typography style={styles.total} translate={false}>{currencyType}{(product.price * quantity).toFixed(2)}</Typography>
          </View>
          <View style={{flex: 1}}>
            <Button onPress={addToCart} leftIcon={<Icon customStyles={{tintColor: 'white'}} icon={shippingCart} />} title="Agregar al carrito" />
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  )
}
