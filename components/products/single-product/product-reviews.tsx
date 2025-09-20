import ReviewForm from "@/components/form/review-from/review-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import {
  Award,
  Heart,
  MessageCircle,
  Plus,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import StructuredData from "../../seo/structured-data";

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

const ProductReviews = ({ reviews: initialReviews }: ProductReviewsProps) => {
  const [sortBy, setSortBy] = useState("helpful");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { toast } = useToast();
  const { user, redirectToLogin } = useAuth();
  const { t } = useTranslation();
  const params = useParams();

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

  const handleToggleReviewForm = () => {
    if (!user) {
      // Redirect to login with current page as return URL
      redirectToLogin();
      return;
    }
    setShowReviewForm(!showReviewForm);
  };

  const handleReviewSubmit = async (reviewData: {
    rate: number;
    comment: string;
  }) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a review.",
      });
      redirectToLogin();
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        "http://localhost:3001/api/v1/review/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": user.id,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rate: reviewData.rate,
            comment: reviewData.comment,
            slug: params.productslug,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      toast({
        title: "Review submitted successfully we will review it soon",
        description: "Thank you for your review!",
      });

      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
      });
    }
  };

  const handleReviewCancel = () => {
    setShowReviewForm(false);
  };

  const ratingDistribution = calculateRatingDistribution(reviews);
  const averageRating = getAverageRating(reviews);
  const sortedReviews = sortReviews(reviews);

  // Determine which reviews to display
  const displayReviews =
    reviews.length > 3 && !showAllReviews
      ? sortedReviews.slice(0, 3)
      : sortedReviews;

  // Generate structured data for reviews
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: params.productslug,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rate?.toString() || "0",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: `${review.createdBy.firstName} ${review.createdBy.lastName}`,
      },
      reviewBody: review.comment || "",
      datePublished: new Date().toISOString().split("T")[0],
    })),
  };

  return (
    <>
      {reviews.length > 0 && <StructuredData data={structuredData} />}
      <div className="space-y-8">
        {/* Header with Romantic Design */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-amaranth-500" />
            <h2 className="heading-section bg-amaranth-900 bg-clip-text text-transparent">
              {t("product.customerReviews")}
            </h2>
            <Sparkles className="w-6 h-6 text-azalove-500" />
          </div>
          <div className="w-24 h-1 bg-amaranth-900 mx-auto rounded-full"></div>
        </div>

        {/* Toggle Review Form Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleToggleReviewForm}
            variant={showReviewForm ? "outline" : "default"}
            className={`flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
              showReviewForm
                ? "border-amaranth-900 hover:border-amaranth-900 text-white border-0 shadow-lg hover:shadow-xl"
                : "bg-amaranth-900 hover:to-azalove-700 text-white border-0 shadow-lg hover:shadow-xl"
            }`}
          >
            {showReviewForm ? (
              <>
                <X className="w-4 h-4" />
                {t("product.hideReviewForm")}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                {t("product.writeReview")}
              </>
            )}
          </Button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-8">
            <ReviewForm
              onSubmit={handleReviewSubmit}
              onCancel={handleReviewCancel}
            />
          </div>
        )}

        {/* Rating Overview */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-cream-50 overflow-hidden">
          <CardHeader className="relative">
            <CardTitle className="text-xl font-bold bg-amaranth-900 bg-clip-text text-transparent flex items-center gap-2">
              <Award className="w-5 h-5 text-azalove-500" />
              {t("product.ratingOverview")}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Average Rating */}
              <div className="text-center p-6 bg-gradient-to-br from-azalove-50 to-azalove-100 rounded-2xl border border-azalove-200">
                <div className="text-5xl font-bold bg-amaranth-900 bg-clip-text text-transparent mb-3">
                  {averageRating}
                </div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground font-medium">
                  {t("product.basedOn")} {reviews.length}{" "}
                  {t("product.reviewsCount")}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div
                    key={item.stars}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-12 font-semibold text-royal-700">
                      {item.stars} {t("product.outOf")}
                    </span>
                    <div className="flex-1 relative">
                      <Progress
                        value={item.percentage}
                        className="h-3 bg-azalove-100"
                        style={
                          {
                            "--progress-background":
                              "linear-gradient(to right, #E6A238, #e1496e)",
                          } as React.CSSProperties
                        }
                      />
                    </div>
                    <span className="w-16 text-muted-foreground font-medium">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sort Options */}
        <div className="flex justify-between items-center p-4 bg-cream-100 rounded-xl border border-azalove-200">
          <h3 className="text-lg font-semibold text-royal-700 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-amaranth-900" />
            {t("product.customerReviews")} ({reviews.length})
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-azalove-200 rounded-lg px-4 py-2 text-sm bg-white focus:border-azalove-400 focus:outline-none transition-colors"
          >
            <option value="high">{t("product.highestRating")}</option>
            <option value="low">{t("product.lowestRating")}</option>
          </select>
        </div>

        {/* Review List */}
        <div className="space-y-6">
          {displayReviews.map((review, index) => (
            <Card
              key={review.id}
              className="border-0 shadow-lg bg-gradient-to-br from-white to-cream-50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-azalove-50/30 to-amaranth-50/30"></div>
              <CardContent className="p-6 relative">
                <div className="flex gap-4">
                  <Avatar className="w-12 h-12 border-2 border-azalove-200 shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-azalove-100 to-azalove-200 text-azalove-700 font-semibold">
                      {getInitials(
                        review.createdBy.firstName,
                        review.createdBy.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-royal-700">
                            {review.createdBy.firstName}{" "}
                            {review.createdBy.lastName}
                          </h4>
                          {review.is_approved === 1 && (
                            <span className="text-xs bg-cream-100 text-green-700 px-3 py-1 rounded-full font-medium border border-green-300">
                              {t("product.verifiedPurchase")}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
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
                          <span className="text-sm text-muted-foreground">
                            {review.rate} {t("product.outOf")} 5
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-azalove-100">
                      <p className="text-muted-foreground leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More/Less Button */}
        {reviews.length > 3 && (
          <div className="text-center pt-6">
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="flex items-center gap-2 mx-auto border-2 border-azalove-200 hover:border-azalove-300 hover:bg-azalove-50 transition-all duration-300 transform hover:scale-105"
            >
              {showAllReviews ? (
                <>{t("product.showLessReviews")}</>
              ) : (
                <>
                  {t("product.showAllReviews")} ({reviews.length})
                </>
              )}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💭</div>
            <h3 className="text-xl font-semibold text-royal-700 mb-2">
              {t("product.noReviewsYet")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("product.beFirstToShare")}
            </p>
            <Button
              onClick={handleToggleReviewForm}
              className="bg-amaranth-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("product.writeFirstReview")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReviews;
