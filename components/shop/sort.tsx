import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

const SortProducts = () => {
  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="الترتيب" />
      </SelectTrigger>
      <SelectContent>
        {animals.map((animal) => (
          <SelectItem key={animal.key} value={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortProducts;
