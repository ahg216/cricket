import { createFileRoute } from "@tanstack/react-router";

function BattingStatsRoute() {
	return <></>;
}

export const Route = createFileRoute("/_stats/stats/batting")({
	component: BattingStatsRoute,
	head: () => ({ meta: [{ title: "Batting Stats" }] }),
});
