"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/use-translation";
import { Heart, MessageCircle, Send, Sparkles, Star } from "lucide-react";
import { useState } from "react";

interface ReviewFormProps {
  onSubmit: (review: { rate: number; comment: string }) => void;
  onCancel: () => void;
}

const ReviewForm = ({ onSubmit, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        rate: rating,
        comment: comment,
      });

      // Reset form
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return t("product.poor");
      case 2:
        return t("product.fair");
      case 3:
        return t("product.good");
      case 4:
        return t("product.veryGood");
      case 5:
        return t("product.excellent");
      default:
        return "";
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-cream-50 overflow-hidden">
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-azalove-100 to-azalove-200 rounded-full">
            <MessageCircle className="w-6 h-6 text-azalove-600" />
          </div>
          <CardTitle className="text-xl font-bold bg-amaranth-900 bg-clip-text text-transparent">
            {t("product.shareExperience")}
          </CardTitle>
        </div>
        <p className="text-muted-foreground mt-2">
          {t("product.helpOthersDiscover")}
        </p>
      </CardHeader>

      <CardContent className="relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-royal-700 flex items-center gap-2">
              <Star className="w-4 h-4 text-azalove-500" />
              {t("product.yourRating")} *
            </Label>

            <div className="p-6 bg-gradient-to-br from-azalove-50 to-azalove-100 rounded-2xl border border-azalove-200">
              <div className="flex items-center justify-center gap-3 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transform hover:scale-110 transition-all duration-200"
                  >
                    <Star
                      className={`w-10 h-10 transition-all duration-200 ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2bg-cream-100 rounded-full">
                    <Heart className="w-4 h-4 text-amaranth-500" />
                    <span className="font-semibold text-royal-700">
                      {getRatingText(rating)}
                    </span>
                    <Sparkles className="w-4 h-4 text-azalove-500" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Review Comment */}
          <div className="space-y-4">
            <Label
              htmlFor="comment"
              className="text-sm font-semibold text-royal-700 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-azalove-500" />
              {t("product.yourReview")} *
            </Label>

            <div className="relative">
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product... What did you love? What could be improved? Your honest feedback helps others make informed decisions."
                rows={6}
                required
                className="border-2 border-azalove-200 focus:border-azalove-400 focus:ring-azalove-200 rounded-xl resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {comment.length}/500
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-amaranth-900 hover:to-azalove-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("product.submitting")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t("product.submitReview")}
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="border-2 border-royal-200 hover:border-royal-300 hover:bg-royal-50 transition-all duration-300"
            >
              {t("product.cancel")}
            </Button>
          </div>

          {/* Tips */}
          <div className="p-4 bg-cream-100 rounded-xl border border-azalove-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-azalove-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-royal-700 mb-1">
                  {t("product.writingTips")}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t("product.beSpecific")}</li>
                  <li>• {t("product.mentionQuality")}</li>
                  <li>• {t("product.reviewWillHelp")}</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
