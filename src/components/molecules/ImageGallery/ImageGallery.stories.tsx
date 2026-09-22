import type { Meta, StoryObj } from "@storybook/react";

import { ImageGallery } from "./ImageGallery";

const meta = {
  title: "Molecules/ImageGallery",
  component: ImageGallery,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const makeImage = (label: string, color: string) =>
  `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='${color}'/%3E%3Ctext x='200' y='155' font-size='28' text-anchor='middle' fill='%23ffffff'%3E${label}%3C/text%3E%3C/svg%3E`;

const images = [
  { src: makeImage("リビング", "%239ca3af"), alt: "リビング" },
  { src: makeImage("キッチン", "%23f59e0b"), alt: "キッチン" },
  { src: makeImage("浴室", "%233b82f6"), alt: "浴室" },
];

export const Default: Story = {
  args: { images },
};

export const WithoutThumbnails: Story = {
  args: { images, showThumbnails: false },
};

export const Empty: Story = {
  args: { images: [] },
};
