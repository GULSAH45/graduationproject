import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/stores/useAuthStore';

interface RequireAuthProps {
  children: React.ReactNode;
  message?: string;
}

/**
 * Higher-Order Component to protect screens that require authentication
 * Shows a login prompt if user is not authenticated
 */
export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  message = 'Bu sayfaya erişmek için giriş yapmalısınız.' 
}) => {
  const navigation = useNavigation();
  const { accessToken } = useAuthStore();

  React.useEffect(() => {
    if (!accessToken) {
      Alert.alert(
        'Giriş Gerekli',
        message,
        [
          { 
            text: 'İptal', 
            style: 'cancel',
            onPress: () => navigation.goBack()
          },
          { 
            text: 'Giriş Yap', 
            onPress: () => navigation.navigate('LogScreen' as never)
          }
        ]
      );
    }
  }, [accessToken]);

  if (!accessToken) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-gray-600 text-center text-lg mb-6">
          {message}
        </Text>
        <TouchableOpacity
          className="bg-black rounded-lg py-3 px-8"
          onPress={() => navigation.navigate('LogScreen' as never)}
        >
          <Text className="text-white font-semibold text-base">
            Giriş Yap
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
};

/**
 * HOC factory function to wrap screen components
 */
export const withRequireAuth = (
  Component: React.ComponentType<any>,
  message?: string
) => {
  return (props: any) => (
    <RequireAuth message={message}>
      <Component {...props} />
    </RequireAuth>
  );
};

export default RequireAuth;
