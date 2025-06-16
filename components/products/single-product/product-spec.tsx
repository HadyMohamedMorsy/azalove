import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Specification {
  label: string;
  value: string;
}

interface SpecificationCategory {
  id: number;
  title: string;
  attributes: {
    name: string;
    value: string;
  }[];
}

interface ProductSpecsProps {
  specifications: SpecificationCategory[];
}

const ProductSpecs = ({ specifications }: ProductSpecsProps) => {
  return (
    <div className="space-y-6">
      {specifications.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {category.attributes.map((spec, specIndex) => (
                <div
                  key={specIndex}
                  className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-muted-foreground">{spec.name}</span>
                  <span className="font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductSpecs;
