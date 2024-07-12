export interface MetricModel {
	name: string;
	value: number | null;
}


export function metricPossibleValue(metric : MetricModel) : number[] {
	switch (metric.name) {
		case 'RPE':
		return [5.10];
		case 'Pain':
			return [1.10];
		default:
			return [];
	}

}

function validateMetric(metric: MetricModel): boolean {
	if (metric.value === null) return true;

	switch (metric.name) {
	case 'RPE':
		return metric.value >= 5 && metric.value <= 10;
	case 'Pain':
		return metric.value >= 0 && metric.value <= 10;
	case 'BarSpeed':
		return metric.value >= 0;
	default:
		return true;
	}
}
