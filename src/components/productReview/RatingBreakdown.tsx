import { View, Text } from "react-native";

interface RatingBreakdownProps {
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalReviews: number;
}

export const RatingBreakdown = ({ breakdown, totalReviews }: RatingBreakdownProps) => {
  const getRatingPercentage = (count: number) => {
    return (count / totalReviews) * 100;
  };

  return (
    <View className="gap-2 mb-8">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = breakdown[rating as keyof typeof breakdown];
        const percentage = getRatingPercentage(count);
        
        return (
          <View key={rating} className="flex-row items-center gap-3">
            <View className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <View
                className="h-full bg-yellow-500"
                style={{ width: `${percentage}%` }}
              />
            </View>
            <Text className="text-sm text-gray-600 min-w-[60px] text-right">
              ({count})
            </Text>
          </View>
        );
      })}
    </View>
  );
};
