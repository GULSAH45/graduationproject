import { Star } from "lucide-react";

interface ReviewCardProps {
  review: {
    id: string;
    author: string;
    date: string;
    rating: number;
    title: string;
    content: string;
    isVerified: boolean;
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="border-2 border-primary rounded-2xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 ${
                star <= review.rating
                  ? "fill-star text-star"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        {review.isVerified && (
          <span className="bg-verified text-accent-foreground px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap">
            DOĞRULANMIŞ MÜŞTERİ
          </span>
        )}
      </div>

      <div className="mb-3">
        <h3 className="font-bold text-lg text-foreground">{review.author}</h3>
        <p className="text-sm text-muted-foreground">{review.date}</p>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-2 text-foreground">{review.title}</h4>
        <p className="text-foreground leading-relaxed">{review.content}</p>
      </div>
    </div>
  );
};
