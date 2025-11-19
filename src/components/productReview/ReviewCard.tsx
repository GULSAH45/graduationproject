import { View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ReviewCardProps {
  review: {
    id: string;
    author: string;
    date: string;
    rating: number;
    title: string;
    content: string;
    isVerified: boolean;
    aroma?: string;
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <View className="border-2 border-gray-300 rounded-2xl p-6 bg-white mb-4">
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-row gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <AntDesign
              key={star}
              name="star"
              size={24}
              color={star <= review.rating ? "#FFD700" : "#E5E7EB"}
            />
          ))}
        </View>
        {review.isVerified && (
          <View className="bg-green-100 px-4 py-1.5 rounded-full">
            <Text className="text-green-800 text-xs font-semibold">
              DOĞRULANMIŞ MÜŞTERİ
            </Text>
          </View>
        )}
      </View>

      <View className="mb-3">
        <Text className="font-bold text-lg text-gray-900">{review.author}</Text>
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <Text className="text-sm text-gray-600">{review.date}</Text>
          {review.aroma && (
            <>
              <Text className="text-sm text-gray-400">•</Text>
              <Text className="text-sm text-gray-600">{review.aroma}</Text>
            </>
          )}
        </View>
      </View>

      <View>
        <Text className="font-bold text-lg mb-2 text-gray-900">{review.title}</Text>
        <Text className="text-gray-900 leading-6">{review.content}</Text>
      </View>
    </View>
  );
};
