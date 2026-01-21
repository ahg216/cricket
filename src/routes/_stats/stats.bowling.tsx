import { createFileRoute } from "@tanstack/react-router";

function BowlingStatsRoute() {
	return <></>;
}

export const Route = createFileRoute("/_stats/stats/bowling")({
	component: BowlingStatsRoute,
	head: () => ({ meta: [{ title: "Bowling Stats" }] }),
});
