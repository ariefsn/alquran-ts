# Al Furqan

> Al Quran verses, translations, transliterations, juzs and chapters. Offline 🎉.

## Features

- Offline 🚀. Use it locally, not need to fetch from internet.
- Multiple verse text mode available
  - indopak
  - uthmani
  - uthmani tajweed
  - imlaei
- Chapter translated names (🇮🇩, 🇬🇧, 🇸🇦, 🇹🇷, 🇫🇷)
- Chapter revelations
- Verse translations
  - 🇮🇩: Indonesian Islamic Affairs Ministry
  - 🇬🇧: MAS Abdel Haleem
  - 🇹🇷: Dar Al-Salam Center
  - 🇫🇷: Montada Islamic Foundation
- Generate URL for Audio and Image. Based on [Islamic Network](https://islamic.network).
- Generate Random Verse
- Search Chapters or Verses
- Verses by Juz or Chapter
- Transliteration

## Install

Add `alfurqan` as a dependency.

  ```bash
  yarn add alfurqan

  # or

  npm i alfurqan
  ```

### Usage

- Basmallah

  ```ts
  const basmallah = AlQuran.basmallah;
  console.log(basmallah); // بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
  ```

- Total Juz

  ```ts
  const totalJuz = AlQuran.totalJuz;
  console.log(totalJuz); // 30
  ```

- Total Chapter

  ```ts
  const totalChapter = AlQuran.totalChapter;
  console.log(totalChapter); // 114
  ```

- Total Madani

  ```ts
  const totalMadani = AlQuran.totalMadaniSurah;
  console.log(totalMadani); // 28
  ```

- Total Makki

  ```ts
  const totalMakki = AlQuran.totalMakkiSurah;
  console.log(totalMakki); // 86
  ```

- Total Verse

  ```ts
  const totalVerse = AlQuran.totalVerse;
  console.log(totalVerse); // 6236
  ```

- Juz

  ```ts
  const juz = AlQuran.juz({ chapterNumber: 1, verseNumber: 1 });
  console.log(juz);
  // {
  //   verse: {
  //     first: 1,
  //     last: 148,
  //     count: 148,
  //     items: {
  //       1: 1-7,
  //       2: 1-141
  //     }
  //   },
  //   id: 1,
  //   number: 1
  // }
  ```

- Chapter

  ```ts
  const chapter = AlQuran.chapter(1);
  console.log(chapter);
  // {
  //   id: 1,
  //   bismillahPre: false,
  //   nameArabic: "الفاتحة",
  //   nameComplex: "Al-Fātiĥah",
  //   nameSimple: "Al-Fatihah",
  //   pages: [1, 1],
  //   revelationOrder: 5,
  //   revelationPlace: 'makkah',
  //   translatedName: {
  //     id: "Pembukaan",
  //     en: "The Opener",
  //     ar: "سورة الفاتحة",
  //     tr: "Fâtiha",
  //     fr: "Louverture"
  //   },
  //   versesCount: 7
  // }
  ```

- Verse

  ```ts
  const verse = AlQuran.verse(1, 1);
  console.log(verse);
  // {
  //   id: 1,
  //   verseKey: "1:1",
  //   text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
  //   chapterID: 1,
  //   pageNumber: 1,
  //   juzNumber: 1
  // };

  // With Mode. Available indopak, uthmani, uthmani tajweed, and imlaei.
  const verseWithMode = AlQuran.verse(
    1,
    1,
    mode: VerseMode.uthmani,
  );
  console.log(verseWithMode);
  // {
  //   id: 1,
  //   verseKey: "1:1",
  //   text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
  //   chapterID: 1,
  //   pageNumber: 1,
  //   juzNumber: 1,
  // }

  // By Juz
  const versesByJuz = AlQuran.versesByJuz(1);
  console.log(`
    VersesByJuz\n
    Verses: ${versesByJuz.length}\
  `);
  //  VersesByJuz
  //  Verses: 148

  // By Chapter
  const versesByChapter = AlQuran.versesByChapter(1);
  console.log(`
    VersesByChapter\n
    Verses: ${versesByChapter.length}
  `);
  //  VersesByChapter
  //  Verses: 7
  ```

- Translation

  ```ts
  const translation = AlQuran.translation(
      TranslationType.idIndonesianIslamicAffairsMinistry, "1:1");
  console.log(translation);
  // {
  //   id: 181444,
  //   verseKey: "1:1",
  //   text: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
  //   resourceID: 33,
  //   languageName: "indonesian"
  // }
  ```

- Chapter Audio URL

  ```ts
  const chapterAudio = AlQuran.audioURLByChapter(1);
  console.log(chapterAudio); // https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3

  // With Edition
  const chapterAudioWithEdition = AlQuran.audioURLByChapter(
    1,
    edition: AudioEdition.ar_husary,
  );
  console.log(chapterAudioWithEdition); // https://cdn.islamic.network/quran/audio-surah/128/ar.husary/1.mp3
  ```

- Verse Audio URL

  ```ts
  const verseAudio = AlQuran.audioURLByVerse(1);
  console.log(verseAudio); // https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3

  // With Edition
  const verseAudioWithEdition = AlQuran.audioURLByVerse(1,
      edition: AudioEdition.ar_husary);
  console.log(verseAudioWithEdition); // https://cdn.islamic.network/quran/audio/128/ar.husary/1.mp3
  ```

- Verse Image URL

  ```ts
  const imageUrl = AlQuran.imageURLByVerse("1:1");
  console.log(imageUrl); // https://cdn.islamic.network/quran/images/1_1.png

  // With high quality
  const imageUrlHighQuality = AlQuran.imageURLByVerse("1:1", highQuality: true);
  console.log(imageUrlHighQuality); // https://cdn.islamic.network/quran/images/high-resolution/1_1.png
  ```

- Random Verse

  ```ts
  const randomVerse = AlQuran.randomVerse();
  console.log(`
    RandomVerse\n
    Verse: ${randomVerse.verse}\n
    Trans: ${randomVerse.translation}
  `);
  //  RandomVerse
  //  Verse: {
  //    id: 3247,
  //    verseKey: 27:88,
  //    text: "وَتَرَى الۡجِبَالَ تَحۡسَبُهَا جَامِدَةً وَّهِىَ تَمُرُّ مَرَّ السَّحَابِ​ؕ صُنۡعَ اللّٰهِ الَّذِىۡۤ اَتۡقَنَ كُلَّ شَىۡءٍ​ؕ اِنَّهٗ خَبِيۡرٌۢ بِمَا تَفۡعَلُوۡنَ",
  //    chapterID: 27,
  //    pageNumber: 384,
  //    juzNumber: 20
  //  }
  //  Trans: {
  //    id: 404950,
  //    verseKey: 27:88,
  //    text: "You will see the mountains and think they are firmly fixed, but they will float away like clouds: this is the handiwork of God who has perfected all things. He is fully aware of what you do:",
  //    resourceID: 85,
  //    languageName: "english"
  //  }

  // With mode and translation
  const randomVerseWithMode = AlQuran.randomVerse(
    mode: VerseMode.uthmani,
    translationType: TranslationType.idIndonesianIslamicAffairsMinistry,
  );
  console.log(`
    RandomVerseWithMode\n
    Verse: ${randomVerseWithMode?.verse.toJson()}\n
    Trans: ${randomVerseWithMode?.translation.toJson()}
  `);
  //  RandomVerseWithMode
  //  Verse: {
  //    id: 1648,
  //    verseKey: "12:52",
  //    text: ذَٰلِكَ لِيَعْلَمَ أَنِّى لَمْ أَخُنْهُ بِٱلْغَيْبِ وَأَنَّ ٱللَّهَ لَا يَهْدِى كَيْدَ ٱلْخَآئِنِينَ,
  //    chapterID: 12,
  //    pageNumber: 241,
  //    juzNumber: 12
  //  }
  //  Trans: {
  //    id: 181655,
  //    verseKey: "12:52",
  //    text: "(Yusuf berkata), Yang demikian itu agar dia (Al-Aziz) mengetahui bahwa aku benar-benar tidak mengkhianatinya ketika dia tidak ada (di rumah), dan bahwa Allah tidak meridai tipu daya orang-orang yang berkhianat.",
  //    resourceID: 33,
  //    languageName: "indonesian"
  //  }
  ```

- Search

  ```ts
  const searchResult = AlQuran.search(
    'annas',
    TranslationType.idIndonesianIslamicAffairsMinistry,
  );

  console.log(`
    SearchResult\n
    Chapters: ${searchResult.chapters}\n
    Verses: ${searchResult.verses}
  `);

  //  SearchResult
  //  Chapters: [
  //    {
  //      id: 36,
  //      bismillahPre: true,
  //      nameArabic: "يس",
  //      nameComplex: "Yā-Sīn",
  //      nameSimple: "Ya-Sin",
  //      pages: [440, 445],
  //      revelationOrder: 41,
  //      revelationPlace: 'makkah',
  //      translatedName: {
  //        id: "Yas Sin",
  //        en: "Ya Sin",
  //        ar: "Ya Sin",
  //        tr: "Yâsîn",
  //        fr: "Ya-Sin"
  //      },
  //      versesCount: 83
  //    }
  //  ]
  //  Verses: []
  ```

- Transliteration

  ```ts
  const transliteration = AlQuran.transliteration("1:1");
  console.log(`Transliteration: ${transliteration}`);

  //  Transliteration: {id: "1:1", text: "Bismi Allāhi Ar-Raĥmāni Ar-Raĥīmi"}
  ```