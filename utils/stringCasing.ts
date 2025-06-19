export function toPascalCase(str: string) {
  return str.toLowerCase().replace(/(?:^|\s)(\w)/g, (_, c) => c.toUpperCase());
}

export function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");
}

export function toTitleCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first character
}
