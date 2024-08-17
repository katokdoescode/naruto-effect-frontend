<script>
import Button from '$lib/ui/Button.svelte';
import { getContext } from 'svelte';
import { _, locale } from 'svelte-i18n';
const authorized = getContext('authorized');

export let data;
</script>

<svelte:head>
  <title>{$_('projects.title')}</title>
</svelte:head>
<nav>
  <h1>{$_('projects.title')}</h1>

  {#if data.projects?.length}
    <ul class="projects-list">
      {#each data.projects as project}
        <li class="project-item">
          <a
            class="projects-link"
            class:disabled={!project?.isVisible || false}
            data-sveltekit-keepfocus
            href="/projects/{project.slug}"
          >
            {project.name[$locale]}
          </a>
        </li>
      {/each}

    </ul>
    {#if $authorized}
    <div class="add">
      <Button  color="black" href="/projects/create" >{$_('button.addProject')}</Button>
    </div>
    {/if}
  {:else}
    <h2>{$_('projects.noProjects')}</h2>
  {/if}
</nav>

<style>
.add {
  margin-top: 2em;
}

ul.projects-list {
  padding-left: 1em;
}

.project-item {
  list-style: disc;
}

.projects-link {
  &.disabled {
    opacity: 0.5;
  }

  &:hover {
    text-decoration: underline;
  }
}
</style>
