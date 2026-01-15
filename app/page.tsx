import Image from "next/image";
import Link from "next/link";
import AudioPlayer from "./components/AudioPlayer";
import { getDictionary, getLocale } from "./lib/i18n";

export default async function Home() {
  const locale = await getLocale();
  const { home } = getDictionary(locale);
  const tracks = [
    {
      id: "hasta-luego",
      title: "Hasta Luego",
      artist: "Rauz",
      cover: "/audio/Hasta%20Luego/cover.jpeg",
      audioSrc: "/audio/Hasta%20Luego/audio.m4a",
    },
    {
      id: "tes-con-simon",
      title: "T'es Con Simon",
      artist: "Rauz",
      cover: "/audio/T%27es%20Con%20Simon/cover.jpg",
      audioSrc: "/audio/T%27es%20Con%20Simon/audio.mp3",
    },
  ];

  return (
    <main>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-1 flex-col gap-6">
          <div className="reveal">
            <span className="chip">{home.chip}</span>
          </div>
          <h1 className="reveal reveal-delay-1 font-display text-5xl leading-tight text-[color:var(--foreground)] md:text-6xl lg:text-7xl">
            {home.heroTitle}
          </h1>
          <p className="reveal reveal-delay-2 text-lg leading-8 text-[color:var(--muted)] md:text-xl">
            {home.heroDescription}
          </p>
          <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-4">
            <a className="btn" href="#media">
              {home.ctaPrimary}
            </a>
            <Link className="btn-outline" href="/contact">
              {home.ctaSecondary}
            </Link>
          </div>
          <div className="reveal reveal-delay-3 grid gap-4 pt-4 sm:grid-cols-2">
            <div className="glass-card p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                {home.focusLabel}
              </p>
              <p className="mt-3 text-lg font-semibold text-[color:var(--foreground)]">
                {home.focusTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {home.focusDescription}
              </p>
            </div>
            <div className="glass-card p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                {home.instrumentsLabel}
              </p>
              <p className="mt-3 text-lg font-semibold text-[color:var(--foreground)]">
                {home.instrumentsTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {home.instrumentsDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="hero-frame reveal reveal-delay-1">
            <Image
              src="/rauz.png"
              alt={home.imageAlt}
              width={520}
              height={640}
              className="h-full w-full object-cover"
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-card p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                {home.signatureLabel}
              </p>
              <p className="mt-2 text-base font-semibold text-[color:var(--foreground)]">
                {home.signatureTitle}
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                {home.studioLabel}
              </p>
              <p className="mt-2 text-base font-semibold text-[color:var(--foreground)]">
                {home.studioTitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="media" className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              {home.mediaLabel}
            </p>
            <h2 className="font-display text-3xl text-[color:var(--foreground)] md:text-4xl">
              {home.mediaTitle}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              {home.mediaDescription}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="glass-card p-5 md:p-6">
              <div className="aspect-video overflow-hidden rounded-2xl border border-[color:var(--border)]">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/jxLQ78fidF4?modestbranding=1&rel=0"
                  title={home.mediaVideoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 flex flex-col gap-2 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
                <span>{home.mediaCaption}</span>
                <a
                  className="text-sm font-semibold text-[color:var(--accent)]"
                  href="https://www.youtube.com/watch?v=jxLQ78fidF4"
                  target="_blank"
                  rel="noreferrer"
                >
                  {home.watchOnYoutube}
                </a>
              </div>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display text-2xl text-[color:var(--foreground)]">
                {home.socialTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {home.socialDescription}
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  className="link-row"
                  href="https://www.instagram.com/rauz.mazz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Instagram</span>
                  <span className="text-[color:var(--muted)]">
                    {home.instagramHandle}
                  </span>
                </a>
                <a
                  className="link-row"
                  href="https://www.tiktok.com/@rauzmusique"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>TikTok</span>
                  <span className="text-[color:var(--muted)]">
                    {home.tiktokHandle}
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <AudioPlayer
              tracks={tracks}
              labels={{
                sectionLabel: home.audioLabel,
                title: home.audioTitle,
                description: home.audioDescription,
                nowPlaying: home.audioPlayer.nowPlaying,
                play: home.audioPlayer.play,
                pause: home.audioPlayer.pause,
                previous: home.audioPlayer.previous,
                next: home.audioPlayer.next,
                trackList: home.audioPlayer.trackList,
                seek: home.audioPlayer.seek,
              }}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="glass-card flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              {home.collaborationsLabel}
            </p>
            <h2 className="font-display text-3xl text-[color:var(--foreground)]">
              {home.collaborationsTitle}
            </h2>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              {home.collaborationsDescription}
            </p>
          </div>
          <Link className="btn" href="/contact">
            {home.collaborationsCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
