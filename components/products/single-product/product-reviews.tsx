import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { useState } from "react";

interface Review {
  id?: number | null;
  comment: string | null;
  rate: number | null;
  is_approved: number;
  createdBy: {
    firstName: string;
    lastName: string;
    id: number;
  };
}

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  const [sortBy, setSortBy] = useState("helpful");

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const sortReviews = (reviews: Review[]) => {
    switch (sortBy) {
      case "high":
        return [...reviews].sort((a, b) => (b.rate || 0) - (a.rate || 0));
      case "low":
        return [...reviews].sort((a, b) => (a.rate || 0) - (b.rate || 0));
      default:
        return reviews;
    }
  };

  const calculateRatingDistribution = (reviews: Review[]) => {
    const distribution = [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ];

    reviews.forEach((review) => {
      if (review.rate) {
        const index = 5 - review.rate;
        distribution[index].count++;
      }
    });

    const total = reviews.length;
    distribution.forEach((item) => {
      item.percentage = Math.round((item.count / total) * 100);
    });

    return distribution;
  };

  const getAverageRating = (reviews: Review[]) => {
    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rate || 0),
      0
    );
    return (total / reviews.length).toFixed(1);
  };

  const ratingDistribution = calculateRatingDistribution(reviews);
  const averageRating = getAverageRating(reviews);
  const sortedReviews = sortReviews(reviews);

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{averageRating}</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground">
                Based on {reviews.length} reviews
              </p>
            </div>
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div
                  key={item.stars}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-12">{item.stars} star</span>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="w-16 text-muted-foreground">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Reviews ({reviews.length})</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md px-3 py-1 text-sm"
        >
          <option value="high">Highest Rating</option>
          <option value="low">Lowest Rating</option>
        </select>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(
                      review.createdBy.firstName,
                      review.createdBy.lastName
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">
                          {review.createdBy.firstName}{" "}
                          {review.createdBy.lastName}
                        </h4>
                        {review.is_approved === 1 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (review.rate || 0)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  );
};

export default ProductReviews;
