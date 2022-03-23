import { format, formatDistanceToNow, getTime } from 'date-fns'

// ----------------------------------------------------------------------

export function fDate(date: EpochTimeStamp) {
	return format(new Date(date), 'dd MMMM yyyy')
}

export function fDateTime(date: EpochTimeStamp) {
	return format(new Date(date), 'dd MMM yyyy HH:mm')
}

export function fTimestamp(date: EpochTimeStamp) {
	return getTime(new Date(date))
}

export function fDateTimeSuffix(date: EpochTimeStamp) {
	return format(new Date(date), 'dd/MM/yyyy hh:mm p')
}

export function fToNow(date: EpochTimeStamp) {
	return formatDistanceToNow(new Date(date), {
		addSuffix: true
	})
}
