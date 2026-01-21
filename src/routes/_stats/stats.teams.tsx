import { createFileRoute } from "@tanstack/react-router";

function TeamStatsRoute() {
	return <></>;
}

export const Route = createFileRoute("/_stats/stats/teams")({
	component: TeamStatsRoute,
	head: () => ({ meta: [{ title: "Teams Stats" }] }),
});
