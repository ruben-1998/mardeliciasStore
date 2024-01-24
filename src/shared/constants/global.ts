export const currencyType = '$';
export const activeOpacity = 0.8;

export const USERS_TYPE_DEFINITIONS = {
  CLIENT: 'cliente',
};

export const ORDER_STATUS_DEFINITIONS = {
  PROCESSING: 'procesando',
  DISPATCH: 'enviado',
  DELIVERED: 'entregado',
};

export const PAYMENT_METHODS = {
  TRANSFER: 'Transferencia',
  CASH: 'Efectivo',
  MIX: 'Mixto',
};

export const TAB_LIST = [
  {
    id: ORDER_STATUS_DEFINITIONS.PROCESSING,
    name: 'orders.processing',
    active: true,
  },
  {
    id: ORDER_STATUS_DEFINITIONS.DISPATCH,
    name: 'orders.progress',
    active: false,
  },
  {
    id: ORDER_STATUS_DEFINITIONS.DELIVERED,
    name: 'orders.success',
    active: false,
  },
];

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const dniRegExp = /^\d{10}$/;
