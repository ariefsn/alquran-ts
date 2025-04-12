import { AudioEdition, ErrorMessages, TranslationType, VerseMode } from "./constant"
import { CHAPTERS } from "./data/typescript/chapter"
import { JUZS } from "./data/typescript/juz"
import { TRANSLITERATIONS } from "./data/typescript/transliteration"
import { Chapter, Juz, Transliteration, Verse, VerseTranslation } from "./data/typescript/types"
import { VERSES_UTHMANI } from "./data/typescript/verses/uthmani"
import { getTranslations, getVerses, isChapterOutOfRange, isJuzOutOfRange, isVerseOutOfRange, toArabicNumber } from "./helper"

export * from './constant'
export * from './data/typescript/types'

export type VerseComplete = {
  verse: Verse
  translation: VerseTranslation
}

export type SearchResult = {
  chapters: Chapter[]
  verses: VerseComplete[]
}

export class AlQuran {
  static get basmallah(): string {
    return VERSES_UTHMANI[0].text;
  }

  static get totalJuz(): number {
    return JUZS.length;
  }

  static get totalChapter(): number {
    return CHAPTERS.length;
  }

  static get totalVerse(): number {
    return VERSES_UTHMANI.length;
  }

  static get totalMadaniSurah(): number {
    return CHAPTERS.filter(e => e.revelationPlace === 'madinah').length
  }

  static get totalMakkiSurah(): number {
    return CHAPTERS.filter(e => e.revelationPlace === 'makkah').length
  }

  static juz({ chapterNumber = 0, verseNumber = 0, juzNumber = 0 }: { chapterNumber?: number, verseNumber?: number, juzNumber?: number }): Juz {
    if (!chapterNumber && !verseNumber && !juzNumber) {
      throw new Error(ErrorMessages.juzChapterVerseIsRequired);
    }

    if (juzNumber) {
      if (isJuzOutOfRange(juzNumber)) {
        throw new Error(ErrorMessages.juzNumberOutOfRange);
      }

      return JUZS.find(e => e.number === juzNumber)!;
    }

    if (isChapterOutOfRange(chapterNumber)) {
      throw new Error(ErrorMessages.chapterNumberOutOfRange);
    }

    if (isVerseOutOfRange(verseNumber)) {
      throw new Error(ErrorMessages.verseNumberOutOfRange);
    }

    const verse = VERSES_UTHMANI.find(e => e.verseKey === `${chapterNumber}:${verseNumber}`);
    if (!verse) {
      throw new Error(ErrorMessages.verseKeyInvalid);
    }

    return JUZS.find(e => e.number === verse.juzNumber)!;
  }

  static chapter(chapterNumber: number): Chapter {
    if (isChapterOutOfRange(chapterNumber)) {
      throw new Error(ErrorMessages.chapterNumberOutOfRange);
    }

    return CHAPTERS.find(e => e.id === chapterNumber)!;
  }

  static verse(chapterNumber: number, verseNumber: number, mode: VerseMode = VerseMode.indopak): Verse {
    if (isChapterOutOfRange(chapterNumber)) {
      throw new Error(ErrorMessages.chapterNumberOutOfRange);
    }

    if (isVerseOutOfRange(verseNumber)) {
      throw new Error(ErrorMessages.verseNumberOutOfRange);
    }

    const verses = getVerses({ mode });

    return verses.find(e => e.verseKey === `${chapterNumber}:${verseNumber}`)!;
  }

  static verseByJuz(juzNumber: number, mode: VerseMode = VerseMode.indopak): Verse[] {
    if (isJuzOutOfRange(juzNumber)) {
      throw new Error(ErrorMessages.juzNumberOutOfRange);
    }

    const verses = getVerses({ mode });

    return verses.filter(e => e.juzNumber === juzNumber);
  }

  static verseByChapter(chapterNumber: number, mode: VerseMode = VerseMode.indopak): Verse[] {
    if (isChapterOutOfRange(chapterNumber)) {
      throw new Error(ErrorMessages.chapterNumberOutOfRange);
    }

    const verses = getVerses({ mode });

    return verses.filter(e => e.chapterID === chapterNumber);
  }

  static translation(type: TranslationType, verseKey: string): VerseTranslation {
    const translation = getTranslations({ type });
    const transFound = translation.find(e => e.verseKey === verseKey);

    if (!transFound) {
      throw new Error(ErrorMessages.verseKeyInvalid);
    }

    return transFound;
  }

  static arabicNumber(number: number): string {
    const numberStr = number.toString();
    return numberStr.split('').map(e => toArabicNumber(parseInt(e))).join('');
  }

  static audioURLByChapter(chapterNumber: number, edition: AudioEdition = AudioEdition.arAlafasy): string {
    if (isChapterOutOfRange(chapterNumber)) {
      throw new Error(ErrorMessages.chapterNumberOutOfRange);
    }

    return `https://cdn.islamic.network/quran/audio-surah/128/${edition}/${chapterNumber}.mp3`;
  }

  static audioURLByVerse(verseNumber: number, edition: AudioEdition = AudioEdition.arAlafasy): string {
    if (isVerseOutOfRange(verseNumber)) {
      throw new Error(ErrorMessages.verseNumberOutOfRange);
    }

    return `https://cdn.islamic.network/quran/audio/128/${edition}/${verseNumber}.mp3`;
  }

  static imageURLByVerse(verseKey: string, isHighQuality: boolean = false): string {
    const verseID = verseKey.replace(':', '_');

    if (isHighQuality) {
      return `https://cdn.islamic.network/quran/images/high-resolution/${verseID}.png`
    }

    return `https://cdn.islamic.network/quran/images/${verseID}.png`;
  }

  static randomVerse(mode: VerseMode = VerseMode.indopak, type: TranslationType = TranslationType.enMASAbdelHaleem): VerseComplete {
    const verses = getVerses({ mode });
    const trans = getTranslations({ type });
    const nextIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[nextIndex];
    const translation = trans.find(e => e.verseKey === verse.verseKey)!;

    return {
      verse,
      translation
    }
  }

  static search(keyword: string, type: TranslationType, verseMode: VerseMode = VerseMode.indopak): SearchResult {
    const keywordLower = keyword.toLowerCase();
    const verses = getVerses({ mode: verseMode });
    const trans = getTranslations({ type });
    const languageCode = type.substring(0, 2);

    const chapterFound = CHAPTERS.filter(e => {
      const names = [
        e.nameArabic,
        e.nameSimple.toLowerCase(),
        e.nameComplex.toLowerCase(),
        e.nameSimple.toLowerCase().replace('-', ''),
      ].some(e => e.includes(keywordLower));

      const translated = e.translatedName[languageCode]?.toLowerCase().includes(keywordLower);

      return names || translated;
    });

    const transFound = trans.filter(e => e.text.toLowerCase().includes(keywordLower));

    return {
      chapters: chapterFound,
      verses: transFound.map(e => ({
        verse: verses.find(v => v.verseKey === e.verseKey)!,
        translation: e
      }))
    }
  }

  static transliteration(verseKey: string): Transliteration {
    const trans = TRANSLITERATIONS.find(e => e.id === verseKey);

    if (!trans) {
      throw new Error(ErrorMessages.verseKeyInvalid);
    }

    return trans
  }
}
