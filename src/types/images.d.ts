// src/types/images.d.ts

type StaticImageData = import('next/image').StaticImageData;

declare module '*.png' {
  const content: StaticImageData;
  export default content;
}

declare module '*.jpg' {
  const content: StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  const content: StaticImageData;
  export default content;
}

declare module '*.svg' {
  const content: StaticImageData;
  export default content;
}