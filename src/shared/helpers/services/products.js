import {supabase} from './client';

export const getProducts = async () => {
  return await supabase.from('products').select('*');
};

export const getFavoritesProducts = async () => {
  return await supabase.from('products').select('*').eq('is_favorite', true);
};
