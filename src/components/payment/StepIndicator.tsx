import { View, Text, TouchableOpacity } from "react-native";

interface StepIndicatorProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepIndicator = ({ stepNumber, title, isActive, isCompleted }: StepIndicatorProps) => {
  return (
    <View className="flex-row items-center mb-4 gap-3">
      <View
        className={`w-8 h-8 rounded-full items-center justify-center ${
          isCompleted || isActive
            ? "bg-black"
            : "bg-gray-200"
        }`}
      >
        <Text className={`${isCompleted || isActive ? "text-white" : "text-gray-500"} font-medium`}>
          {isCompleted ? "✓" : stepNumber}
        </Text>
      </View>
      <Text className={`text-lg font-semibold ${isActive ? "text-black" : "text-gray-400"}`}>
        {title}
      </Text>
      {isCompleted && (
        <TouchableOpacity className="ml-auto">
          <Text className="text-sm text-blue-600">Düzenle</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StepIndicator;
