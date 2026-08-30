"use client";

import React, { createContext, useContext, useState } from "react";

// Add your translations here
export const translations = {
    ENG: {
        home: "HOME",
        about: "ABOUT",
        catalog: "CATALOG",
        contact: "CONTACT",
        readMore: "READ MORE",
        build: "BUILD",
        testDrive: "TEST DRIVE",
        startingAt: "Starting at",
    },
    ESP: {
        home: "INICIO",
        about: "NOSOTROS",
        catalog: "CATÁLOGO",
        contact: "CONTACTO",
        readMore: "LEER MÁS",
        build: "CONFIGURAR",
        testDrive: "PRUEBA DE MANEJO",
        startingAt: "Desde",
    },
    FRA: {
        home: "ACCUEIL",
        about: "À PROPOS",
        catalog: "CATALOGUE",
        contact: "CONTACT",
        readMore: "EN SAVOIR PLUS",
        build: "CONSTRUIRE",
        testDrive: "ESSAI ROUTIER",
        startingAt: "À partir de",
    },
    GER: {
        home: "STARTSEITE",
        about: "ÜBER UNS",
        catalog: "KATALOG",
        contact: "KONTAKT",
        readMore: "MEHR LESEN",
        build: "KONFIGURIEREN",
        testDrive: "PROBEFAHRT",
        startingAt: "Ab",
    },
};

type Language = keyof typeof translations;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations["ENG"]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("ENG");

    const t = (key: keyof typeof translations["ENG"]) => {
        return translations[language][key] || translations["ENG"][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}