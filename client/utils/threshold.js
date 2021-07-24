export const ThresholdUnits = {
    Pixel: 'Pixel',
    Percent: 'Percent',
};

const defaultThreshold = {
    unit: ThresholdUnits.Percent,
    value: 0.8,
};

export function parseThreshold(scrollThreshold) {
    if (typeof scrollThreshold === 'number') {
        return {
            unit: ThresholdUnits.Percent,
            value: scrollThreshold * 100,
        };
    }

    if (typeof scrollThreshold === 'string') {
        if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
            return {
                unit: ThresholdUnits.Pixel,
                value: parseFloat(scrollThreshold),
            };
        }

        if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
            return {
                unit: ThresholdUnits.Percent,
                value: parseFloat(scrollThreshold),
            };
        }

        return defaultThreshold;
    }

    return defaultThreshold;
}
