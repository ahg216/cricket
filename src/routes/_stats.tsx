import { ArrowLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

import { DateFilter, datesQueryOptions } from "@/components/date-filter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const statsItems = [
	{ name: "Teams", url: "/stats/teams", icon: "/icons/teams.png" },
	{ name: "Batting", url: "/stats/batting", icon: "/icons/bat.png" },
	{ name: "Bowling", url: "/stats/bowling", icon: "/icons/ball.png" },
	{ name: "Fielding", url: "/stats/fielding", icon: "/icons/fielding.png" },
	{ name: "MOM", url: "/stats/man-of-match", icon: "/icons/medal.png" },
];

function StatsLayout() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const activeItem = statsItems.find((item) => item.url === pathname);
	return (
		<main className="flex h-dvh flex-col gap-4">
			{activeItem && (
				<header className="container mx-auto flex items-center justify-between px-4 pt-4">
					<div className="flex items-center gap-2">
						<Button variant="secondary" size="icon-sm" onClick={() => navigate({ to: "/stats" })}>
							<HugeiconsIcon icon={ArrowLeftIcon} strokeWidth={2} />
						</Button>
						<h1 className="text-xl font-semibold capitalize">{`${activeItem.name} Stats`}</h1>
					</div>
					<DateFilter />
				</header>
			)}
			<div className="container mx-auto h-full flex-1 overflow-y-auto px-4">
				<Outlet />
			</div>
			<footer className="border-t">
				<div className="container mx-auto grid grid-cols-5 px-1 pt-3 pb-2">
					{statsItems.map((item) => {
						const isCurrentRoute = pathname === item.url;
						return (
							<Link to={item.url} key={item.name} className="group flex flex-col items-center px-1">
								<div
									className={cn(
										"flex w-full max-w-15 justify-center rounded-full py-1.5 transition-colors group-hover:bg-muted-foreground/40",
										isCurrentRoute && "bg-blue-700/40 group-hover:bg-blue-700/40",
									)}
								>
									<img src={item.icon} width={20} height={20} alt={item.name} className="aspect-square" />
								</div>
								<p className={cn("", isCurrentRoute && "font-medium")} style={{ fontSize: 13 }}>
									{item.name}
								</p>
							</Link>
						);
					})}
				</div>
			</footer>
		</main>
	);
}

export const Route = createFileRoute("/_stats")({
	component: StatsLayout,
	loader: ({ context }) => context.queryClient.ensureQueryData(datesQueryOptions()),
});
