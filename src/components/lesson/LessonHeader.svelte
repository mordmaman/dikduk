<script lang="ts">
  import { getUnitDisplayName } from '@/lib/utils';
  import Badge from '@/components/ui/Badge.svelte';

  interface Props {
    title: string;
    hebrewTitle: string;
    unit: string;
    chapter: number;
    weingreenRef: string;
  }

  let { title, hebrewTitle, unit, chapter, weingreenRef }: Props = $props();

  let unitName = $derived(getUnitDisplayName(unit));
</script>

<header class="mb-8">
  <div class="flex flex-wrap items-center gap-2 mb-4">
    <Badge variant="primary">{unitName}</Badge>
    <Badge variant="neutral">Chapter {chapter}</Badge>
    <Badge variant="neutral">{weingreenRef}</Badge>
  </div>

  <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
    <h1 class="text-3xl sm:text-4xl font-bold text-text dark:text-text-dark">
      {title}
    </h1>
    <span
      lang="he"
      dir="rtl"
      class="font-hebrew text-2xl sm:text-3xl text-hebrew dark:text-hebrew-dark"
    >
      {hebrewTitle}
    </span>
  </div>
</header>
