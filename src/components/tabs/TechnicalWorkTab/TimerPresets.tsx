import dayjs, { Dayjs } from "dayjs";

/**
 * interface from ant design
 */
export interface PresetDate<T> {
    label: React.ReactNode;
    value: T | (() => T);
}

function TimerPresets(): PresetDate<Dayjs>[] {
    return ([
        {
            label: '5 минут',
            value: dayjs().add(5, 'minute'),
        },
        {
            label: '15 минут',
            value: dayjs().add(15, 'minute'),
        },
        {
            label: '30 минут',
            value: dayjs().add(30, 'minute'),
        },
        {
            label: '1 час',
            value: dayjs().add(1, 'hour'),
        },
        {
            label: '2 часа',
            value: dayjs().add(2, 'hour'),
        },
        {
            label: '6 часов',
            value: dayjs().add(6, 'hour'),
        },
        {
            label: '12 часов',
            value: dayjs().add(12, 'hour'),
        },
    ]);
}

export default TimerPresets;