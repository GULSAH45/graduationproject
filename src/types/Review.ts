export interface CustomerReview {
    id: string;
    author: string;
    date: string;
    rating: number;
    title: string;
    content: string;
    isVerified: boolean;
}

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingBreakdown: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}
