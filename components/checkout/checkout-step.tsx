import { cn } from "@/lib/utils";
import React from "react";

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, name: "Cart Review" },
    { id: 2, name: "Shipping" },
    { id: 3, name: "Payment" },
    { id: 4, name: "Confirmation" },
  ];

  return (
    <div className="mt-4">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={cn(
                stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                "relative flex-1 flex"
              )}
            >
              {step.id < currentStep ? (
                <div className="flex flex-col items-start">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-checkout-primary">
                    <svg
                      className="h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="mt-2 text-sm font-medium text-checkout-primary">
                    {step.name}
                  </span>
                </div>
              ) : step.id === currentStep ? (
                <div className="flex flex-col items-start">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-checkout-primary text-checkout-primary font-semibold">
                    {step.id}
                  </span>
                  <span className="mt-2 text-sm font-medium text-checkout-primary">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-gray-300 text-gray-400">
                    {step.id}
                  </span>
                  <span className="mt-2 text-sm font-medium text-gray-400">
                    {step.name}
                  </span>
                </div>
              )}
              {stepIdx !== steps.length - 1 ? (
                <div
                  className={cn(
                    "hidden md:block absolute top-4 left-8 sm:left-20 w-full h-0.5",
                    step.id < currentStep
                      ? "bg-checkout-primary"
                      : "bg-gray-300"
                  )}
                />
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default CheckoutSteps;
