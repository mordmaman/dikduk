<script lang="ts">
  import { cn } from '@/lib/utils';

  interface NavItem {
    href: string;
    label: string;
    current?: boolean;
  }

  interface Props {
    items: NavItem[];
    class?: string;
  }

  let { items, class: className = '' }: Props = $props();
</script>

<nav class={cn('flex gap-1', className)} aria-label="Breadcrumb">
  {#each items as item, index}
    {#if index > 0}
      <span class="text-muted dark:text-muted-dark mx-2">/</span>
    {/if}

    {#if item.current}
      <span class="text-text dark:text-text-dark font-medium" aria-current="page">
        {item.label}
      </span>
    {:else}
      <a
        href={item.href}
        class="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
      >
        {item.label}
      </a>
    {/if}
  {/each}
</nav>
