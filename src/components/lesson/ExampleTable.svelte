<script lang="ts">
  interface Props {
    headers: string[];
    rows: string[][];
  }

  let { headers, rows }: Props = $props();

  // Check if text is Hebrew
  function isHebrew(text: string): boolean {
    return /[\u0590-\u05FF]/.test(text);
  }
</script>

<div class="my-6 overflow-x-auto">
  <table class="w-full border-collapse">
    <thead>
      <tr>
        {#each headers as header}
          <th class="border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 font-semibold text-left">
            {header}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr class="even:bg-gray-50/50 dark:even:bg-gray-800/50">
          {#each row as cell}
            <td
              class="border border-gray-200 dark:border-gray-700 px-4 py-2"
              class:font-hebrew={isHebrew(cell)}
              class:text-hebrew={isHebrew(cell)}
              class:dark:text-hebrew-dark={isHebrew(cell)}
              class:text-xl={isHebrew(cell)}
              lang={isHebrew(cell) ? 'he' : undefined}
              dir={isHebrew(cell) ? 'rtl' : undefined}
            >
              {cell}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
