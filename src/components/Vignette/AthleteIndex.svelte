<!--
@component
### AthleteIndex component
Grid of every athlete at the top of the package. Each card echoes the vignette's
portrait-plus-footwear pairing and jumps to that athlete's section
(`#athlete-1` … `#athlete-6`, set in ArticleBody).

#### Properties
- athletes: Athlete[] (see src/data/athletes.js)
- additionalClasses: string
-->

<script>
  /** @type {{ athletes: import("../../data/athletes.js").Athlete[]; additionalClasses?: string }} */
  let { athletes, additionalClasses = "" } = $props();

  /** @param {MouseEvent} e @param {string} id */
  function jump(e, id) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  }
</script>

<nav
  aria-label="Athletes in this story"
  class="mx-auto max-w-[720px] {additionalClasses}"
>
  <ol
    class="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-12"
  >
    {#each athletes as athlete, i}
      {@const id = `athlete-${i + 1}`}
      <li>
        <a
          href="#{id}"
          onclick={(e) => jump(e, id)}
          class="group block"
          style="--accent: {athlete.accent}"
        >
          <div class="relative mb-8">
            <div
              class="aspect-[4/5] w-[82%] overflow-hidden bg-[color-mix(in_srgb,var(--accent)_30%,white)] transition-transform duration-300 group-hover:-translate-y-1"
            >
              {#if athlete.portrait}
                <img
                  src={athlete.portrait}
                  alt=""
                  class="h-full w-full object-cover"
                />
              {/if}
            </div>
            <div
              class="absolute -bottom-6 right-0 aspect-square w-[44%] -rotate-2 bg-[color-mix(in_srgb,var(--accent)_16%,white)] shadow-md ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-2"
            >
              {#if athlete.shoe}
                <img
                  src={athlete.shoe}
                  alt=""
                  class="h-full w-full object-cover"
                />
              {/if}
            </div>
          </div>
          <span class="font-editorial-number-01 text-[2.25rem]! block text-(--accent)"
            >{String(i + 1).padStart(2, "0")}</span
          >
          <span
            class="font-editorial-body-bold-03 mt-1 block text-text-primary underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-(--accent)"
            >{athlete.name}</span
          >
          <span
            class="font-utility-label-reg-caps-02 mt-1 block text-text-secondary"
            >{athlete.sport}</span
          >
        </a>
      </li>
    {/each}
  </ol>
</nav>
