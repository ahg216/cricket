import { createFileRoute } from "@tanstack/react-router";

function ManOfMatchStatsRoute() {
	return <></>;
}

export const Route = createFileRoute("/_stats/stats/man-of-match")({
	component: ManOfMatchStatsRoute,
	head: () => ({ meta: [{ title: "Man of Match Stats" }] }),
});
