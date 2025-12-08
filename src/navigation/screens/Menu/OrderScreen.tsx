import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import PrevIcon from '@/svgs/PrevIcon';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/stores/useAuthStore';
import { getOrders } from '@/services/collections/Orders';
import type { Order } from '@/types/Order';

const OrderScreen = () => {
  const navigation = useNavigation();
  const { accessToken } = useAuthStore();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!accessToken) {
        setError('Siparişleri görüntülemek için giriş yapmalısınız.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getOrders(accessToken);
        
        if (response.data && response.data.results) {
          setOrders(response.data.results);
        } else {
          setOrders([]);
        }
      } catch (err: any) {
        console.error('Error fetching orders:', err);
        setError('Siparişler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'delivered': 'Teslim Edildi',
      'shipped': 'Kargoda',
      'processing': 'Hazırlanıyor',
      'pending': 'Onay Bekliyor',
      'cancelled': 'İptal Edildi'
    };
    return statusMap[status] || 'Bilinmiyor';
  };

  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      'delivered': 'text-green-600',
      'shipped': 'text-blue-600',
      'processing': 'text-yellow-600',
      'pending': 'text-gray-600',
      'cancelled': 'text-red-600'
    };
    return colorMap[status] || 'text-gray-600';
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center mx-2 mt-4 my-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeTabs", { screen: "MenuListScreen" })}
        >
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-black text-md font-semibold ml-2">
          Siparişlerim {orders.length > 0 && `(${orders.length})`}
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10B981" />
          <Text className="text-gray-500 mt-4">Siparişler yükleniyor...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-red-500 text-center">{error}</Text>
        </View>
      ) : orders.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-gray-500 text-center text-lg">
            Henüz siparişiniz bulunmamaktadır.
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4">
          {orders.map((order, index) => (
            <View 
              key={order.id || index} 
              className="bg-white border border-gray-200 rounded-lg p-4 mb-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              {/* Status */}
              <Text className={`${getStatusColor(order.status)} font-semibold mb-2`}>
                {getStatusText(order.status)}
              </Text>

              {/* Product name or first item */}
              <Text className="text-black font-bold text-base mb-1">
                {order.items && order.items.length > 0 
                  ? order.items[0].product_name 
                  : 'Sipariş'}
              </Text>

              {/* Order date */}
              <Text className="text-gray-600 text-sm mb-1">
                {formatDate(order.created_at)} Tarihinde Sipariş Verildi
              </Text>

              {/* Order number */}
              <Text className="text-gray-600 text-sm mb-3">
                {order.order_number} numaralı sipariş
              </Text>

              {/* Detail button */}
              <TouchableOpacity
                className="border-2 border-black rounded-md py-2 px-4 self-start"
                onPress={() => {
                  // Navigate to order detail if screen exists
                  // navigation.navigate('OrderDetail', { orderId: order.id });
                }}
              >
                <Text className="text-black font-semibold">
                  Detayı Görüntüle
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OrderScreen;