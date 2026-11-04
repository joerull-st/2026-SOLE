<!--
@component
### Vignette component
One athlete in the Sole of an Athlete package: a studio portrait paired with a
close-up of their footwear, plus name, sport, school and a brief description of
the footwear.

Tapping the portrait swaps it for the athlete's video interview in the same
frame, with sound and captions. The portrait and the interview need matching
lighting and pose so the swap reads as the photo coming to life. When the clip
ends (or is tapped again and finishes), the frame returns to the portrait.

The video's sources only mount once the reader taps, so six vignettes don't
preload six interviews.

#### Properties
- athlete: Athlete (see src/data/athletes.js)
- index: number — position in the package; drives the "01" label
- mirrored: boolean — puts the photos on the right and text on the left
  (tablet and desktop) and flips which corner the footwear overlaps

#### Example
```svelte
{#each athletes as athlete, i}
  <Vignette {athlete} index={i} mirrored={i % 2 === 1} />
{/each}
```
-->

<script>
  /** @type {{ athlete: import("../../data/athletes.js").Athlete; index?: number; mirrored?: boolean }} */
  let { athlete, index = 0, mirrored = false } = $props();

  /** @type {HTMLVideoElement | null} */
  let video = $state(null);
  let isActive = $state(false);
  let isPaused = $state(true);
  let currentTime = $state(0);

  const number = $derived(String(index + 1).padStart(2, "0"));
  const source = $derived(athlete.video?.sources?.[0]?.src);
  const activeCaption = $derived(
    isActive
      ? (athlete.video?.parsedCaptions?.find(
          (cue) => currentTime >= cue.start && currentTime <= cue.end,
        )?.text ?? "")
      : "",
  );

  async function toggle() {
    if (!source) return;
    if (!isActive) {
      isActive = true;
      // wait for the <video> to mount, then play with sound — the tap is the
      // user gesture that lets the browser allow audio
      await Promise.resolve();
      requestAnimationFrame(() => {
        if (!video) return;
        video.muted = false;
        video.currentTime = 0;
        video.play();
      });
      return;
    }
    if (video?.paused) video.play();
    else video?.pause();
  }

  // only one interview plays at a time: announce ours, pause on anyone else's
  const PLAY_EVENT = "sole-vignette-play";
  $effect(() => {
    if (!isPaused) window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: index }));
  });
  $effect(() => {
    /** @param {Event} e */
    const onOtherPlay = (e) => {
      if (/** @type {CustomEvent} */ (e).detail !== index) video?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  });

  function reset() {
    isActive = false;
    currentTime = 0;
  }
</script>

<article
  class="grid grid-cols-1 items-end gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-0"
  aria-labelledby="athlete-{index}-name"
  style="--accent: {athlete.accent}"
>
  <!-- photo pairing -->
  <div
    class="relative md:col-span-7 md:row-start-1 {mirrored
      ? 'md:col-start-6'
      : 'md:col-start-1'}"
  >
    <button
      type="button"
      onclick={toggle}
      class="group relative block aspect-[4/5] w-[78%] cursor-pointer overflow-hidden bg-[color-mix(in_srgb,var(--accent)_30%,white)] {mirrored
        ? 'ml-auto'
        : ''}"
      aria-label={isActive && !isPaused
        ? `Pause interview with ${athlete.name}`
        : `Play interview with ${athlete.name}`}
    >
      {#if athlete.portrait}
        <img
          src={athlete.portrait}
          alt={athlete.portraitAlt ?? ""}
          class="absolute inset-0 h-full w-full object-cover"
        />
      {:else}
        <span
          class="font-utility-label-reg-caps-02 absolute inset-0 flex items-center justify-center text-(--accent)"
          >Studio portrait</span
        >
      {/if}

      {#if isActive && source}
        <!-- svelte-ignore a11y_media_has_caption -->
        <video
          bind:this={video}
          bind:paused={isPaused}
          bind:currentTime
          onended={reset}
          playsinline
          preload="auto"
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 {isPaused &&
          currentTime === 0
            ? 'opacity-0'
            : 'opacity-100'}"
        >
          <source src={source} type="video/mp4" />
        </video>
      {/if}

      {#if activeCaption && !isPaused}
        <span
          class="font-utility-body-reg-03 absolute inset-x-4 top-4 rounded bg-black/70 px-3 py-2 text-left text-white"
          >{activeCaption}</span
        >
      {/if}

      {#if !isActive || isPaused}
        <span
          class="font-utility-label-bold-caps-02 absolute top-4 flex items-center gap-2 rounded-full bg-(--accent) px-3 py-2 text-white transition-transform group-hover:scale-105 {mirrored
            ? 'right-4'
            : 'left-4'}"
        >
          <svg viewBox="0 0 12 12" class="h-3 w-3" aria-hidden="true"
            ><path d="M2 1l9 5-9 5z" fill="currentColor" /></svg
          >
          {isActive ? "Resume" : "Watch"}
        </span>
      {/if}
    </button>

    <!-- footwear overlaps the portrait's lower corner at a slight tilt, like the
         hero collage's panels, and shrinks toward its outer corner while the
         interview plays so it doesn't cover the video -->
    <div
      class="absolute -bottom-12 aspect-square w-[46%] bg-[color-mix(in_srgb,var(--accent)_16%,white)] shadow-lg ring-8 ring-white transition-transform duration-500 ease-out motion-reduce:transition-none {mirrored
        ? 'left-0 origin-bottom-left rotate-2'
        : 'right-0 origin-bottom-right -rotate-2'} {isActive && !isPaused
        ? 'scale-50'
        : 'scale-100'}"
    >
      {#if athlete.shoe}
        <img
          src={athlete.shoe}
          alt={athlete.shoeAlt ?? ""}
          class="h-full w-full object-cover"
        />
      {:else}
        <span
          class="font-utility-label-reg-caps-02 flex h-full items-center justify-center text-(--accent)"
          >Footwear</span
        >
      {/if}
    </div>
  </div>

  <!-- athlete details -->
  <div
    class="md:col-span-5 md:row-start-1 md:pb-16 {mirrored
      ? 'md:col-start-1 md:text-right'
      : 'md:col-start-8'}"
  >
    <p class="font-editorial-number-01 text-(--accent)">{number}</p>
    <h2
      id="athlete-{index}-name"
      class="font-editorial-non-news-heading-02 mt-2 text-text-primary"
    >
      {athlete.name}
    </h2>
    <p class="font-utility-label-bold-caps-02 mt-3 text-text-secondary">
      {athlete.school} · {athlete.sport}{athlete.grade
        ? ` · ${athlete.grade}`
        : ""}
    </p>
    <p class="font-utility-label-bold-caps-02 mt-6 text-(--accent)">
      {athlete.footwear}
    </p>
    {#each athlete.footwearDescription as paragraph, p}
      <p
        class="font-editorial-body-reg-03 text-text-primary {p === 0
          ? 'mt-1'
          : 'mt-4'}"
      >
        {paragraph}
      </p>
    {/each}
  </div>
</article>
