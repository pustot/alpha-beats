export type LangCode = "en" | "zh-Hans" | "zh-Hant" | "ja" | "de" | "tto" | "tto-bro" | "ko" | "fr";

export type I18nT<T> = {
    [key in LangCode]?: T;
};

export type I18nText = I18nT<string>;

type I18nI18n = I18nT<I18nText>;

const fallbackLanguages: string[] = ["en", "zh-Hans", "zh-Hant", "ja", "de", "tto", "tto-bro", "ko", "fr"];

export const getFallbackLanguage = (i18nText: I18nT<any>, pageLang: string): LangCode => {
    if (pageLang in i18nText) {
        return pageLang as LangCode;
    } else {
        for (let lang of fallbackLanguages) {
            if (lang in i18nText) return lang as LangCode;
        }
    }
    return "en";
};

export const getLocaleText = (i18nText: I18nText, pageLang: string): string => {
    return i18nText[getFallbackLanguage(i18nText, pageLang)] || "";
};

const langNames: I18nI18n = {
    "en": {
        "en": "English",
        "zh-Hans": "英语",
        "zh-Hant": "英語",
        "ja": "英語",
        "de": "Englisch",
        "tto": "SrHM-aZYSeW",
        "tto-bro": "OQecZZei2",
        "ko": "영어",
        "fr": "anglais",
    },
    "zh-Hans": {
        "en": "Simplified Chinese",
        "zh-Hans": "简体中文",
        "zh-Hant": "簡體中文",
        "ja": "簡体字中国語",
        "de": "Vereinfachtes Chinesisch",
        "tto": "SrHM-YQaHLaeDenZVnH",
        "tto-bro": "YQaH2Lae2 DlenZVnH",
        "ko": "중국어 간체",
        "fr": "chinois simplifié",
    },
    "zh-Hant": {
        "en": "Traditional Chinese",
        "zh-Hans": "繁体中文",
        "zh-Hant": "繁體中文",
        "ja": "繁体字中国語",
        "de": "Traditionelles Chinesisch",
        "tto": "SrHM-bvoHLaeDenZVnH",
        "tto-bro": "b8voHLae2 DlenZVnH",
        "ko": "중국어 번체",
        "fr": "chinois traditionnel",
    },
    "ja": {
        "en": "Japanese",
        "zh-Hans": "日语",
        "zh-Hant": "日語",
        "ja": "日本語",
        "de": "Japanisch",
        "tto": "SrHM-HeXoZYo",
        "tto-bro": "HMeLZei2",
        "ko": "일본어",
        "fr": "japonais",
    },
    "de": {
        "en": "German",
        "zh-Hans": "德语",
        "zh-Hant": "德語",
        "ja": "ドイツ語",
        "de": "Deutsch",
        "tto": "SrHM-DmvJ",
        "tto-bro": "DiAZei2",
        "ko": "독일어",
        "fr": "allemand",
    },
    "tto": {
        "en": "Ttomni",
        "zh-Hans": "丌通语",
        "zh-Hant": "丌通語",
        "ja": "丌通語",
        "de": "Ttomni",
        "tto": "SrHM-LiL",
        "tto-bro": "Y8dLnZZei2",
        "ko": "기통어",
        "fr": "ttomni",
    },
    "tto-bro": {
        "en": "Ttomni Brongduk",
        "zh-Hans": "丌棒语",
        "zh-Hant": "丌棒語",
        "ja": "丌棒語",
        "de": "Ttomni Brongduk",
        "tto": "SrHM-bQmZDnA",
        "tto-bro": "Y8db8QmZ2Zei2",
        "ko": "기봉어",
        "fr": "Ttomni Brondouque",
    },
    "ko": {
        "en": "Korean",
        "zh-Hans": "韩语",
        "zh-Hant": "韓語",
        "ja": "韓国語",
        "de": "Koreanisch",
        "tto": "SrHM-XrHYnYm",
        "tto-bro": "X8rHZei2",
        "ko": "한국어",
        "fr": "coréen",
    },
    "fr": {
        "en": "French",
        "zh-Hans": "法语",
        "zh-Hant": "法語",
        "ja": "仏語",
        "de": "Französisch",
        "tto": "SrHM-NkrZCc",
        "tto-bro": "bvohZei2",
        "ko": "프랑스어",
        "fr": "français",
    },
};

export const languageCodeToLocale = (langCode: string, pageLang: string): string => {
    return langNames[langCode as LangCode]![pageLang as LangCode] || "";
};
