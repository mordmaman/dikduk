<script lang="ts">
  import { cn } from '@/lib/utils';

  interface Props {
    word: string;
    transliteration?: string;
    translation?: string;
    size?: 'small' | 'medium' | 'large';
    class?: string;
  }

  let {
    word,
    transliteration,
    translation,
    size = 'large',
    class: className = '',
  }: Props = $props();

  const sizeStyles = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl',
  };
</script>

<div class={cn('inline-flex flex-col items-center gap-1', className)}>
  <span
    lang="he"
    dir="rtl"
    class={cn(
      'font-hebrew text-hebrew dark:text-hebrew-dark font-medium',
      sizeStyles[size]
    )}
  >
    {word}
  </span>
  {#if transliteration || translation}
    <span class="text-sm text-muted dark:text-muted-dark">
      {#if transliteration}
        <span class="italic">{transliteration}</span>
      {/if}
      {#if transliteration && translation}
        <span class="mx-1">—</span>
      {/if}
      {#if translation}
        <span>{translation}</span>
      {/if}
    </span>
  {/if}
</div>
