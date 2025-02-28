export const getLayoutImages = (layout, prevImages) => {
  const layouts = {
    layout1: [prevImages[0] || null],
    layout2: [prevImages[0] || null, prevImages[1] || null],
    layout3: [
      prevImages[0] || null,
      prevImages[1] || null,
      prevImages[2] || null,
    ],
    layout4: [
      prevImages[0] || null,
      prevImages[1] || null,
      prevImages[2] || null,
      prevImages[3] || null,
    ],
  };
  return layouts[layout] || prevImages;
};
