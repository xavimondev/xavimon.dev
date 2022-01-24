const WORDS_PER_MINUTE:number = 200;

export function getReadingTime(content) : number {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
  const numberOfWords = clean.split(/\s/g).length;
  return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}