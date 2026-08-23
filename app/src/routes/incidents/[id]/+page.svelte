<script lang="ts">
	import { severityClass, statusClass } from '$lib/demo';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.incident.title} | OpsBoard</title>
</svelte:head>

<header class="border-b border-slate-200 pb-5">
	<a class="text-sm font-medium text-slate-500 hover:text-slate-950" href="/incidents">Back to incidents</a>
	<div class="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
		<div>
			<p class="text-sm font-medium text-slate-500">{data.incident.service}</p>
			<h1 class="mt-1 text-2xl font-semibold tracking-normal text-slate-950">{data.incident.title}</h1>
		</div>
		<div class="flex gap-2">
			<span class={`rounded-full px-2 py-1 text-xs font-semibold ${severityClass[data.incident.severity]}`}>
				{data.incident.severity}
			</span>
			<span class={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${statusClass[data.incident.status]}`}>
				{data.incident.status}
			</span>
		</div>
	</div>
</header>

<div class="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
	<section class="rounded-lg border border-slate-200 bg-white">
		<div class="border-b border-slate-200 px-4 py-3">
			<h2 class="font-semibold">Timeline</h2>
		</div>
		<div class="divide-y divide-slate-100">
			{#each data.timeline as item}
				<div class="grid gap-1 p-4 sm:grid-cols-[72px_1fr]">
					<p class="text-sm font-medium text-slate-500">{item.at}</p>
					<p class="text-sm text-slate-700">{item.event}</p>
				</div>
			{/each}
		</div>
	</section>

	<aside class="grid gap-6">
		<section class="rounded-lg border border-slate-200 bg-white p-4">
			<h2 class="font-semibold">SLA</h2>
			<p class="mt-3 text-3xl font-semibold text-amber-700">{data.incident.sla}</p>
			<p class="mt-1 text-sm text-slate-500">remaining before escalation</p>
		</section>

		<section class="rounded-lg border border-slate-200 bg-white">
			<div class="border-b border-slate-200 px-4 py-3">
				<h2 class="font-semibold">Related checks</h2>
			</div>
			<div class="divide-y divide-slate-100">
				{#each data.checkRuns as run}
					<div class="flex items-center justify-between gap-3 p-4 text-sm">
						<div>
							<p class="font-medium">{run.at}</p>
							<p class="text-slate-500">{run.code} - {run.response}</p>
						</div>
						<span class={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${statusClass[run.status]}`}>
							{run.status}
						</span>
					</div>
				{/each}
			</div>
		</section>
	</aside>
</div>
