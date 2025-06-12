import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { ReactNode } from "react";

interface AddressCardProps {
  headerContent?: ReactNode;
  children: ReactNode;
}

export default function AddressCard({
  headerContent,
  children,
}: AddressCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Book
            </CardTitle>
            <CardDescription>
              Manage your shipping and billing addresses.
            </CardDescription>
          </div>
          {headerContent}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
