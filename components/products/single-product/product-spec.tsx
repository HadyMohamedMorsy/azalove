import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const specifications = [
  {
    category: "Audio",
    specs: [
      { label: "Driver Size", value: "40mm dynamic drivers" },
      { label: "Frequency Response", value: "20Hz - 20kHz" },
      { label: "Impedance", value: "32 ohms" },
      { label: "Sensitivity", value: "103 dB SPL/mW" },
      { label: "Audio Codecs", value: "SBC, AAC, LDAC" },
    ],
  },
  {
    category: "Connectivity",
    specs: [
      { label: "Bluetooth Version", value: "5.2" },
      { label: "Wireless Range", value: "Up to 30 feet (10m)" },
      { label: "Wired Connection", value: "3.5mm audio cable included" },
      {
        label: "Multipoint Connection",
        value: "Connect to 2 devices simultaneously",
      },
    ],
  },
  {
    category: "Battery & Charging",
    specs: [
      { label: "Battery Life", value: "30 hours (ANC on), 40 hours (ANC off)" },
      { label: "Charging Time", value: "2 hours (full charge)" },
      { label: "Quick Charge", value: "5 minutes = 2 hours playback" },
      { label: "Charging Port", value: "USB-C" },
      { label: "Battery Type", value: "Lithium-ion" },
    ],
  },
  {
    category: "Physical",
    specs: [
      { label: "Weight", value: "250g (8.8 oz)" },
      { label: "Dimensions", value: "7.1 x 6.7 x 3.3 inches" },
      { label: "Foldable", value: "Yes, compact folding design" },
      { label: "Material", value: "Premium aluminum and leather" },
      { label: "Colors", value: "Black, White, Blue, Rose Gold" },
    ],
  },
  {
    category: "Features",
    specs: [
      {
        label: "Active Noise Cancellation",
        value: "Adaptive ANC with transparency mode",
      },
      {
        label: "Voice Assistant",
        value: "Compatible with Siri, Google Assistant",
      },
      { label: "Touch Controls", value: "Intuitive touch panel controls" },
      { label: "Microphone", value: "Dual-beam forming microphones" },
      { label: "Water Resistance", value: "IPX4 rated" },
    ],
  },
];

const ProductSpecs = () => {
  return (
    <div className="space-y-6">
      {specifications.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {category.specs.map((spec, specIndex) => (
                <div
                  key={specIndex}
                  className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-muted-foreground">{spec.label}</span>
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
