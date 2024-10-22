export const numberFormat = (x: any, currency = 'uzs') => {
  return `${x?.toLocaleString({ currency })} ${currency?.toUpperCase()}`
}
