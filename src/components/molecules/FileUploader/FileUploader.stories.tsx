import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUploader } from "./FileUploader";

const meta = {
  title: "Molecules/FileUploader",
  component: FileUploader,
} satisfies Meta<typeof FileUploader>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    onFilesSelected: () => undefined,
  },
};

export const Images: StoryObj<typeof meta> = {
  args: {
    accept: "image/png,image/jpeg",
    multiple: true,
    maxSizeBytes: 5_000_000,
    onFilesSelected: () => undefined,
  },
};
