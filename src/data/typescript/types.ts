export type TranslatedName = {
  name: string
  languageName: string
}

export type Translation = {
  id: number
  name: string
  authorName: string
  slug: string
  languageName: string
  translatedName: TranslatedName
}

export type Verse = {
  id: number
  verseKey: string
  text: string
  chapterID: number
  pageNumber: number
  juzNumber: number
}

export type VerseTranslation = {
  id: number
  resourceID: number
  text: string
  verseKey: string
  languageName: string
}

export type ChapterRevelationPlace = "makkah" | "madinah"

export type ChapterTranslatedName = {
  [key: string]: string
}

export type Chapter = {
  id: number
  bismillahPre: boolean
  nameArabic: string
  nameComplex: string
  nameSimple: string
  pages: number[]
  revelationOrder: number
  revelationPlace: ChapterRevelationPlace
  translatedName: ChapterTranslatedName
  versesCount: number
}

export type Map<T> = {
  [key: string]: T
}

export type JuzVerse = {
  first: number
  last: number
  count: number
  items: Map<String>
}

export type Juz = {
  id: number
  number: number
  verse: JuzVerse
}

export type Transliteration = {
  id: string
  text: string
}