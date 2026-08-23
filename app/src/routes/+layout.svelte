<script lang="ts">
	import { page } from '$app/state';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const nav = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Services', href: '/services' },
		{ label: 'Incidents', href: '/incidents' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main class="min-h-screen bg-slate-100 text-slate-950">
	<div class="grid min-h-screen lg:grid-cols-[260px_1fr]">
		<aside class="border-b border-slate-200 bg-white px-5 py-5 lg:border-b-0 lg:border-r">
			<a class="flex items-center gap-3" href="/dashboard">
				<div class="grid size-10 place-items-center rounded-lg bg-slate-950 font-bold text-white">OB</div>
				<div>
					<p class="font-semibold">OpsBoard</p>
					<p class="text-sm text-slate-500">Incident monitor</p>
				</div>
			</a>

			<nav class="mt-8 grid gap-1 text-sm font-medium text-slate-600">
				{#each nav as item}
					<a
						class={`rounded-md px-3 py-2 hover:bg-slate-100 ${
							page.url.pathname.startsWith(item.href) ? 'bg-slate-950 text-white hover:bg-slate-950' : ''
						}`}
						href={item.href}
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
				<p class="text-sm font-semibold">Demo workspace</p>
				<p class="mt-1 text-sm text-slate-600">Production support view with seeded SaaS data.</p>
			</div>
		</aside>

		<section class="px-4 py-5 sm:px-6 lg:px-8">
			{@render children()}
		</section>
	</div>
</main>
