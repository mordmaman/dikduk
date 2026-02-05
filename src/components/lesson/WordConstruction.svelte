<script lang="ts">
  interface WordPart {
    text: string;
    label: string;
  }

  interface Props {
    parts: WordPart[];
    note?: string;
  }

  let { parts, note }: Props = $props();

  // Check if text is Hebrew (contains Hebrew Unicode characters)
  function isHebrew(text: string): boolean {
    return /[\u0590-\u05FF]/.test(text);
  }
</script>

<div class="my-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
  <div class="flex flex-wrap items-center justify-center gap-2 text-lg">
    {#each parts as part, i}
      <div class="flex flex-col items-center">
        {#if isHebrew(part.text)}
          <span
            lang="he"
            dir="rtl"
            class="font-hebrew text-2xl text-hebrew dark:text-hebrew-dark"
          >
            {part.text}
          </span>
        {:else}
          <span class="text-xl text-muted dark:text-muted-dark">
            {part.text}
          </span>
        {/if}
        {#if part.label}
          <span class="text-xs text-muted dark:text-muted-dark mt-1">
            {part.label}
          </span>
        {/if}
      </div>
    {/each}
  </div>
  {#if note}
    <p class="text-sm text-muted dark:text-muted-dark text-center mt-3 italic">
      {note}
    </p>
  {/if}
</div>
