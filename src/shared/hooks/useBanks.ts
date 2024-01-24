import useSWR from 'swr';
import {ProductsStore} from '../DTO';
import {PostgrestError} from '@supabase/supabase-js';
import {getBankAccounts} from '../helpers/services/bank_accounts';

interface UseBanksProps {
  data: any[] | null | undefined;
  isLoading: boolean;
  isValidating: boolean;
  error: PostgrestError | null;
}

const useBanks = (): UseBanksProps => {
  const ENTITY = 'bank_accounts';

  const response = useSWR(`/${ENTITY}`, () => getBankAccounts());
  return {
    ...response,
    data: response.data?.data,
  };
};

export default useBanks;
