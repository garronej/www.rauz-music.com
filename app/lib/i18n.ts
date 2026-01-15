import "server-only";

import { cookies, headers } from "next/headers";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE = "rauz-locale";

const defaultLocale: Locale = "en";

const dictionary = {
  en: {
    metadata: {
      title: "Rauz | Composer, Bassist, Synth Bass, Guitarist",
      description:
        "Rauz is a composer of cover music for feature films. Explore featured media, socials, and connect.",
    },
    header: {
      composer: "Composer",
      nav: {
        media: "Media",
        contact: "Contact",
        instagram: "Instagram",
        tiktok: "TikTok",
      },
      theme: {
        label: "Toggle theme",
        light: "Light",
        dark: "Dark",
      },
      language: {
        label: "Language",
        english: "English",
        french: "French",
      },
    },
    footer: {
      tagline: "Composer, bassist, synth bass, guitarist.",
      nav: {
        contact: "Contact",
        instagram: "Instagram",
        tiktok: "TikTok",
      },
    },
    home: {
      chip: "Composer, bassist, synth bass, guitarist",
      heroTitle: "Rauz",
      heroDescription:
        "Composer of cover music for feature films, weaving cinematic arrangements with deep bass textures and modern synth bass.",
      ctaPrimary: "Play featured score",
      ctaSecondary: "Contact",
      focusLabel: "Focus",
      focusTitle: "Cinematic cover scoring",
      focusDescription: "Reimagined themes for feature-length storytelling.",
      instrumentsLabel: "Instruments",
      instrumentsTitle: "Bass-forward palettes",
      instrumentsDescription: "Electric bass, synth bass, and guitar textures.",
      signatureLabel: "Signature",
      signatureTitle: "Low-end storylines",
      studioLabel: "Studio",
      studioTitle: "Feature-length dynamics",
      mediaLabel: "Featured Media",
      mediaTitle: "Featured score reel",
      mediaDescription:
        "A cover score excerpt showcasing cinematic arrangements, bass, and synth bass textures.",
      mediaCaption: "Cover score excerpt",
      watchOnYoutube: "Watch on YouTube",
      mediaVideoTitle: "Rauz featured score",
      audioLabel: "Featured Audio",
      audioTitle: "Featured tracks",
      audioDescription:
        "Listen to full-length versions of selected cover score moments.",
      audioPlayer: {
        nowPlaying: "Now playing",
        play: "Play",
        pause: "Pause",
        previous: "Previous",
        next: "Next",
        trackList: "Track list",
        seek: "Seek",
      },
      socialTitle: "Social index",
      socialDescription: "Follow new sessions and behind-the-scenes clips.",
      collaborationsLabel: "Collaborations",
      collaborationsTitle: "Ready for the next feature",
      collaborationsDescription:
        "Book cover scoring, bass sessions, or synth bass design for your next release.",
      collaborationsCta: "Contact Rauz",
      imageAlt: "Rauz portrait",
      instagramHandle: "@rauz.mazz",
      tiktokHandle: "@rauzmusique",
    },
    contact: {
      metadataTitle: "Contact | Rauz",
      metadataDescription:
        "Get in touch with Rauz about film cover scoring and sessions.",
      backLink: "Back to home",
      label: "Contact",
      title: "Let's build the next cinematic cover",
      description:
        "Share your project goals, timeline, and sonic references. This draft form is ready to connect to your preferred contact service.",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@email.com",
        projectLabel: "Project focus",
        projectOptions: {
          cover: "Cover score arrangement",
          bass: "Bass session",
          synth: "Synth bass design",
          collaboration: "Collaboration",
          other: "Other",
        },
        messageLabel: "Message",
        messagePlaceholder: "Tell me about the film, scene, or release.",
        helper:
          "Connect this form to Formspree, Netlify, or your own endpoint.",
        submit: "Send message",
      },
      helpLabel: "What helps",
      helpTitle: "Share references",
      helpDescription:
        "Include a link to the original theme, the desired tone, and the delivery deadline.",
      socialsLabel: "Socials",
    },
  },
  fr: {
    metadata: {
      title: "Rauz | Compositeur, Bassiste, Synth Bass, Guitariste",
      description:
        "Rauz est un compositeur de musiques de reprise pour films. Decouvrez les medias, les reseaux, et contactez-le.",
    },
    header: {
      composer: "Compositeur",
      nav: {
        media: "Media",
        contact: "Contact",
        instagram: "Instagram",
        tiktok: "TikTok",
      },
      theme: {
        label: "Changer le theme",
        light: "Clair",
        dark: "Sombre",
      },
      language: {
        label: "Langue",
        english: "Anglais",
        french: "Francais",
      },
    },
    footer: {
      tagline: "Compositeur, bassiste, synth bass, guitariste.",
      nav: {
        contact: "Contact",
        instagram: "Instagram",
        tiktok: "TikTok",
      },
    },
    home: {
      chip: "Compositeur, bassiste, synth bass, guitariste",
      heroTitle: "Rauz",
      heroDescription:
        "Compositeur de musiques de reprise pour films, il tisse des arrangements cinematographiques avec des textures de basse profonde et du synth bass moderne.",
      ctaPrimary: "Ecouter le score",
      ctaSecondary: "Contact",
      focusLabel: "Focus",
      focusTitle: "Reprises cinematographiques",
      focusDescription:
        "Themes reimagines pour une narration long format.",
      instrumentsLabel: "Instruments",
      instrumentsTitle: "Palettes centrees sur la basse",
      instrumentsDescription:
        "Basse electrique, synth bass et textures de guitare.",
      signatureLabel: "Signature",
      signatureTitle: "Narration grave",
      studioLabel: "Studio",
      studioTitle: "Dynamiques long format",
      mediaLabel: "Media en vedette",
      mediaTitle: "Reel de score",
      mediaDescription:
        "Extrait de score de reprise avec arrangements cinematographiques, basse et synth bass.",
      mediaCaption: "Extrait de score",
      watchOnYoutube: "Voir sur YouTube",
      mediaVideoTitle: "Score en vedette de Rauz",
      audioLabel: "Audio en vedette",
      audioTitle: "Titres en vedette",
      audioDescription:
        "Ecoutez les versions integrales de certaines reprises.",
      audioPlayer: {
        nowPlaying: "Lecture en cours",
        play: "Lire",
        pause: "Pause",
        previous: "Precedent",
        next: "Suivant",
        trackList: "Liste des titres",
        seek: "Rechercher",
      },
      socialTitle: "Index social",
      socialDescription: "Suivez les nouvelles sessions et les coulisses.",
      collaborationsLabel: "Collaborations",
      collaborationsTitle: "Pret pour le prochain film",
      collaborationsDescription:
        "Reservez une reprise, une session de basse ou un design de synth bass.",
      collaborationsCta: "Contacter Rauz",
      imageAlt: "Portrait de Rauz",
      instagramHandle: "@rauz.mazz",
      tiktokHandle: "@rauzmusique",
    },
    contact: {
      metadataTitle: "Contact | Rauz",
      metadataDescription:
        "Contactez Rauz pour des reprises cinematographiques et des sessions.",
      backLink: "Retour a l'accueil",
      label: "Contact",
      title: "Construisons la prochaine reprise cinematographique",
      description:
        "Partagez vos objectifs, le calendrier et les references sonores. Ce formulaire est pret a connecter votre service de contact.",
      form: {
        nameLabel: "Nom",
        namePlaceholder: "Votre nom",
        emailLabel: "Email",
        emailPlaceholder: "vous@email.com",
        projectLabel: "Focus du projet",
        projectOptions: {
          cover: "Arrangement de reprise",
          bass: "Session de basse",
          synth: "Design de synth bass",
          collaboration: "Collaboration",
          other: "Autre",
        },
        messageLabel: "Message",
        messagePlaceholder: "Parlez-moi du film, de la scene ou de la sortie.",
        helper:
          "Connectez ce formulaire a Formspree, Netlify ou votre endpoint.",
        submit: "Envoyer le message",
      },
      helpLabel: "Pour aider",
      helpTitle: "Partagez des references",
      helpDescription:
        "Incluez un lien vers le theme original, le ton souhaite et la date limite.",
      socialsLabel: "Reseaux",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];

const normalizeLocale = (value: string) => value.toLowerCase().split("-")[0];

const resolveLocaleFromHeader = (headerValue: string): Locale | null => {
  if (!headerValue) {
    return null;
  }

  const entries = headerValue
    .split(",")
    .map((part) => {
      const [lang, qValue] = part.trim().split(";q=");
      return {
        lang: normalizeLocale(lang),
        q: qValue ? Number(qValue) : 1,
      };
    })
    .filter((entry) => Number.isFinite(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const entry of entries) {
    if (entry.lang === "fr") {
      return "fr";
    }
    if (entry.lang === "en") {
      return "en";
    }
  }

  return null;
};

export const getLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (cookieLocale) {
    const normalized = normalizeLocale(cookieLocale) as Locale;
    if (locales.includes(normalized)) {
      return normalized;
    }
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language") ?? "";
  return resolveLocaleFromHeader(acceptLanguage) ?? defaultLocale;
};

export const getDictionary = (locale: Locale): Dictionary =>
  dictionary[locale] ?? dictionary[defaultLocale];
