/**
 * Identifier casing for the Promise client generator.
 *
 * The committed Promise client's names (`MessagesListData`, `ApiKeys`, the `static apiKeys`
 * member) come from Hey API's `toCase`, whose rules for acronyms, digits, and a trailing `s`
 * after capitals are observable in public exports. This port keeps the same rules so the names
 * stay stable for consumers; only the PascalCase and camelCase targets are needed.
 */

export type Casing = "PascalCase" | "camelCase";

const uppercase = /[\p{Lu}]/u;
const lowercase = /[\p{Ll}]/u;
const separators = /[_.$+:\- `\\[\](){}\\/]+/;
const leadingSeparators = new RegExp(`^${separators.source}`);
const separatorsAndIdentifier = new RegExp(`${separators.source}([\\p{Alpha}\\p{N}_]|$)`, "gu");
const numbersAndIdentifier = /\d+([\p{Alpha}\p{N}_]|$)/gu;

const isSeparator = (character: string): boolean => separators.test(character);

// Inserts `-` at word boundaries of mixed-case input before the input is lowercased.
const splitWords = (input: string): string => {
  let value = input;
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;
  let isLastLastCharPreserved = false;
  for (let index = 0; index < value.length; index++) {
    const character = value.charAt(index);
    isLastLastCharPreserved = index > 2 ? value.charAt(index - 3) === "-" : true;
    let nextIndex = index + 1;
    let nextCharacter = value.charAt(nextIndex);
    while (nextCharacter !== "" && isSeparator(nextCharacter)) {
      nextIndex += 1;
      nextCharacter = value.charAt(nextIndex);
    }
    const isSeparatorBeforeNextCharacter = nextIndex !== index + 1;
    if (
      uppercase.test(character) &&
      (isLastCharLower ||
        (nextCharacter !== "" &&
          !isSeparatorBeforeNextCharacter &&
          nextCharacter !== "s" &&
          lowercase.test(nextCharacter)))
    ) {
      value = `${value.slice(0, index)}-${value.slice(index)}`;
      index++;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharLower = false;
      isLastCharUpper = true;
    } else if (
      isLastCharUpper &&
      isLastLastCharUpper &&
      lowercase.test(character) &&
      !isLastLastCharPreserved &&
      !(
        character === "s" &&
        (nextCharacter === "" || nextCharacter.toLocaleLowerCase() !== nextCharacter)
      )
    ) {
      value = `${value.slice(0, index - 1)}-${value.slice(index - 1)}`;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharLower = true;
      isLastCharUpper = false;
    } else {
      const characterLower = character.toLocaleLowerCase();
      const characterUpper = character.toLocaleUpperCase();
      isLastLastCharUpper = isLastCharUpper;
      isLastCharLower = characterLower === character && characterUpper !== character;
      isLastCharUpper = characterUpper === character && characterLower !== character;
    }
  }
  return value;
};

export const toCase = (input: string, casing: Casing): string => {
  let result = input.trim();
  if (result.length === 0) return result;
  if (result.length === 1) {
    if (isSeparator(result)) return "";
    return casing === "PascalCase" ? result.toLocaleUpperCase() : result.toLocaleLowerCase();
  }
  if (result !== result.toLocaleLowerCase()) result = splitWords(result);
  result = result.replace(leadingSeparators, "").toLocaleLowerCase();
  if (casing === "PascalCase") result = `${result.charAt(0).toLocaleUpperCase()}${result.slice(1)}`;
  const current = result;
  result = result.replaceAll(numbersAndIdentifier, (match: string, _: string, offset: number) =>
    ["_", "-", "."].includes(current.charAt(offset + match.length))
      ? match
      : match.toLocaleUpperCase(),
  );
  return result.replaceAll(separatorsAndIdentifier, (_: string, identifier: string) =>
    identifier.toLocaleUpperCase(),
  );
};

/** Hey API's `{{name}}Suffix` naming: the template is cased as a whole after substitution. */
export const withSuffix = (name: string, suffix: string): string =>
  toCase(`-${name}-${suffix}`, "PascalCase");
