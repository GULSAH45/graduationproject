import { useState } from "react";
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
}

interface ReviewsSectionProps {
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

export const ReviewsSection = ({
  averageRating,
  totalReviews,
  ratingBreakdown,
  reviews,
  reviewsPerPage = 10,
}: ReviewsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <RatingSummary averageRating={averageRating} totalReviews={totalReviews} />
      
      <RatingBreakdown 
        breakdown={ratingBreakdown} 
        totalReviews={totalReviews} 
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">YORUMLAR</h2>
        <div className="space-y-4">
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};
