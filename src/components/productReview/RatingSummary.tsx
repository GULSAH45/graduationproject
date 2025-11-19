import { View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface RatingSummaryProps {
  averageRating: number;
  totalReviews: number;
}

export const RatingSummary = ({ averageRating, totalReviews }: RatingSummaryProps) => {
  return (
    <View className="items-center mb-8">
      <Text className="font-bold mb-4 text-gray-900" style={{ fontSize: 48 }}>
        {averageRating.toFixed(1)}
      </Text>
      <View className="flex-row justify-center mb-3" style={{ gap: 4 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <AntDesign
            key={star}
            name="star"
            size={32}
            color={star <= Math.round(averageRating) ? "#FFD700" : "#E5E7EB"}
          />
        ))}
      </View>
      <Text className="text-lg text-gray-600">
        {totalReviews.toLocaleString()} YORUM
      </Text>
    </View>
  );
};
