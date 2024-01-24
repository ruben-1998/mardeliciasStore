import useSWR, {mutate} from 'swr';
import {useUser} from '@supabase/auth-helpers-react';
import {Order} from '../DTO';
import {PostgrestError} from '@supabase/supabase-js';
import {getOrders} from '../helpers/services/orders';
import {StoreContext} from '@/context/context';
import React from 'react';

interface UserOrderProps {
  data: Order[] | null | undefined;
  isLoading: boolean;
  isValidating: boolean;
  error: PostgrestError | null;
}

const useOrders = (status: string): UserOrderProps => {
  const ENTITY = 'orders';
  const {user} = React.useContext(StoreContext);

  const response = useSWR(user?.id ? `/${ENTITY}` : null, () =>
    getOrders(user?.id),
  );

  return {
    ...response,
    data: response.data?.data?.filter(order => order.status === status),
  };
};

export default useOrders;
