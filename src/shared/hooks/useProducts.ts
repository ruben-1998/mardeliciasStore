import useSWR from 'swr';
import {ProductsStore} from '../DTO';
import {PostgrestError} from '@supabase/supabase-js';
import {getFavoritesProducts, getProducts} from '../helpers/services/products';

interface UseProductsProps {
  data: ProductsStore[] | null | undefined;
  isLoading: boolean;
  isValidating: boolean;
  error: PostgrestError | null;
  favoritesData: ProductsStore[] | null | undefined;
  isLoadingFavorites: boolean;
  isValidatingFavorites: boolean;
  favoritesError: PostgrestError | null;
}

const useProducts = (): UseProductsProps => {
  const ENTITY = 'products';

  const response = useSWR(`/${ENTITY}`, () => getProducts());
  const responseFavorites = useSWR(`/${ENTITY}/favorites`, () =>
    getFavoritesProducts(),
  );
  return {
    ...response,
    data: response.data?.data,
    isLoadingFavorites: responseFavorites.isLoading,
    favoritesData: responseFavorites.data?.data,
    isValidatingFavorites: responseFavorites.isValidating,
    favoritesError: responseFavorites.error,
  };
};

export default useProducts;
