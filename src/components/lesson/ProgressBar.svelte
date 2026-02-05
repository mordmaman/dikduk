<script lang="ts">
  import { cn } from '@/lib/utils';

  interface Props {
    current: number;
    total: number;
    showLabel?: boolean;
    size?: 'sm' | 'md';
    class?: string;
  }

  let {
    current,
    total,
    showLabel = true,
    size = 'md',
    class: className = '',
  }: Props = $props();

  let percentage = $derived(total > 0 ? Math.round((current / total) * 100) : 0);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };
</script>

<div class={cn('w-full', className)}>
  {#if showLabel}
    <div class="flex justify-between text-sm text-muted dark:text-muted-dark mb-1">
      <span>Progress</span>
      <span>{current} / {total}</span>
    </div>
  {/if}
  <div class={cn('w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', sizeStyles[size])}>
    <div
      class="bg-primary dark:bg-primary-light transition-all duration-300 ease-out rounded-full h-full"
      style="width: {percentage}%"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label="Exercise progress"
    ></div>
  </div>
</div>
