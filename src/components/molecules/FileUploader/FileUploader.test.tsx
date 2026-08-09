import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileUploader } from "./FileUploader";

const createFile = (name: string, type: string, size = 3) =>
  new File([new Uint8Array(size)], name, { type });

describe("FileUploader", () => {
  it("ファイル入力で有効なファイルを選択して通知する", async () => {
    const user = userEvent.setup();
    const onFilesSelected = vi.fn();
    render(
      <FileUploader
        accept="image/png"
        multiple
        onFilesSelected={onFilesSelected}
      />,
    );
    const file = createFile("sample.png", "image/png");
    await user.upload(
      screen.getByLabelText("ファイルを選択", { selector: "input" }),
      file,
    );

    expect(onFilesSelected).toHaveBeenCalledWith([file]);
    expect(screen.getByRole("status")).toHaveTextContent(
      "1件のファイルを選択しました",
    );
  });

  it("ドロップしたファイルを選択して通知する", () => {
    const onFilesSelected = vi.fn();
    render(<FileUploader onFilesSelected={onFilesSelected} />);
    const file = createFile("notes.txt", "text/plain");
    fireEvent.drop(screen.getByRole("button", { name: "ファイルを選択" }), {
      dataTransfer: { files: [file] },
    });
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
  });

  it("形式とサイズが不正なファイルを除外してエラーを公開する", async () => {
    const onFilesSelected = vi.fn();
    render(
      <FileUploader
        accept="image/png"
        maxSizeBytes={2}
        onFilesSelected={onFilesSelected}
      />,
    );
    fireEvent.change(
      screen.getByLabelText("ファイルを選択", { selector: "input" }),
      {
        target: { files: [createFile("large.jpg", "image/jpeg", 4)] },
      },
    );
    expect(onFilesSelected).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("large.jpg");
  });

  it("無効時はファイル選択とドロップを受け付けない", () => {
    const onFilesSelected = vi.fn();
    render(<FileUploader disabled onFilesSelected={onFilesSelected} />);
    const picker = screen.getByRole("button", { name: "ファイルを選択" });
    expect(picker).toBeDisabled();
    fireEvent.drop(picker, {
      dataTransfer: { files: [createFile("notes.txt", "text/plain")] },
    });
    expect(onFilesSelected).not.toHaveBeenCalled();
  });
});
