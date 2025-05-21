"use client";
import { Tab, Tabs } from "@heroui/tabs";

export default function TabsFormat() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="Hardcover" title="غلاف فني"></Tab>
        <Tab key="Kindle" title="أضرم"></Tab>
        <Tab key="videos" title="أشرطة الفيديو"></Tab>
      </Tabs>
    </div>
  );
}
