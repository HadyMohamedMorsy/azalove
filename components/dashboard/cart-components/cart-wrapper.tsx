import { ReactNode } from "react";

interface CartWrapperProps {
  header: ReactNode;
  children: ReactNode;
}

export default function CartWrapper({ header, children }: CartWrapperProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">{header}</div>
      <div>{children}</div>
    </div>
  );
}
