import {storage} from '@/shared/helpers';
import React, {createContext} from 'react';
import {ToastAndroid} from 'react-native';
import {createOrder, uploadFile} from '@/shared/helpers/services/orders';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {PAYMENT_METHODS} from '@/shared/constants/global';
import {v4 as uuidv4} from 'uuid';
import {mutate} from 'swr';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [orders, setOrders] = React.useState([]);
  const [showLoader, setShowLoader] = React.useState(false);
  const [user, setUser] = React.useState(undefined);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [pending, setPending] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [orderCreated, setOrderCreated] = React.useState(false);
  const [imageVoucher, setImageVoucher] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [coords, setCoords] = React.useState({});

  const getLocalUser = async () => {
    const user = await storage.get('user');
    const localCart = await storage.get('cart');
    setCart(localCart);
    setUser(user);
  };

  const setLocalUser = async newUser => {
    await storage.create('user', newUser);
  };

  const getTotal = () => {
    let newTotal = 0;
    if (cart && cart?.length > 0) {
      cart.forEach(currentItem => {
        newTotal = newTotal + currentItem.qty * currentItem.price;
      });
    }

    setTotal(newTotal);
  };

  const updateLocalCart = async () => {
    await storage.create('cart', cart);
  };

  const handleAddItem = item => {
    if (!item) return;

    let newCart = [...cart];
    const itemExist = cart.find(currentItem => currentItem.id === item.id);

    if (itemExist) {
      newCart = cart.map(currentItem => {
        if (currentItem.id === item.id) {
          return {
            ...currentItem,
            qty: currentItem.qty + item.qty,
          };
        }
        return currentItem;
      });
    }

    if (!itemExist) {
      newCart = [item, ...newCart];
    }

    ToastAndroid.show('Producto añadido con exito!', ToastAndroid.SHORT);
    Toast.show({
      type: 'success',
      text1: 'Producto añadido con exito!',
    });
    setCart(newCart);
    getTotal();
  };

  const handleRemoveItem = item => {
    if (!item) return;

    let newCart = [...cart];
    newCart = cart.filter(currentItem => currentItem.id !== item.id);
    setCart(newCart);
    getTotal();
  };

  const handleClearCart = () => {
    setCart([]);
    getTotal();
  };

  const handleIncrementItem = item => {
    if (!item) return;

    let newItems = [...cart];
    newItems = cart.map(currentItem => {
      if (currentItem.id === item.id) {
        return {
          ...currentItem,
          qty: currentItem.qty + 1,
        };
      }

      return currentItem;
    });

    setCart(newItems);
    getTotal();
  };

  const handleDecrementItem = item => {
    if (!item) return;

    let newItems = [...cart];
    newItems = cart.map(currentItem => {
      if (currentItem.id === item.id) {
        return {
          ...currentItem,
          qty: currentItem.qty - 1,
        };
      }
      return currentItem;
    });

    setCart(newItems);
    getTotal();
  };

  const resetCart = () => {
    setCart([]);
    setTotal(0);
    setPending(0);
    setPaymentMethod(null);
    setImageVoucher(null);
  };

  const handleSubmitOrder = async () => {
    if (!paymentMethod) {
      ToastAndroid.show(
        'Debe seleccionar el metodo de pago',
        ToastAndroid.SHORT,
      );
      Toast.show({
        type: 'error',
        text1: 'Debe seleccionar el metodo de pago',
      });
      return;
    }

    if (
      (paymentMethod.title === PAYMENT_METHODS.TRANSFER ||
        paymentMethod.title === PAYMENT_METHODS.MIX) &&
      !imageVoucher
    ) {
      ToastAndroid.show(
        'Debe agregar el comprobante de pago',
        ToastAndroid.SHORT,
      );
      Toast.show({
        type: 'error',
        text1: 'Debe agregar el comprobante de pago',
      });
      return;
    }

    if (
      paymentMethod.title === PAYMENT_METHODS.MIX &&
      (!pending || pending === 0)
    ) {
      ToastAndroid.show(
        'Debe agregar el monto a pagar en efectivo',
        ToastAndroid.SHORT,
      );
      Toast.show({
        type: 'error',
        text1: 'Debe agregar el monto a pagar en efectivo',
      });
      return;
    }
    setIsLoading(true);
    let imagePath = '';
    if (
      paymentMethod.title === PAYMENT_METHODS.TRANSFER ||
      paymentMethod.title === PAYMENT_METHODS.MIX
    ) {
      const imageName = uuidv4();
      const formData = new FormData();
      formData.append('file', {
        uri: imageVoucher.uri,
        name: `${imageName}-${imageVoucher.fileName}`,
        type: imageVoucher.type,
      });
      const {data: imageData, error: imageError} = await uploadFile(
        imageName,
        formData,
      );
      imagePath = imageData?.path;

      if (imageError) {
        console.log('Falla aqui');
        ToastAndroid.show(
          'La orden no ha podido ser procesada',
          ToastAndroid.SHORT,
        );
        Toast.show({
          type: 'error',
          text1: 'La orden no ha podido ser procesada',
        });
        return;
      }
    }

    console.log(user?.user_metadata);

    let order = {
      products: cart,
      user_id: user.id,
      payment_method: paymentMethod.title,
      payment_pending: pending,
      total,
      voucher_url: imagePath ?? '',
      status: 'procesando',
      latitude: user?.user_metadata?.latitude,
      longitude: user?.user_metadata?.longitude,
    };

    const {error, data} = await createOrder(order);

    if (error) {
      console.log('Falla aqui 2', error);
      ToastAndroid.show(
        'La orden no ha podido ser procesada',
        ToastAndroid.SHORT,
      );
      Toast.show({type: 'error', text1: 'La orden no ha podido ser procesada'});
      return;
    }

    mutate('/orders');
    setOrderCreated(true);
    setIsLoading(false);
    resetCart();
  };

  React.useEffect(() => {
    getLocalUser();
  }, []);

  React.useEffect(() => {
    updateLocalCart();
    getTotal();
  }, [cart]);

  return (
    <StoreContext.Provider
      value={{
        total,
        orders,
        setOrders,
        showLoader,
        setShowLoader,
        user,
        setUser,
        cart,
        setCart,
        paymentMethod,
        setPaymentMethod: paymentMethod => setPaymentMethod(paymentMethod),
        pending,
        setPending: pending => setPending(pending),
        isLoading,
        setIsLoading: isLoading => setIsLoading(isLoading),
        orderCreated,
        setOrderCreated: orderCreated => setOrderCreated(orderCreated),
        imageVoucher,
        setImageVoucher: imageVoucher => setImageVoucher(imageVoucher),
        handleAddItem: item => handleAddItem(item),
        handleRemoveItem: item => handleRemoveItem(item),
        handleIncrementItem: item => handleIncrementItem(item),
        handleDecrementItem: item => handleDecrementItem(item),
        handleClearCart: () => handleClearCart(),
        handleSubmitOrder: () => handleSubmitOrder(),
      }}>
      {children}
    </StoreContext.Provider>
  );
};
