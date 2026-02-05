<script lang="ts">
  import { cn } from '@/lib/utils';

  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    class?: string;
    onclick?: (e: MouseEvent) => void;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    href,
    class: className = '',
    onclick,
    ...restProps
  }: Props = $props();

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-primary dark:bg-primary-light dark:text-gray-900 dark:hover:bg-blue-400',
    secondary: 'bg-secondary text-gray-900 hover:bg-yellow-500 focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-gray-900',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800',
  };

  const sizeStyles: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
</script>

{#if href}
  <a {href} class={classes} {...restProps}>
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    onclick={onclick}
    {...restProps}
  >
    <slot />
  </button>
{/if}
