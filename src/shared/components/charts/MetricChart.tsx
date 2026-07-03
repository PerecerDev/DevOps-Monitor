import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/shared/components/ui';
import type { MetricPoint } from '@/shared/types';
import { cn } from '@/shared/utils';

interface MetricChartProps {
  title: string;
  data: MetricPoint[];
  unit?: string;
  variant?: 'area' | 'line';
  height?: number;
  isLoading?: boolean;
  className?: string;
  color?: string;
  chartId?: string;
}

export function MetricChart({
  title,
  data,
  unit = '',
  variant = 'area',
  height = 240,
  isLoading = false,
  className,
  color = 'var(--color-accent)',
  chartId = 'default',
}: MetricChartProps) {
  const chartData = data.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: point.value,
  }));

  const latestValue = data.at(-1)?.value;

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {!isLoading && latestValue !== undefined && (
            <span className="text-lg font-semibold tabular-nums">
              {formatValue(latestValue)}
              {unit && <span className="ml-1 text-xs font-normal text-muted">{unit}</span>}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full" style={{ height: `${String(height)}px` }} />
        ) : (
          <div style={{ height: `${String(height)}px` }} aria-label={`${title} chart`}>
            <ResponsiveContainer width="100%" height="100%">
              {variant === 'area' ? (
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="var(--color-muted)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted)" />
                  <Tooltip content={<ChartTooltip unit={unit} />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    fill={`url(#gradient-${chartId})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              ) : (
                <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="var(--color-muted)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted)" />
                  <Tooltip content={<ChartTooltip unit={unit} />} />
                  <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 text-xs shadow-md">
      <p className="text-muted">{label}</p>
      <p className="font-semibold tabular-nums">
        {formatValue(payload[0]?.value ?? 0)}
        {unit && ` ${unit}`}
      </p>
    </div>
  );
}

function formatValue(value: number): string {
  if (value >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (value < 10) return value.toFixed(2);
  return value.toFixed(0);
}
