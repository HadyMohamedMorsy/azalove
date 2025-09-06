"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

import { COLORS, FONT_FAMILIES, TextStyle } from "./data/books-data";

interface TextStyleControlsProps {
  textType: "title" | "subtitle" | "description";
  label: string;
  style: TextStyle;
  onStyleChange: (property: keyof TextStyle, value: any) => void;
}

export default function TextStyleControls({
  textType,
  label,
  style,
  onStyleChange,
}: TextStyleControlsProps) {
  return (
    <div className="space-y-4 p-4 border border-azalove-200 rounded-lg bg-gradient-to-br from-cream-50 to-azalove-50">
      <h4 className="font-semibold text-sm text-royal-800">تنسيق {label}</h4>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-royal-700">نوع الخط</Label>
          <Select
            value={style.fontFamily}
            onValueChange={(value) => onStyleChange("fontFamily", value)}
          >
            <SelectTrigger className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-cream-50 border-azalove-200">
              {FONT_FAMILIES.map((font) => (
                <SelectItem
                  key={font.value}
                  value={font.value}
                  className="hover:bg-azalove-100"
                >
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-royal-700">حجم الخط</Label>
          <Input
            type="number"
            value={style.fontSize}
            onChange={(e) =>
              onStyleChange("fontSize", parseInt(e.target.value))
            }
            className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500"
            min="8"
            max="72"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs text-royal-700">لون النص</Label>
        <Select
          value={style.color}
          onValueChange={(value) => onStyleChange("color", value)}
        >
          <SelectTrigger className="h-8 text-xs border-azalove-200 focus:border-azalove-500 focus:ring-azalove-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-cream-50 border-azalove-200">
            {COLORS.map((color) => (
              <SelectItem
                key={color.value}
                value={color.value}
                className="hover:bg-azalove-100"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border border-azalove-200"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs text-royal-700">محاذاة النص</Label>
        <div className="flex gap-1 mt-1">
          <Button
            type="button"
            variant={style.textAlign === "left" ? "default" : "outline"}
            size="sm"
            onClick={() => onStyleChange("textAlign", "left")}
            className={`flex-1 h-8 ${
              style.textAlign === "left"
                ? "bg-royal-500 hover:bg-azalove-600 text-white border-azalove-500"
                : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
            }`}
          >
            <AlignLeft className="w-3 h-3" />
          </Button>
          <Button
            type="button"
            variant={style.textAlign === "center" ? "default" : "outline"}
            size="sm"
            onClick={() => onStyleChange("textAlign", "center")}
            className={`flex-1 h-8 ${
              style.textAlign === "center"
                ? "bg-royal-500 hover:bg-azalove-600 text-white border-azalove-500"
                : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
            }`}
          >
            <AlignCenter className="w-3 h-3" />
          </Button>
          <Button
            type="button"
            variant={style.textAlign === "right" ? "default" : "outline"}
            size="sm"
            onClick={() => onStyleChange("textAlign", "right")}
            className={`flex-1 h-8 ${
              style.textAlign === "right"
                ? "bg-royal-500 hover:bg-azalove-600 text-white border-azalove-500"
                : "border-azalove-200 text-royal-700 hover:bg-azalove-50"
            }`}
          >
            <AlignRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
