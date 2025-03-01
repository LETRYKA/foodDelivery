"use client"

import { UserRound, EllipsisVertical } from "lucide-react"
import { Line, LineChart, CartesianGrid, Dot, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
	{ browser: "other", visitors: 30, fill: "transparent" },
	{ browser: "other", visitors: 100, fill: "transparent" },
	{ browser: "other", visitors: 80, fill: "transparent" },
	{ browser: "other", visitors: 160, fill: "transparent" },
	{ browser: "other", visitors: 100, fill: "transparent" },
	{ browser: "other", visitors: 130, fill: "transparent" },
	{ browser: "other", visitors: 150, fill: "var(--primary)" },
]

const chartConfig = {
	visitors: {
		label: "Visitors",
		color: "var(--primary)",
	},
} satisfies ChartConfig

const StatusWidget = () => {
	return (
		<div className="w-full h-[4.6rem] bg-[var(--background)] rounded-[var(--radius)] flex flex-row justify-between items-center px-4 group transition-all duration-200 ease-in-out hover:bg-[var(--background)]/10 hover:shadow-[5px_5px_17px_1px_#ebebeb] cursor-pointer">
			{/* Left Section */}
			<div className="flex flex-row items-center gap-3">
				<div className="h-8 w-8 bg-[#EBEAFC] rounded-full flex justify-center items-center transition-all duration-200 ease-in-out group-hover:bg-[var(--background)]">
					<UserRound className="stroke-[var(--primary)]" width={15} />
				</div>
				<div className="flex flex-col">
					<h1 className="text-base text-[var(--foreground)] font-semibold">14,960</h1>
					<p className="text-xs text-[var(--muted-foreground)] -mt-1">Users</p>
				</div>
			</div>

			{/* Chart Section */}
			<div className="w-20 h-2/4">
				<ChartContainer config={chartConfig} className="w-full h-full mt-1">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
							<CartesianGrid vertical={false} strokeDasharray="3 3" />
							<ChartTooltip
								cursor={false}
								position={{ y: 30 }}
								content={<ChartTooltipContent indicator="line" nameKey="visitors" hideLabel />}
							/>
							<Line
								dataKey="visitors"
								type="monotone"
								stroke="var(--color-visitors)"
								strokeWidth={2}
								dot={({ payload, index, ...props }) => (
									<Dot key={index} r={3} cx={props.cx} cy={props.cy} fill={payload.fill} stroke={payload.fill} />
								)}
							/>
						</LineChart>
					</ResponsiveContainer>
				</ChartContainer>
			</div>
			{/* Right Section */}
			<EllipsisVertical className=" stroke-[var(--muted-foreground)] w-4 cursor-pointer" />
		</div>
	)
}

export default StatusWidget
