export type Multiplier =
  | 'YXOR'
  | 'ZXOR'
  | 'EXOR'
  | 'PXOR'
  | 'TXOR'
  | 'GXOR'
  | 'BXOR'
  | 'MXOR'
  | 'kXOR'
  | 'hXOR'
  | 'daXOR'
  | 'XOR'
  | 'dXOR'
  | 'cXOR'
  | 'mXOR'
  | 'µXOR'
  | 'nXOR'
  | 'pXOR'
  | 'fXOR'
  | 'aXOR'
  | 'zXOR'
  | 'yXOR';

const multipliers = {
  YXOR: Math.pow(10, 24),
  ZXOR: Math.pow(10, 21),
  EXOR: Math.pow(10, 18),
  PXOR: Math.pow(10, 15),
  TXOR: Math.pow(10, 12),
  GXOR: Math.pow(10, 9),
  BXOR: Math.pow(10, 9),
  MXOR: Math.pow(10, 6),
  kXOR: Math.pow(10, 3),
  hXOR: Math.pow(10, 2),
  daXOR: Math.pow(10, 1),
  XOR: Math.pow(10, 0),
  dXOR: Math.pow(10, -1),
  cXOR: Math.pow(10, -2),
  mXOR: Math.pow(10, -3),
  µXOR: Math.pow(10, -6),
  nXOR: Math.pow(10, -9),
  pXOR: Math.pow(10, -12),
  fXOR: Math.pow(10, -15),
  aXOR: Math.pow(10, -18),
  zXOR: Math.pow(10, -21),
  yXOR: Math.pow(10, -24),
};

export default multipliers;
