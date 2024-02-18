export type LangCode = "zh-Hans" | "zh-Hant" | "en" | "ja" | "de" | "ko" | "ko-Han" | "eo" | "fr" | "vi" | "vi-Han" | "es" | "tto" | "tto-bro";

export type I18nT<T> = {
    [key in LangCode]?: T;
};

export type I18nText = I18nT<string>;

type I18nI18n = I18nT<I18nText>;

// 优先尝试英语，当前无奈之举
// first try en for the needs of more people,
// for now
const fallbackLanguages: string[] = ["zh-Hans", "zh-Hant", "en", "ja", "de", "ko", "ko-Han", "eo", "fr", "vi", "vi-Han", "es", "tto", "tto-bro"];

export const getFallbackLanguage = (i18nText: I18nT<any>, pageLang: string): LangCode => {
    if (pageLang in i18nText) {
        return pageLang as LangCode;
    } else if (pageLang == "ko-Han" && "ko" in i18nText) {
        return "ko" as LangCode;
    } else if (pageLang == "vi-Han" && "vi" in i18nText) {
        return "vi" as LangCode;
    } else {
        if ("en" in i18nText) return "en" as LangCode;
        for (let lang of fallbackLanguages) {
            if (lang in i18nText) return lang as LangCode;
        }
    }
    
    return "en" as LangCode;
};

export const getLocaleText = (i18nText: I18nText, pageLang: string): string => {
    return i18nText[getFallbackLanguage(i18nText, pageLang)] || "";
};

