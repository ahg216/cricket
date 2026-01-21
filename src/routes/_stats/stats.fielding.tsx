import { createFileRoute } from "@tanstack/react-router";

function FieldingStatsRoute() {
	return <></>;
}

export const Route = createFileRoute("/_stats/stats/fielding")({
	component: FieldingStatsRoute,
	head: () => ({ meta: [{ title: "Fielding Stats" }] }),
});
