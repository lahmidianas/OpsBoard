<script lang="ts">
	import { severityClass, statusClass } from '$lib/demo';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.service.name} | OpsBoard</title>
</svelte:head>

<header class="border-b border-slate-200 pb-5">
	<a class="text-sm font-medium text-slate-500 hover:text-slate-950" href="/services">Back to services</a>
	<div class="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
		<div>
			<p class="text-sm font-medium text-slate-500">{data.service.team} team</p>
			<h1 class="mt-1 text-2xl font-semibold tracking-normal text-slate-950">{data.service.name}</h1>
		</div>
		<span class={`w-fit rounded-full px-2 py-1 text-xs font-semibold ring-1 ${statusClass[data.service.status]}`}>
			{data.service.status}
		</span>
	</div>
</header>

<div class="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
	<section class="rounded-lg border border-slate-200 bg-white">
		<div class="border-b border-slate-200 px-4 py-3">
			<h2 class="font-semibold">Recent check runs</h2>
		</div>
		<div class="divide-y divide-slate-100">
			{#each data.checkRuns as run}
				<div class="grid gap-3 p-4 text-sm sm:grid-cols-[80px_1fr_120px_120px] sm:items-center">
					<p class="font-medium">{run.at}</p>
					<p class="text-slate-600">{run.code}</p>
					<p class="text-slate-600">{run.response}</p>
					<span class={`w-fit rounded-full px-2 py-1 text-xs font-semibold ring-1 ${statusClass[run.status]}`}>
						{run.status}
					</span>
				</div>
			{:else}
				<p class="p-4 text-sm text-slate-500">No check runs yet.</p>
			{/each}
		</div>
	</section>

	<aside class="grid gap-6">
		<section class="rounded-lg border border-slate-200 bg-white p-4">
			<h2 class="font-semibold">Service summary</h2>
			<dl class="mt-4 grid gap-3 text-sm">
				<div class="flex justify-between gap-3">
					<dt class="text-slate-500">Environment</dt>
					<dd class="font-medium">{data.service.env}</dd>
				</div>
				<div class="flex justify-between gap-3">
					<dt class="text-slate-500">Owner</dt>
					<dd class="font-medium">{data.service.team}</dd>
				</div>
				<div class="flex justify-between gap-3">
					<dt class="text-slate-500">Last check</dt>
					<dd class="font-medium">{data.service.lastCheck}</dd>
				</div>
				<div class="flex justify-between gap-3">
					<dt class="text-slate-500">Response</dt>
					<dd class="font-medium">{data.service.response}</dd>
				</div>
			</dl>
		</section>

		<section class="rounded-lg border border-slate-200 bg-white">
			<div class="border-b border-slate-200 px-4 py-3">
				<h2 class="font-semibold">Related incidents</h2>
			</div>
			<div class="divide-y divide-slate-100">
				{#each data.incidents as incident}
					<a class="block p-4 hover:bg-slate-50" href={`/incidents/${incident.id}`}>
						<div class="flex items-start justify-between gap-3">
							<p class="text-sm font-medium leading-snug">{incident.title}</p>
							<span class={`rounded-full px-2 py-1 text-xs font-semibold ${severityClass[incident.severity]}`}>
								{incident.severity}
							</span>
						</div>
						<p class="mt-2 text-sm text-amber-700">SLA {incident.sla}</p>
					</a>
				{:else}
					<p class="p-4 text-sm text-slate-500">No open incidents.</p>
				{/each}
			</div>
		</section>
	</aside>
</div>
