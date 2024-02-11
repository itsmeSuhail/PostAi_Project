export function formatTime(time: number) {
	if (time < 1000) {
		return time + 'ms';
	} else if (time < 60000) {
		const seconds = (time / 1000).toFixed(3);
		return seconds + 's';
	} else {
		const minutes = (time / 60000).toFixed(3);
		return minutes + 'm';
	}
}
