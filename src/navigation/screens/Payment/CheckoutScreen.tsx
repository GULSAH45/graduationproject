import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RequireAuth } from "@/components/RequireAuth";
import { OrderSummaryAccordion } from "@/components/payment/OrderSummaryAccordion";
import AddressForm from "@/components/payment/AdressForm";
import ShippingOptions from "@/components/payment/ShippingOptions";
import PaymentForm from "@/components/payment/PaymentForm";
import AntDesign from "@expo/vector-icons/AntDesign";
import PrevIcon from "@/svgs/PrevIcon";
import { useBasket } from "@/contexts/BasketContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { createOrder } from "@/services/collections/Orders";
import { getAddresses, Address } from "@/services/collections/Adresses";

interface CheckoutData {
  address: any;
  shipping: string | null;
  payment: any;
}

const CheckoutScreenContent = () => {
  const navigation = useNavigation();
  const { clearBasket } = useBasket();
  const { accessToken } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  
  // Accordion states
  const [openAccordions, setOpenAccordions] = useState({
    summary: true,
    address: false,
    shipping: false,
    payment: false,
  });

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    address: null,
    shipping: null,
    payment: null,
  });

  // Fetch saved addresses on mount
  useEffect(() => {
    const fetchSavedAddresses = async () => {
      if (!accessToken) return;
      
      setLoadingAddresses(true);
      try {
        const response = await getAddresses(accessToken);
        if (response.status === "success" && response.data.results.length > 0) {
          setSavedAddresses(response.data.results);
          // Automatically set the first address as selected
          setCheckoutData(prev => ({
            ...prev,
            address: response.data.results[0]
          }));
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchSavedAddresses();
  }, [accessToken]);

  const toggleAccordion = (key: keyof typeof openAccordions) => {
    // Validation: prevent opening shipping without address
    if (key === 'shipping' && !checkoutData.address) {
      Alert.alert("Uyarı", "Lütfen önce bir adres seçin.");
      return;
    }
    
    // Validation: prevent opening payment without shipping
    if (key === 'payment' && !checkoutData.shipping) {
      Alert.alert("Uyarı", "Lütfen önce kargo seçeneğini seçin.");
      return;
    }
    
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddressSubmit = (data: any) => {
    setCheckoutData({ ...checkoutData, address: data });
    // Close address, open shipping
    setOpenAccordions({ summary: false, address: false, shipping: true, payment: false });
  };

  const handleShippingSubmit = (option: string) => {
    setCheckoutData({ ...checkoutData, shipping: option });
    // Close shipping, open payment
    setOpenAccordions({ summary: false, address: false, shipping: false, payment: true });
  };

  const handlePaymentSubmit = async (data: any) => {
    if (isSubmitting) return; // Prevent double submission
    
    setCheckoutData({ ...checkoutData, payment: data });
    setIsSubmitting(true);
    
    try {
      if (!accessToken) {
        Alert.alert("Hata", "Lütfen giriş yapın.");
        setIsSubmitting(false);
        return;
      }

      // Create order via API
      const orderResponse = await createOrder(accessToken, {
        address_id: checkoutData.address?.id,
        payment_type: 'credit_cart',
        card_digits: data.cardNumber,
        card_expiration_date: `${data.expiryMonth}-${data.expiryYear}`,
        card_security_code: data.cvc,
        card_type: 'VISA'
      });

      console.log('Order created:', orderResponse);

      // Clear basket after successful order creation
      await clearBasket();
      console.log('Basket cleared after payment');
console.log('Order number:', orderResponse.data);
      // Navigate to OrderSuccessScreen with real order data
      navigation.navigate("OrderSuccessScreen", {
        orderData: {
          orderNumber: orderResponse.data.order_number,
          items: undefined,
          address: checkoutData.address,
          shipping: checkoutData.shipping || undefined,
        }
      });
    } catch (error: any) {
      console.error('Error creating order:', error);
      Alert.alert(
        "Sipariş Hatası", 
        error.response?.data?.message || "Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center bg-white px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PrevIcon />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-3">Satın Al / Ürün Detay</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Order Summary Accordion */}
        <OrderSummaryAccordion
          isOpen={openAccordions.summary}
          onToggle={() => toggleAccordion('summary')}
        />

        {/* Address Accordion */}
        <View className="bg-white rounded-lg border border-gray-200 mb-4">
          <TouchableOpacity
            onPress={() => toggleAccordion('address')}
            className="flex-row justify-between items-center p-4 border-b border-gray-200"
          >
            <View className="flex-row items-center">
              <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${checkoutData.address ? 'bg-green-500' : 'bg-gray-300'}`}>
                {checkoutData.address ? (
                  <AntDesign name="check" size={14} color="white" />
                ) : (
                  <Text className="text-white text-xs font-bold">1</Text>
                )}
              </View>
              <Text className="text-base font-semibold text-gray-900">Adres</Text>
            </View>
            <AntDesign name={openAccordions.address ? "up" : "down"} size={16} color="#666" />
          </TouchableOpacity>

          {openAccordions.address && (
            <View className="p-4">
              {savedAddresses.length > 0 ? (
                <View>
                  <Text className="text-sm font-semibold text-gray-700 mb-3">
                    Kayıtlı Adresleriniz:
                  </Text>
                  {savedAddresses.map((address, index) => (
                    <TouchableOpacity
                      key={address.id}
                      onPress={() => {
                        setSelectedAddressIndex(index);
                        setCheckoutData(prev => ({
                          ...prev,
                          address: savedAddresses[index]
                        }));
                      }}
                      className={`mb-3 p-3 rounded-lg border ${
                        selectedAddressIndex === index
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <View className="flex-row items-start">
                        <View className="mr-3 mt-1">
                          <View
                            className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                              selectedAddressIndex === index
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-400'
                            }`}
                          >
                            {selectedAddressIndex === index && (
                              <View className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </View>
                        </View>
                        <View className="flex-1">
                          <Text className="text-base font-semibold text-gray-900">
                            {address.title || 'Adres'}
                          </Text>
                          <Text className="text-sm font-medium text-gray-800 mt-1">
                            {address.first_name} {address.last_name}
                          </Text>
                          <Text className="text-sm text-gray-600 mt-1">
                            {address.phone_number}
                          </Text>
                          <Text className="text-sm text-gray-600 mt-1">
                            {address.full_address}
                          </Text>
                          <Text className="text-sm text-gray-500 mt-1">
                            {address.subregion.name}, {address.region.name}, {address.country.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => {
                      if (!checkoutData.address) {
                        Alert.alert("Uyarı", "Lütfen bir adres seçin.");
                        return;
                      }
                      setOpenAccordions({ summary: false, address: false, shipping: true, payment: false });
                    }}
                    className="bg-green-500 rounded-lg p-3 mt-2"
                  >
                    <Text className="text-white text-center font-semibold">Devam Et</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <AddressForm onSubmit={handleAddressSubmit} />
              )}
            </View>
          )}

          {checkoutData.address && !openAccordions.address && (
            <View className="p-4">
              <Text className="text-sm text-gray-600">
                {checkoutData.address.first_name || checkoutData.address.firstName} {checkoutData.address.last_name || checkoutData.address.lastName}
              </Text>
              <Text className="text-sm text-gray-600">
                {checkoutData.address.full_address || checkoutData.address.address}
              </Text>
            </View>
          )}
        </View>

        {/* Shipping Accordion */}
        <View className="bg-white rounded-lg border border-gray-200 mb-4">
          <TouchableOpacity
            onPress={() => toggleAccordion('shipping')}
            className="flex-row justify-between items-center p-4 border-b border-gray-200"
          >
            <View className="flex-row items-center">
              <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${checkoutData.shipping ? 'bg-green-500' : 'bg-gray-300'}`}>
                {checkoutData.shipping ? (
                  <AntDesign name="check" size={14} color="white" />
                ) : (
                  <Text className="text-white text-xs font-bold">2</Text>
                )}
              </View>
              <Text className="text-base font-semibold text-gray-900">Kargo</Text>
            </View>
            <AntDesign name={openAccordions.shipping ? "up" : "down"} size={16} color="#666" />
          </TouchableOpacity>

          {openAccordions.shipping && (
            <View className="p-4">
              <ShippingOptions onSubmit={handleShippingSubmit} />
            </View>
          )}

          {checkoutData.shipping && !openAccordions.shipping && (
            <View className="p-4">
              <Text className="text-sm text-gray-600">{checkoutData.shipping === 'free' ? 'Ücretsiz Kargo' : 'Hızlı Kargo'}</Text>
            </View>
          )}
        </View>

        {/* Payment Accordion */}
        <View className="bg-white rounded-lg border border-gray-200 mb-4">
          <TouchableOpacity
            onPress={() => toggleAccordion('payment')}
            className="flex-row justify-between items-center p-4 border-b border-gray-200"
          >
            <View className="flex-row items-center">
              <View className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${checkoutData.payment ? 'bg-green-500' : 'bg-gray-300'}`}>
                {checkoutData.payment ? (
                  <AntDesign name="check" size={14} color="white" />
                ) : (
                  <Text className="text-white text-xs font-bold">3</Text>
                )}
              </View>
              <Text className="text-base font-semibold text-gray-900">Ödeme</Text>
            </View>
            <AntDesign name={openAccordions.payment ? "up" : "down"} size={16} color="#666" />
          </TouchableOpacity>

          {openAccordions.payment && (
            <View className="p-4">
              <PaymentForm onSubmit={handlePaymentSubmit} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CheckoutScreen = () => {
  return (
    <RequireAuth message="Ödeme işlemi için giriş yapmalısınız.">
      <CheckoutScreenContent />
    </RequireAuth>
  );
};

export default CheckoutScreen;
