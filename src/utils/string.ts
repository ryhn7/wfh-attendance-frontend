// lib/string.ts
export const toPascalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
