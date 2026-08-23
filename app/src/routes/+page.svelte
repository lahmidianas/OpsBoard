<script lang="ts">
	const metrics = [
		{ label: 'Services', value: '8', detail: '6 operational', tone: 'text-slate-950' },
		{ label: 'Open incidents', value: '3', detail: '1 critical', tone: 'text-red-700' },
		{ label: 'SLA risk', value: '2', detail: 'due under 1h', tone: 'text-amber-700' },
		{ label: 'Avg response', value: '184ms', detail: 'last 24h', tone: 'text-emerald-700' }
	];

	const services = [
		{
			name: 'Coupa SAP Sync',
			team: 'Integration',
			env: 'production',
			status: 'degraded',
			lastCheck: '2 min ago',
			response: '712ms'
		},
		{
			name: 'Organizer API',
			team: 'Platform',
			env: 'production',
			status: 'operational',
			lastCheck: '1 min ago',
			response: '143ms'
		},
		{
			name: 'Media Uploads',
			team: 'Platform',
			env: 'production',
			status: 'down',
			lastCheck: 'now',
			response: 'timeout'
		},
		{
			name: 'Ticket Checkout',
			team: 'Payments',
			env: 'production',
			status: 'operational',
			lastCheck: '4 min ago',
			response: '198ms'
		}
	];

	const incidents = [
		{
			title: 'Signed upload endpoint timing out',
			service: 'Media Uploads',
			severity: 'critical',
			status: 'investigating',
			sla: '42 min'
		},
		{
			title: 'Delayed purchase order sync',
			service: 'Coupa SAP Sync',
			severity: 'high',
			status: 'open',
			sla: '1h 15m'
		},
		{
			title: 'Organizer dashboard slow reports',
			service: 'Organizer API',
			severity: 'medium',
			status: 'open',
			sla: '3h'
		}
	];

	const statusClass: Record<string, string> = {
		operational: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
		degraded: 'bg-amber-50 text-amber-700 ring-amber-200',
		down: 'bg-red-50 text-red-700 ring-red-200',
		investigating: 'bg-sky-50 text-sky-700 ring-sky-200',
		open: 'bg-slate-100 text-slate-700 ring-slate-200'
	};

	const severityClass: Record<string, string> = {
		critical: 'bg-red-700 text-white',
		high: 'bg-orange-100 text-orange-800',
		medium: 'bg-blue-100 text-blue-800'
	};
</script>

<svelte:head>
	<title>OpsBoard</title>
	<meta
		name="description"
		content="Incident and integration monitoring dashboard for support teams."
	/>
</svelte:head>

<main class="min-h-screen bg-slate-100 text-slate-950">
	<div class="grid min-h-screen lg:grid-cols-[260px_1fr]">
		<aside class="border-b border-slate-200 bg-white px-5 py-5 lg:border-b-0 lg:border-r">
			<div class="flex items-center gap-3">
				<div class="grid size-10 place-items-center rounded-lg bg-slate-950 font-bold text-white">OB</div>
				<div>
					<p class="font-semibold">OpsBoard</p>
					<p class="text-sm text-slate-500">Incident monitor</p>
				</div>
			</div>

			<nav class="mt-8 grid gap-1 text-sm font-medium text-slate-600">
				<a class="rounded-md bg-slate-950 px-3 py-2 text-white" href="/">Dashboard</a>
				<a class="rounded-md px-3 py-2 hover:bg-slate-100" href="/">Services</a>
				<a class="rounded-md px-3 py-2 hover:bg-slate-100" href="/">Incidents</a>
				<a class="rounded-md px-3 py-2 hover:bg-slate-100" href="/">Checks</a>
			</nav>

			<div class="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
				<p class="text-sm font-semibold">Demo workspace</p>
				<p class="mt-1 text-sm text-slate-600">Production support view with seeded SaaS data.</p>
			</div>
		</aside>

		<section class="px-4 py-5 sm:px-6 lg:px-8">
			<header class="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
				<div>
					<p class="text-sm font-medium text-slate-500">Operations overview</p>
					<h1 class="mt-1 text-2xl font-semibold tracking-normal text-slate-950">Service health dashboard</h1>
				</div>
				<div class="flex gap-2">
					<button class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
						Run checks
					</button>
					<button class="rounded-md bg-slate-950 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
						New incident
					</button>
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
						<span class="text-sm text-slate-500">Live checks</span>
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
						<span class="text-sm text-slate-500">{incidents.length} active</span>
					</div>

					<div class="divide-y divide-slate-100">
						{#each incidents as incident}
							<article class="p-4">
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
							</article>
						{/each}
					</div>
				</section>
			</div>
		</section>
	</div>
</main>
