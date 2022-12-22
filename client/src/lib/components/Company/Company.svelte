<script lang="ts">
	export let company: App.ICompany;
	const { description, id, image, shortDescription, title, employees } = company;
</script>

<div class="flex flex-col space-y-2">
	<div class="aspect-video w-full">
		<img src={image} alt="company" class="rounded-lg object-cover object-center h-full w-full" />
	</div>
	<div>
		<h4 class="text-2xl font-extrabold tracking-wide"><a href={`/company/${id}`}>{title}</a></h4>
		<p class="text-gray-500">{shortDescription}</p>
	</div>
</div>
