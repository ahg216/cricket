import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { ColumnDef } from "@tanstack/react-table";
import { type Table } from "@tanstack/react-table";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { DataTable } from "@/components/data-table";
import { TabsLayout } from "@/components/tabs-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const getExpense = createServerFn({ method: "GET" }).handler(async () => {
	const data = await db.expenses.findMany({ orderBy: { dateId: "desc" } });
	return data.map((item) => ({
		...item,
		dateId: formatDate(item.dateId),
		total: item.foodCost + item.gearCost + item.groundFee,
	}));
});

type ExpenseRow = Awaited<ReturnType<typeof getExpense>>[number];

const sumColumn = (id: keyof ExpenseRow) => {
	return ({ table }: { table: Table<ExpenseRow> }) =>
		table
			.getFilteredRowModel()
			.rows.reduce((sum, row) => sum + (Number(row.getValue(id)) || 0), 0)
			.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

const columns: ColumnDef<ExpenseRow>[] = [
	{ accessorKey: "dateId", header: "Date", footer: () => "Total" },
	{ accessorKey: "groundFee", header: "Ground", footer: sumColumn("groundFee") },
	{ accessorKey: "foodCost", header: "Food", footer: sumColumn("foodCost") },
	{ accessorKey: "gearCost", header: "Gear", footer: sumColumn("gearCost") },
	{ accessorKey: "total", header: "Total", footer: sumColumn("total") },
];

const chartConfig: ChartConfig = {
	groundFee: { label: "Ground", color: "var(--chart-1)" },
	foodCost: { label: "Food", color: "var(--chart-2)" },
	gearCost: { label: "Gear", color: "var(--chart-3)" },
	total: { label: "Total", color: "var(--chart-4)" },
};

export const Route = createFileRoute("/_tab/expense/")({
	head: () => ({ meta: [{ title: "Expense" }] }),
	loader: async ({ context }) =>
		await context.queryClient.ensureQueryData({
			queryKey: ["expense"],
			queryFn: () => getExpense(),
		}),
	component: () => {
		const data = Route.useLoaderData();
		const chartData = [...data].reverse();
		const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("total");
		return (
			<TabsLayout title="Expense" filters={{ date: false }}>
				<DataTable columns={columns} data={data} />
				<Card className="py-0">
					<CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
						<div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
							<CardTitle>Expense Chart</CardTitle>
							<CardDescription>Showing total expenses from Jan, 2026</CardDescription>
						</div>
						<div className="flex">
							{["groundFee", "foodCost", "gearCost", "total"].map((key) => {
								const chart = key as keyof typeof chartConfig;
								return (
									<button
										key={chart}
										type="button"
										data-active={activeChart === chart}
										onClick={() => setActiveChart(chart)}
										className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/70 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
									>
										<span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
										<span className="text-lg leading-none font-bold sm:text-3xl">
											{data.reduce((sum, row) => sum + (Number(row[key as keyof typeof row]) || 0), 0).toLocaleString()}
										</span>
									</button>
								);
							})}
						</div>
					</CardHeader>
					<CardContent className="px-2 sm:p-6">
						<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
							<BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="dateId"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									minTickGap={32}
									tickFormatter={(value) => formatDate(value) ?? "All Time"}
								/>
								<ChartTooltip
									content={
										<ChartTooltipContent
											className="w-[150px]"
											nameKey="views"
											labelFormatter={(value) => formatDate(value) ?? "All Time"}
										/>
									}
								/>
								<Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</TabsLayout>
		);
	},
});
