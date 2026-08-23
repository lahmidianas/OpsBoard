<script lang="ts">
	import { severityClass, statusClass } from '$lib/demo';

	let { data } = $props();
</script>

<svelte:head>
	<title>Incidents | OpsBoard</title>
</svelte:head>

<header class="border-b border-slate-200 pb-5">
	<p class="text-sm font-medium text-slate-500">Support workflow</p>
	<h1 class="mt-1 text-2xl font-semibold tracking-normal text-slate-950">Incidents</h1>
</header>

<section class="mt-6 rounded-lg border border-slate-200 bg-white">
	<div class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
		<h2 class="font-semibold">Open incidents</h2>
		<span class="text-sm text-slate-500">{data.incidents.length} active</span>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full min-w-[820px] text-left text-sm">
			<thead class="bg-slate-50 text-xs uppercase text-slate-500">
				<tr>
					<th class="px-4 py-3 font-semibold">Title</th>
					<th class="px-4 py-3 font-semibold">Service</th>
					<th class="px-4 py-3 font-semibold">Severity</th>
					<th class="px-4 py-3 font-semibold">Status</th>
					<th class="px-4 py-3 font-semibold">Opened</th>
					<th class="px-4 py-3 font-semibold">SLA</th>
					<th class="px-4 py-3 font-semibold">Owner</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-slate-100">
				{#each data.incidents as incident}
					<tr class="hover:bg-slate-50">
						<td class="px-4 py-3 font-medium">
							<a class="hover:underline" href={`/incidents/${incident.id}`}>{incident.title}</a>
						</td>
						<td class="px-4 py-3 text-slate-600">{incident.service}</td>
						<td class="px-4 py-3">
							<span class={`rounded-full px-2 py-1 text-xs font-semibold ${severityClass[incident.severity]}`}>
								{incident.severity}
							</span>
						</td>
						<td class="px-4 py-3">
							<span class={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${statusClass[incident.status]}`}>
								{incident.status}
							</span>
						</td>
						<td class="px-4 py-3 text-slate-600">{incident.opened}</td>
						<td class="px-4 py-3 font-medium text-amber-700">{incident.sla}</td>
						<td class="px-4 py-3 text-slate-600">{incident.owner}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
