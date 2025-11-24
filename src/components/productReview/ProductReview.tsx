import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RatingSummary } from "./RatingSummary";
import { RatingBreakdown } from "./RatingBreakdown";
import { ReviewCard } from "./ReviewCard";
import { Pagination } from "./Pagination";

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  isVerified: boolean;
  aroma?: string;
}

interface ProductReviewProps {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
  reviewsPerPage?: number;
}

export const ProductReview = ({
  averageRating,
  totalReviews,
  ratingBreakdown,
  reviews,
  reviewsPerPage = 5,
}: ProductReviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Yorum yoksa mesaj göster
  if (totalReviews === 0 || reviews.length === 0) {
    return (
      <View className="w-full px-4 py-12">
        <View className="items-center justify-center py-16">
          <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
            <AntDesign name="message1" size={40} color="#9CA3AF" />
          </View>
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Yorum Bulunmamaktadır
          </Text>
          <Text className="text-sm text-gray-500 text-center px-8">
            Bu ürün için henüz yorum yapılmamış. İlk yorumu siz yapabilirsiniz!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="w-full px-4 py-8">
      <RatingSummary averageRating={averageRating} totalReviews={totalReviews} />
      
      <RatingBreakdown 
        breakdown={ratingBreakdown} 
        totalReviews={totalReviews} 
      />

      <View className="mt-8">
        <Text className="text-2xl font-bold mb-6 text-gray-900">YORUMLAR</Text>
        <View style={{ gap: 16 }}>
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </View>
    </View>
  );
};
