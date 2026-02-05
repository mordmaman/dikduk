<script lang="ts">
  import { cn } from '@/lib/utils';

  interface Props {
    class?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
  }

  let { class: className = '', padding = 'md' }: Props = $props();

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const classes = cn(
    'bg-surface dark:bg-surface-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
    paddingStyles[padding],
    className
  );
</script>

<div class={classes}>
  <slot />
</div>
