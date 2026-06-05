import "react";

// The drag-to-fill image placeholder is a custom element defined in
// public/image-slot.js (loaded via next/script). Declare it for JSX/TS.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "image-slot": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        placeholder?: string;
        shape?: string;
        fit?: string;
      };
    }
  }
}
