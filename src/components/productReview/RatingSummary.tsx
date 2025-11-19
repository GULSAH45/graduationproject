import { Star } from "lucide-react";

interface RatingSummaryProps {
  averageRating: number;
  totalReviews: number;
}

export const RatingSummary = ({ averageRating, totalReviews }: RatingSummaryProps) => {
  return (
    <div className="text-center mb-8">
      <div className="text-6xl font-bold mb-4 text-foreground">
        {averageRating.toFixed(1)}
      </div>
      <div className="flex justify-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="w-8 h-8 fill-star text-star"
          />
        ))}
      </div>
      <div className="text-lg text-muted-foreground">
        {totalReviews.toLocaleString()} YORUM
      </div>
    </div>
  );
};
