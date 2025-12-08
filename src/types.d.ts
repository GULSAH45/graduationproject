declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

// Re-export address types for global access
export type {
  Country,
  Region,
  Subregion,
  Address,
  AddressListResponse,
  CreateAddressRequest
} from './types/AddressTypes';
