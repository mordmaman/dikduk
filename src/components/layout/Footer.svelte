<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-surface dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 mt-auto">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Brand -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xl font-bold text-primary dark:text-primary-light">Dikduk</span>
          <span lang="he" dir="rtl" class="font-hebrew text-xl text-secondary">דִּקְדּוּק</span>
        </div>
        <p class="text-sm text-muted dark:text-muted-dark">
          Learn Biblical Hebrew grammar interactively, based on Weingreen's "A Practical Grammar for Classical Hebrew."
        </p>
      </div>

      <!-- Links -->
      <div>
        <h3 class="font-semibold text-text dark:text-text-dark mb-4">Learn</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/curriculum" class="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light">
              Curriculum
            </a>
          </li>
          <li>
            <a href="/progress" class="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light">
              My Progress
            </a>
          </li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h3 class="font-semibold text-text dark:text-text-dark mb-4">Legal</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/privacy" class="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" class="text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-muted dark:text-muted-dark">
      <p>&copy; {currentYear} Dikduk. All rights reserved.</p>
    </div>
  </div>
</footer>
