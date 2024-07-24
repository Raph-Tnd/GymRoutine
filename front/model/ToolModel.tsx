export interface ToolModel {
	name: string;
	values: number[];
}

export function stopwatchReadableTime(x: number): string {
	if (x <= 60) {
		return x.toString();
	} else {
		return Math.floor(x / 60) + ":" + (x % 60);
	}
}
