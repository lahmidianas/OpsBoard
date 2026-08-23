<script lang="ts">
	import { incidents, metrics, services, severityClass, statusClass } from '$lib/demo';
</script>

<svelte:head>
	<title>Dashboard | OpsBoard</title>
</svelte:head>

<header class="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
	<div>
		<p class="text-sm font-medium text-slate-500">Operations overview</p>
		<h1 class="mt-1 text-2xl font-semibold tracking-normal text-slate-950">Service health dashboard</h1>
	</div>
	<div class="flex gap-2">
		<button class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
			Run checks
		</button>
		<a class="rounded-md bg-slate-950 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800" href="/incidents">
			New incident
		</a>
	</div>
</header>

<div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
	{#each metrics as metric}
		<div class="rounded-lg border border-slate-200 bg-white p-4">
			<p class="text-sm font-medium text-slate-500">{metric.label}</p>
			<p class={`mt-2 text-3xl font-semibold ${metric.tone}`}>{metric.value}</p>
			<p class="mt-1 text-sm text-slate-500">{metric.detail}</p>
		</div>
	{/each}
</div>

<div class="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
	<section class="rounded-lg border border-slate-200 bg-white">
		<div class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
			<h2 class="font-semibold">Services</h2>
			<a class="text-sm font-medium text-slate-600 hover:text-slate-950" href="/services">View all</a>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full min-w-[720px] text-left text-sm">
				<thead class="bg-slate-50 text-xs uppercase text-slate-500">
					<tr>
						<th class="px-4 py-3 font-semibold">Service</th>
						<th class="px-4 py-3 font-semibold">Team</th>
						<th class="px-4 py-3 font-semibold">Environment</th>
						<th class="px-4 py-3 font-semibold">Status</th>
						<th class="px-4 py-3 font-semibold">Last check</th>
						<th class="px-4 py-3 font-semibold">Response</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					{#each services as service}
						<tr class="hover:bg-slate-50">
							<td class="px-4 py-3 font-medium">{service.name}</td>
							<td class="px-4 py-3 text-slate-600">{service.team}</td>
							<td class="px-4 py-3 text-slate-600">{service.env}</td>
							<td class="px-4 py-3">
								<span class={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${statusClass[service.status]}`}>
									{service.status}
								</span>
							</td>
							<td class="px-4 py-3 text-slate-600">{service.lastCheck}</td>
							<td class="px-4 py-3 text-slate-600">{service.response}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="rounded-lg border border-slate-200 bg-white">
		<div class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
			<h2 class="font-semibold">Open incidents</h2>
			<a class="text-sm font-medium text-slate-600 hover:text-slate-950" href="/incidents">{incidents.length} active</a>
		</div>

		<div class="divide-y divide-slate-100">
			{#each incidents as incident}
				<a class="block p-4 hover:bg-slate-50" href={`/incidents/${incident.id}`}>
					<div class="flex items-start justify-between gap-3">
						<div>
							<h3 class="font-medium leading-snug">{incident.title}</h3>
							<p class="mt-1 text-sm text-slate-500">{incident.service}</p>
						</div>
						<span class={`rounded-full px-2 py-1 text-xs font-semibold ${severityClass[incident.severity]}`}>
							{incident.severity}
						</span>
					</div>
					<div class="mt-3 flex items-center justify-between text-sm">
						<span class={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${statusClass[incident.status]}`}>
							{incident.status}
						</span>
						<span class="font-medium text-amber-700">SLA {incident.sla}</span>
					</div>
				</a>
			{/each}
		</div>
	</section>
</div>
