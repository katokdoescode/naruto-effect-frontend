<script>
import { locale } from 'svelte-i18n';
</script>

<svelte:head>
{#if $locale === 'ru'}
  <title>Лесное 11 ↔ Проекты Эффекта Наруто</title>
{:else}
  <title>Lesnoe 11 ↔ Naruto Effect Projects</title>
{/if}
</svelte:head>
{#if $locale === 'ru'}
<a href="/projects">← Проекты</a>
<h1>Лесное 11</h1>
<p>Cкоро здесь появятся материалы по итогам резиденции "Эффекта Наруто" в резиденции "Лесное 11"</p>
{:else}
<a href="/projects">← Projects</a>
<h1>Lesnoe 11</h1>
<p>Soon here will appear materials on the results of the "Naruto Effect" residency in Lesnoe 11</p>
{/if}
