import {supabase} from './client';

export const getBankAccounts = async () => {
  return await supabase.from('bank_accounts').select('*');
};
