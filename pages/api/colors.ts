import { RGB, HSL } from './types/colors';
import type { NextApiRequest, NextApiResponse } from 'next'

/**
* generate a random color with RGB format
* @return   {Object}        RGB color
*/
const randomRGBColor = (): RGB => {
  const r: number = Math.floor(Math.random() * 256);
  const g: number = Math.floor(Math.random() * 256);
  const b: number = Math.floor(Math.random() * 256);
  return { r, g, b };
}

/**
* convert a RGB color to HSL format
* @param    {Number} r,     RGB red value
* @param    {Number} g,     RGB green value
* @param    {Number} b,     RGB blue value
* @return   {Object}        HSL color
*/
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


/**
 * @api {get} /api/colors Get random colors
 * @apiName GetRandomColors
 * @apiGroup Colors
 * @apiVersion 1.0.0
 * @apiDescription Get random colors for [count] times
 * @apiParam {Number} [count=5] Number of colors to generate
 * @apiSuccess {Object[]} data Array of colors
*/
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
