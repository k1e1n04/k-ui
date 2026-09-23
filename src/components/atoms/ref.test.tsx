import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { ToggleSwitch } from "./ToggleSwitch";

describe("原子コンポーネントの ref 転送", () => {
  it("Input は input 要素へ ref を転送する", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("Textarea は textarea 要素へ ref を転送する", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("Select は select 要素へ ref を転送する", () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select ref={ref} options={[]} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it("Button は button 要素へ ref を転送する", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>送信</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("Checkbox は input 要素へ ref を転送する", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} checked={false} onChange={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("ToggleSwitch は input 要素へ ref を転送する", () => {
    const ref = createRef<HTMLInputElement>();
    render(<ToggleSwitch ref={ref} checked={false} onChange={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