const langNames: I18nI18n = {
    "zh-Hans": {
        "zh-Hans": "中文（简体）",
        "zh-Hant": "中文（簡體）",
        "en": "Simplified Chinese",
        "ja": "簡体字中国語",
        "de": "Vereinfachtes Chinesisch",
        "ko": "중국어 간체",
        "ko-Han": "中国語 簡體",
        "eo": "Ĉina Simpligita",
        "fr": "chinois simplifié",
        "vi": "tiếng Trung giản thể",
        "vi-Han": "㗂中簡體",
        "es": "chino simplificado",
        "tto": "SrHM-YQaHLaeDenZVnH",
        "tto-bro": "YQaH2Lae2 DlenZVnH",
    },
    "zh-Hant": {
        "zh-Hans": "中文（繁体）",
        "zh-Hant": "中文（繁體）",
        "en": "Traditional Chinese",
        "ja": "繁体字中国語",
        "de": "Traditionelles Chinesisch",
        "ko": "중국어 번체",
        "ko-Han": "中国語 繁體",
        "eo": "Ĉina Tradicia",
        "fr": "chinois traditionnel",
        "vi": "tiếng Trung phồn thể",
        "vi-Han": "㗂中繁體",
        "es": "chino tradicional",
        "tto": "SrHM-bvoHLaeDenZVnH",
        "tto-bro": "b8voHLae2 DlenZVnH",
    },
    "en": {
        "zh-Hans": "英语",
        "zh-Hant": "英語",
        "en": "English",
        "ja": "英語",
        "de": "Englisch",
        "ko": "영어",
        "ko-Han": "英語",
        "eo": "Angla",
        "fr": "anglais",
        "vi": "tiếng Anh",
        "vi-Han": "㗂英",
        "es": "inglés",
        "tto": "SrHM-aZYSeW",
        "tto-bro": "OQecZZei2",
    },
    "ja": {
        "zh-Hans": "日语",
        "zh-Hant": "日語",
        "en": "Japanese",
        "ja": "日本語",
        "de": "Japanisch",
        "ko": "일본어",
        "ko-Han": "日本語",
        "eo": "Japana",
        "fr": "japonais",
        "vi": "tiếng Nhật",
        "vi-Han": "㗂日",
        "es": "japonés",
        "tto": "SrHM-HeXoZYo",
        "tto-bro": "HMeLZei2",
    },
    "de": {
        "zh-Hans": "德语",
        "zh-Hant": "德語",
        "en": "German",
        "ja": "ドイツ語",
        "de": "Deutsch",
        "ko": "독일어",
        "ko-Han": "獨逸語",
        "eo": "Germana",
        "fr": "allemand",
        "vi": "tiếng Đức",
        "vi-Han": "㗂德",
        "es": "alemán",
        "tto": "SrHM-DmvJ",
        "tto-bro": "DiAZei2",
    },
    "ko": {
        "zh-Hans": "韩语",
        "zh-Hant": "韓語",
        "en": "Korean",
        "ja": "韓国語",
        "de": "Koreanisch",
        "ko": "한국어",
        "ko-Han": "韓国語",
        "eo": "Korea",
        "fr": "coréen",
        "vi": "tiếng Hàn",
        "vi-Han": "㗂韓",
        "es": "coreano",
        "tto": "SrHM-XrHYnYm",
        "tto-bro": "X8rHZei2",
    },
    "ko-Han": {
        "zh-Hans": "韩语（汉谚混写）",
        "zh-Hant": "韓語（漢諺混寫）",
        "en": "Korean (Hanja)",
        "ja": "韓国語（漢字ハングル混じり文）",
        "de": "Koreanisch (Hanja)",
        "ko": "한국어 (국한문혼용)",
        "ko-Han": "韓国語 (國漢文)",
        "eo": "Korea (Hanja)",
        "fr": "coréen (Hanja)",
        "vi": "tiếng Hàn (Hán tự hỗn dụng)",
        "vi-Han": "㗂韓（漢字混用）",
        "es": "coreano (Hanja)",
        "tto": "SrHM-XrHYnYm (XrHTr)",
        "tto-bro": "X8rHZei2 (XrH3ZQeaH3X8fiH2Cer2)",
    },
    "eo": {
        "zh-Hans": "世界语（希望语）",
        "zh-Hant": "世界語（希望語）",
        "en": "Esperanto",
        "ja": "エスペラント",
        "de": "Esperanto",
        "ko": "에스페란토",
        "ko-Han": "에스페란토",
        "eo": "Esperanto",
        "fr": "espéranto",
        "vi": "Quốc tế ngữ",
        "vi-Han": "國際語",
        "es": "esperanto",
        "tto": "SrHM-aChaKrHLo",
        "tto-bro": "XyeVurZ3Zyo2",
    },
    "fr": {
        "zh-Hans": "法语",
        "zh-Hant": "法語",
        "en": "French",
        "ja": "仏語",
        "de": "Französisch",
        "ko": "프랑스어",
        "ko-Han": "佛語",
        "eo": "Franca",
        "fr": "français",
        "vi": "tiếng Pháp",
        "vi-Han": "㗂法",
        "es": "francés",
        "tto": "SrHM-NkrZCc",
        "tto-bro": "bvohZei2",
    },
    "vi": {
        "zh-Hans": "越南语",
        "zh-Hant": "越南語",
        "en": "Vietnamese",
        "ja": "ベトナム語",
        "de": "Vietnamesisch",
        "ko": "베트남어",
        "ko-Han": "베트남語",
        "eo": "Vjetnama",
        "fr": "vietnamien",
        "vi": "tiếng Việt",
        "vi-Han": "㗂越",
        "es": "vietnamita",
        "tto": "SrHM-FeaL",
        "tto-bro": "niLHoVZei2",
    },
    "vi-Han": {
        "zh-Hans": "越南语（汉喃）",
        "zh-Hant": "越南語（漢喃）",
        "en": "Vietnamese (Hán Nôm)",
        "ja": "ベトナム語",
        "de": "Vietnamesisch (Hán Nôm)",
        "ko": "베트남어 (한놈)",
        "ko-Han": "越南語（漢喃）",
        "eo": "Vjetnama (Hán Nôm)",
        "fr": "vietnamien (Hán Nôm)",
        "vi": "tiếng Việt (Hán Nôm)",
        "vi-Han": "㗂越（漢喃）",
        "es": "vietnamita (Hán Nôm)",
        "tto": "SrHM-FeaL (XrHHoV)",
        "tto-bro": "niLHoVZei2 (XrH3HlaQV)",
    },
    "es": {
        "zh-Hans": "西班牙语",
        "zh-Hant": "西班牙語",
        "en": "Spanish",
        "ja": "スペイン語",
        "de": "Spanisch",
        "ko": "스페인어",
        "ko-Han": "스페인語",
        "eo": "Hispana",
        "fr": "espagnol",
        "vi": "tiếng Tây Ban Nha",
        "vi-Han": "㗂西班牙",
        "es": "español",
        "tto": "SrHM-aCbrHMoS",
        "tto-bro": "CaebrtHZrtZei2",
    },
    "tto": {
        "zh-Hans": "绝通语",
        "zh-Hant": "絕通語",
        "en": "Dzwietthoungic",
        "ja": "絶通語",
        "de": "Dzwietthoungica",
        "ko": "절통어",
        "ko-Han": "絶通語",
        "eo": "Dzwietthoungika",
        "fr": "dzwietthoungica",
        "vi": "tiếng Tuyệt Thông",
        "vi-Han": "㗂絕通",
        "es": "dzwietthoungic",
        "tto": "SrHM-9vaLLnZ",
        "tto-bro": "9vaLLnZZei2",
    },
    "tto-bro": {
        "zh-Hans": "絶棒语",
        "zh-Hant": "絶棒語",
        "en": "Dzwiet Brongduk",
        "ja": "絶棒語",
        "de": "Dzwiet Brongduk",
        "ko": "절봉어",
        "ko-Han": "絶棒語",
        "eo": "Dzwiet Brongduk",
        "fr": "Dzwiet Brondouque",
        "vi": "tiếng Tuyệt Bổng",
        "vi-Han": "㗂絕棒",
        "es": "Dzwiet Brongduk",
        "tto": "SrHM-bQmZDnA",
        "tto-bro": "9vaLb8QmZ2Zei2",
    },
};

export const languageCodeToLocale = (langCode: string, pageLang: string): string => {
    return langNames[langCode as LangCode]![pageLang as LangCode] || "";
};