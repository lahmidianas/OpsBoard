<script lang="ts">
	import { statusClass } from '$lib/demo';

	let { data } = $props();
</script>

<svelte:head>
	<title>Services | OpsBoard</title>
</svelte:head>

<header class="border-b border-slate-200 pb-5">
	<p class="text-sm font-medium text-slate-500">Monitored systems</p>
	<h1 class="mt-1 text-2xl font-semibold tracking-normal text-slate-950">Services</h1>
</header>

<section class="mt-6 rounded-lg border border-slate-200 bg-white">
	<div class="flex items-center justify-between border-b border-slate-200 px-4 py-3">
		<h2 class="font-semibold">Service inventory</h2>
		<span class="text-sm text-slate-500">{data.services.length} services</span>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full min-w-[760px] text-left text-sm">
			<thead class="bg-slate-50 text-xs uppercase text-slate-500">
				<tr>
					<th class="px-4 py-3 font-semibold">Name</th>
					<th class="px-4 py-3 font-semibold">Team</th>
					<th class="px-4 py-3 font-semibold">Environment</th>
					<th class="px-4 py-3 font-semibold">Status</th>
					<th class="px-4 py-3 font-semibold">Last check</th>
					<th class="px-4 py-3 font-semibold">Response</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-slate-100">
				{#each data.services as service}
					<tr class="hover:bg-slate-50">
						<td class="px-4 py-3 font-medium">
							<a class="hover:underline" href={`/services/${service.id}`}>{service.name}</a>
						</td>
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
