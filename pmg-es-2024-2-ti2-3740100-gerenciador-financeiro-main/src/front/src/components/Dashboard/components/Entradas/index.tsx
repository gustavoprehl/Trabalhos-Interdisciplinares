"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface EntradasChartProps {
  chartData: number[];
}

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"];

export default function EntradasChart({ chartData }: EntradasChartProps) {
  const data = chartData.map((value, index) => ({
    name: months[index],
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value: number) =>
            [`R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, "Valor"]
          }
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#16a34a"
          strokeWidth={2}
          dot={{ fill: "#16a34a" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}