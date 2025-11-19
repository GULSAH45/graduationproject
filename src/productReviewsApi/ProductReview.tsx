import React, { useEffect, useState } from 'react';

interface Review {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductReviewProps {
  productSlug: string;
  baseUrl: string;
}

const ProductReview: React.FC<ProductReviewProps> = ({ productSlug, baseUrl }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${baseUrl}/products/${productSlug}/comments?limit=10&offset=0`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productSlug, baseUrl]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;
  if (reviews.length === 0) return <div>No reviews found.</div>;

  return (
    <div>
      <h2>Product Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {review.user.avatarUrl && (
                <img
                  src={review.user.avatarUrl}
                  alt={review.user.name}
                  style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
                />
              )}
              <strong>{review.user.name}</strong>
            </div>
            <div>Rating: {review.rating} / 5</div>
            <div>{review.comment}</div>
            <small>{new Date(review.createdAt).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductReview;