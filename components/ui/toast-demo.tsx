"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Heart, Info, Sparkles } from "lucide-react";

export function ToastDemo() {
  const {
    toast,
    romanticToast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
  } = useToast();

  return (
    <div className="flex flex-wrap gap-4 p-6">
      <Button
        onClick={() => {
          romanticToast({
            title: "💕 Love is in the air!",
            description:
              "Your romantic message has been sent with love and care.",
          });
        }}
        className="bg-cream-100 hover:bg-cream-100 text-white"
      >
        <Heart className="mr-2 h-4 w-4" />
        Romantic Toast
      </Button>

      <Button
        onClick={() => {
          successToast({
            title: "Success!",
            description: "Your action was completed successfully.",
          });
        }}
        className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
      >
        <CheckCircle className="mr-2 h-4 w-4" />
        Success Toast
      </Button>

      <Button
        onClick={() => {
          errorToast({
            title: "Oops!",
            description: "Something went wrong. Please try again.",
          });
        }}
        className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
      >
        <AlertCircle className="mr-2 h-4 w-4" />
        Error Toast
      </Button>

      <Button
        onClick={() => {
          warningToast({
            title: "Warning",
            description: "Please be careful with this action.",
          });
        }}
        className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
      >
        <AlertCircle className="mr-2 h-4 w-4" />
        Warning Toast
      </Button>

      <Button
        onClick={() => {
          infoToast({
            title: "Information",
            description: "Here's some useful information for you.",
          });
        }}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
      >
        <Info className="mr-2 h-4 w-4" />
        Info Toast
      </Button>

      <Button
        onClick={() => {
          toast({
            title: "Default Toast",
            description: "This is a default toast message.",
          });
        }}
        className="bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Default Toast
      </Button>
    </div>
  );
}
