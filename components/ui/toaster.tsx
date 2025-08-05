"use client";

import {
  RomanticToast,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Heart, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  const getToastIcon = (variant?: string) => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />;
      case "romantic":
      default:
        return <Heart className="h-5 w-5 text-pink-600" />;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        const ToastComponent = variant === "romantic" ? RomanticToast : Toast;

        return (
          <ToastComponent key={id} variant={variant} {...props}>
            <div className="grid gap-1 flex-1">
              {title && (
                <ToastTitle>
                  {getToastIcon(variant)}
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </ToastComponent>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
