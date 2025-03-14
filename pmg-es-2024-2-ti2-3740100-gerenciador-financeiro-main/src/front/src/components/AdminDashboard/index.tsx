"use client";

import {
  DollarSign,
  Users,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import PerformanceChart from "@/components/AdminDashboard/performance-chart";
import IndicatorsChart from "@/components/AdminDashboard/indicators-chart";

interface Indicadores {
  percentualMetasAtingidas: number;
  taxaSucessoPotes: number;
  mediaPotesPorUsuario: number;
}

export function AdminDashboardPageLayout() {

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Última atualização: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Média de Potes por Usuário
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                2
              </h3>
              <div className="mt-2 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">8%</span>
              </div>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Metas Atingidas
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                5%
              </h3>
              <div className="mt-2 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">12%</span>
              </div>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Taxa de Sucesso
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                50%
              </h3>
              <div className="mt-2 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">4%</span>
              </div>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Desempenho Mensal</h3>
          <div className="h-[300px]">
            <PerformanceChart />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Indicadores Percentuais</h3>
          <div className="h-[300px]">
            <IndicatorsChart
              percentualMetasAtingidas={5}
              taxaSucessoPotes={50}
            />
          </div>
        </Card>
      </div>
    </div>
  );


}
