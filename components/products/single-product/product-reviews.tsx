import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    date: "2 weeks ago",
    title: "Excellent sound quality!",
    content:
      "These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is exactly as advertised. Highly recommend!",
    helpful: 24,
    notHelpful: 2,
    verified: true,
  },
  {
    id: 2,
    author: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    rating: 4,
    date: "1 month ago",
    title: "Great value for money",
    content:
      "Really impressed with the build quality and comfort. The only minor issue is that they can get a bit warm during long listening sessions.",
    helpful: 18,
    notHelpful: 1,
    verified: true,
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    rating: 5,
    date: "1 month ago",
    title: "Perfect for work from home",
    content:
      "The noise cancellation makes video calls so much clearer. My colleagues have commented on how clear my voice sounds too. Perfect for remote work!",
    helpful: 31,
    notHelpful: 0,
    verified: true,
  },
];

const ratingDistribution = [
  { stars: 5, count: 847, percentage: 68 },
  { stars: 4, count: 250, percentage: 20 },
  { stars: 3, count: 100, percentage: 8 },
  { stars: 2, count: 30, percentage: 2 },
  { stars: 1, count: 20, percentage: 2 },
];

const ProductReviews = () => {
  const [sortBy, setSortBy] = useState("helpful");

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
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground">Based on 1,247 reviews</p>
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
          <option value="helpful">Most Helpful</option>
          <option value="recent">Most Recent</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{review.author}</h4>
                        {review.verified && (
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
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">{review.title}</h5>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-sm text-muted-foreground">
                      Was this helpful?
                    </span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {review.helpful}
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <ThumbsDown className="w-3 h-3 mr-1" />
                        {review.notHelpful}
                      </Button>
                    </div>
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
