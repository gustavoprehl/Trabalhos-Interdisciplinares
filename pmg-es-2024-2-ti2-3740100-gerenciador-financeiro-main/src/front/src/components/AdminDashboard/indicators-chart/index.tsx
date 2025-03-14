"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";

interface IndicatorsChartProps {
	percentualMetasAtingidas: number;
	taxaSucessoPotes: number;
}

interface CustomBarProps {
	x: string | number;
	y: string | number;
	width: string | number;
	height: string | number;
	cor: string;
}

export default function IndicatorsChart({
	percentualMetasAtingidas,
	taxaSucessoPotes,
}: IndicatorsChartProps) {
	const data = [
		{
			name: "Metas Atingidas",
			valor: percentualMetasAtingidas,
			cor: percentualMetasAtingidas < 50 ? "#FF5252" : "#16a34a",
		},
		{
			name: "Taxa de Sucesso",
			valor: taxaSucessoPotes,
			cor: taxaSucessoPotes < 50 ? "#FF5252" : "#16a34a",
		},
	];

	const CustomBar = (props: CustomBarProps) => {
		const { x, y, width, height, cor } = props;
		return (
			<rect x={x} y={y} width={width} height={height} fill={cor} radius={4} />
		);
	};

	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				data={data}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis domain={[0, 100]} />
				<Tooltip
					formatter={(value: number) => [`${value}%`, "Percentual"]}
					contentStyle={{ backgroundColor: "white", borderRadius: "8px" }}
				/>
				<Legend
					formatter={(value) => `${value} ${value === "valor" ? "(%)" : ""}`}
					wrapperStyle={{ paddingTop: "20px" }}
				/>
				<Bar
					dataKey="valor"
					shape={<CustomBar x={""} y={""} width={""} height={""} cor={""} />}
					name="Percentual"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
