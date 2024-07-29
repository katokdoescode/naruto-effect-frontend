<script>
import { locale } from 'svelte-i18n';
</script>

<svelte:head>
  {#if $locale === 'ru'}
  <title>Проекты Эффекта Наруто</title>
  {:else}
  <title>Naruto Effect Projects</title>
  {/if}
</svelte:head>
<nav>
  {#if $locale === 'ru'}
  <h1>Проекты Эффекта Наруто</h1>

  <a href="/projects/lesnoe11">Лесное 11</a>
  {:else}
  <h1>Naruto Effect Projects</h1>

  <a href="/projects/lesnoe11">Lesnoe 11</a>
  {/if}
</nav>
