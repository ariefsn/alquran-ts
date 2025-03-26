import { TranslationType, VerseMode } from "./constant";
import { CHAPTERS } from "./data/typescript/chapter";
import { JUZS } from "./data/typescript/juz";
import { enMASAbdelHaleem } from "./data/typescript/translations/enMASAbdelHaleem";
import { frMontadaIslamicFoundation } from "./data/typescript/translations/frMontadaIslamicFoundation";
import { idIndonesianIslamicAffairsMinistry } from "./data/typescript/translations/idIndonesianIslamicAffairsMinistry";
import { trDarAlSalamCenter } from "./data/typescript/translations/trDarAlSalamCenter";
import { Verse, VerseTranslation } from "./data/typescript/types";
import { VERSES_IMLAEI } from "./data/typescript/verses/imlaei";
import { VERSES_INDOPAK } from "./data/typescript/verses/indopak";
import { VERSES_UTHMANI } from "./data/typescript/verses/uthmani";
import { VERSES_UTHMANITAJWEED } from "./data/typescript/verses/uthmaniTajweed";

export const isOutOfRange = (value: number, min: number, max: number): boolean => value < min || value > max;

export const isJuzOutOfRange = (value: number): boolean => isOutOfRange(value, 1, JUZS.length);

export const isChapterOutOfRange = (value: number): boolean => isOutOfRange(value, 1, CHAPTERS.length);

export const isVerseOutOfRange = (value: number): boolean => isOutOfRange(value, 1, VERSES_INDOPAK.length);

export const toArabicNumber = (num: number): string => ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '٨', '۹'][num];

export const getVerses = ({ mode = VerseMode.indopak }: { mode: VerseMode }): Verse[] => {
  return {
    [VerseMode.indopak]: VERSES_INDOPAK,
    [VerseMode.uthmani]: VERSES_UTHMANI,
    [VerseMode.uthmaniTajweed]: VERSES_UTHMANITAJWEED,
    [VerseMode.imlaei]: VERSES_IMLAEI
  }[mode];
}

export const getTranslations = ({ type = TranslationType.enMASAbdelHaleem }: { type: TranslationType }): VerseTranslation[] => {
  return {
    [TranslationType.enMASAbdelHaleem]: enMASAbdelHaleem,
    [TranslationType.idIndonesianIslamicAffairsMinistry]: idIndonesianIslamicAffairsMinistry,
    [TranslationType.frMontadaIslamicFoundation]: frMontadaIslamicFoundation,
    [TranslationType.trDarAlSalamCenter]: trDarAlSalamCenter
  }[type];
}