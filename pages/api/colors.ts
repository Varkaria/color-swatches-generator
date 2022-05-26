import { RGB, HSL } from './types/colors';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const randomRGBColor = (): RGB => {
  const r: number = Math.floor(Math.random() * 256);
  const g: number = Math.floor(Math.random() * 256);
  const b: number = Math.floor(Math.random() * 256);
  return { r, g, b };
}

const convertRGBtoHSL = (r: number, g: number, b: number): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l: number = Math.max(r, g, b);
  const s: number = l - Math.min(r, g, b);
  const h: number = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return {
    h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    l: (100 * (2 * l - s)) / 2,
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const count = Number(req.query.count) || 5;
  const data = []

  for (let i = 0; i < count; i++) {
    const { r, g, b } = randomRGBColor();
    const { h, s, l } = convertRGBtoHSL(r, g, b);
    data.push({
      hsl: { h, s, l },
      rgb: { r, g, b },
    })
  }
  
  res.status(200).json({ data });
}
