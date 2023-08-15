import React, { useEffect } from "react";

const GoogleTranslate = () => {
    useEffect(() => {
        new window.google.translate.TranslateElement({
            pageLanguage: "en", // Set the default page language
            includedLanguages: "en,iw", // List of supported languages
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, // Set layout
            autoDisplay: false, // Don't auto display
        }, "google_translate_element");
    }, []);

    return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
