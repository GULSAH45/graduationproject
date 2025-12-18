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
        
        if (response.status === 'success' && response.data) {
          setOrders(response.data);
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
      'in_cargo': 'Teslim Edildi',
      'processing': 'Hazırlanıyor',
      'pending': 'Onay Bekliyor',
      'cancelled': 'İptal Edildi'
    };
    return statusMap[status] || 'Bilinmiyor';
  };

  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      'delivered': 'text-green-600',
      'in_cargo': 'text-green-600',
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
              key={order.order_no || index} 
              className="bg-white border border-gray-300 rounded-lg p-4 mb-4"
            >
              {/* Status */}
              <Text className={`${getStatusColor(order.order_status)} font-semibold mb-2`}>
                {getStatusText(order.order_status)}
              </Text>

              {/* Product name or first item */}
              <Text className="text-black font-bold text-base mb-1">
                {order.cart_detail && order.cart_detail.length > 0 
                  ? order.cart_detail[0].name 
                  : 'Sipariş'}
              </Text>

              {/* Order date */}
              <Text className="text-gray-600 text-sm mb-1">
                {formatDate(order.created_at)} Tarihinde Sipariş Verildi
              </Text>

              {/* Order number */}
              <Text className="text-gray-600 text-sm mb-3">
                {order.order_no} numaralı sipariş
              </Text>

              {/* Detail button */}
              <TouchableOpacity
                className="border-2 border-black rounded-md py-2.5 px-4 self-start"
                onPress={() => {
                  // Navigate to order detail if screen exists
                  // navigation.navigate('OrderDetail', { orderNo: order.order_no });
                }}
              >
                <Text className="text-black font-semibold text-sm">
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