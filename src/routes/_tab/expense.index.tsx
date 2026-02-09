import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { TabsLayout } from "@/components/tabs/tabs-layout";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const expenseQueryOptions = () => {
	return queryOptions({
		queryKey: ["expense"],
		queryFn: () => getExpense(),
	});
};

const getExpense = createServerFn({ method: "GET" }).handler(async () => {
	const data = await db.expenses.findMany({ orderBy: { dateId: "desc" } });
	return data.map((item) => ({
		...item,
		dateId: formatDate(item.dateId),
		total: item.foodCost + item.gearCost + item.groundFee,
	}));
});

const columns: ColumnDef<Awaited<ReturnType<typeof getExpense>>[number]>[] = [
	{ accessorKey: "dateId", header: "Date" },
	{ accessorKey: "groundFee", header: "Ground Fee" },
	{ accessorKey: "foodCost", header: "Food Cost" },
	{ accessorKey: "gearCost", header: "Gear Cost" },
	{ accessorKey: "total", header: "Day Total" },
];

export const Route = createFileRoute("/_tab/expense/")({
	head: () => ({ meta: [{ title: "Expense" }] }),
	loader: async ({ context }) => await context.queryClient.ensureQueryData(expenseQueryOptions()),
	component: () => {
		const { data } = useSuspenseQuery(expenseQueryOptions());
		return (
			<TabsLayout title="Expense">
				<DataTable columns={columns} data={data} showFooter />
			</TabsLayout>
		);
	},
});
