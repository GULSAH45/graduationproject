import React, { useState } from "react";
import { View, Alert } from "react-native";
import CheckoutLayout from "@/components/payment/CheckoutLayout";
import StepIndicator from "@/components/payment/StepIndicator";
import AddressForm from "@/components/payment/AdressForm";
import ShippingOptions from "@/components/payment/ShippingOptions";
import PaymentForm from "@/components/payment/PaymentForm";
import OrderSummary from "@/components/payment/OrderSummary";
import { useNavigation } from "@react-navigation/native";

interface CheckoutData {
  address: any;
  shipping: string | null;
  payment: any;
}

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    address: null,
    shipping: null,
    payment: null,
  });

  const handleAddressSubmit = (data: any) => {
    setCheckoutData({ ...checkoutData, address: data });
    setCurrentStep(2);
  };

  const handleShippingSubmit = (option: string) => {
    setCheckoutData({ ...checkoutData, shipping: option });
    setCurrentStep(3);
  };

  const handlePaymentSubmit = (data: any) => {
    setCheckoutData({ ...checkoutData, payment: data });
    Alert.alert("Başarılı", "Siparişiniz alındı!", [
      { text: "Tamam", onPress: () => navigation.navigate("HomeTabs", { screen: "MainpageMainScreen" }) }
    ]);
  };

  return (
    <CheckoutLayout currentStep={currentStep} totalSteps={3}>
      <View className="space-y-6 p-4">
        {/* Step 1: Address */}
        <View>
          <StepIndicator
            stepNumber={1}
            title="Adres"
            isActive={currentStep === 1}
            isCompleted={currentStep > 1}
          />
          {currentStep === 1 && (
            <AddressForm onSubmit={handleAddressSubmit} />
          )}
          {currentStep > 1 && checkoutData.address && (
            <OrderSummary 
              address="Completed" // Simplified for now, passing data would be better
              email={checkoutData.address.email || "user@example.com"} // Mock or from store
            />
          )}
        </View>

        {/* Step 2: Shipping */}
        {currentStep >= 2 && (
          <View>
            <StepIndicator
              stepNumber={2}
              title="Kargo"
              isActive={currentStep === 2}
              isCompleted={currentStep > 2}
            />
            {currentStep === 2 && (
              <ShippingOptions onSubmit={handleShippingSubmit} />
            )}
            {currentStep > 2 && checkoutData.shipping && (
              <OrderSummary shipping={checkoutData.shipping} />
            )}
          </View>
        )}

        {/* Step 3: Payment */}
        {currentStep >= 3 && (
          <View>
            <StepIndicator
              stepNumber={3}
              title="Ödeme"
              isActive={currentStep === 3}
              isCompleted={false}
            />
            {currentStep === 3 && (
              <PaymentForm onSubmit={handlePaymentSubmit} />
            )}
          </View>
        )}
      </View>
    </CheckoutLayout>
  );
};

export default CheckoutScreen;
