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
      <div className="space-y-2 mb-8">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = breakdown[rating as keyof typeof breakdown];
          const percentage = getRatingPercentage(count);
          
          return (
            <div key={rating} className="flex items-center gap-3">
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-rating-bar transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                ({count})
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  