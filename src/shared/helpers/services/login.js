import {USERS_TYPE_DEFINITIONS} from '@/shared/constants/global';
import {supabase} from './client';

export const signInWithEmail = async ({email, password}) => {
  return await supabase.auth.signInWithPassword({email, password});
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const createUser = async data => {
  let newPhone = data?.phone;
  if (data?.phone.charAt(0) === '0') {
    newPhone = data?.phone.substring(1);
  }
  return await supabase.auth.admin.createUser({
    email: data?.email,
    password: data?.password,
    phone: newPhone,
    email_confirm: true,
    user_metadata: {
      dni: data?.dni,
      first_name: data?.first_name,
      last_name: data?.last_name,
      city: data?.city,
      direction: data?.direction,
      direction_detail: data?.direction_detail,
      role: USERS_TYPE_DEFINITIONS.CLIENT,
      latitude: data?.latitude,
      longitude: data?.longitude,
    },
  });
};

export const updateUser = async (id, data) => {
  let newPhone = data?.phone;
  if (data?.phone.charAt(0) === '0') {
    newPhone = data?.phone.substring(1);
  }

  return await supabase.auth.admin.updateUserById(id, {
    email: data?.email,
    password: data?.password,
    phone: newPhone,
    email_confirm: true,
    user_metadata: {
      dni: data?.dni,
      first_name: data?.first_name,
      last_name: data?.last_name,
      city: data?.city,
      direction: data?.direction,
      direction_detail: data?.direction_detail,
      role: data?.role,
      latitude: data?.latitude,
      longitude: data?.longitude,
    },
  });
};

export const updateAddress = async (id, data) => {
  let newPhone = data?.phone;
  if (data?.phone.charAt(0) === '0') {
    newPhone = data?.phone.substring(1);
  }

  return await supabase.auth.admin.updateUserById(id, {
    email: data?.email,
    phone: newPhone,
    email_confirm: true,
    user_metadata: {
      dni: data?.dni,
      first_name: data?.first_name,
      last_name: data?.last_name,
      city: data?.city,
      direction: data?.direction,
      direction_detail: data?.direction_detail,
      role: data?.role,
      latitude: data?.latitude,
      longitude: data?.longitude,
    },
  });
};
