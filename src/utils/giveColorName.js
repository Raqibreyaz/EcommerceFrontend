import ColorNamer from 'color-namer'

export const giveColorName =
    (color) => {
        try {
            return ColorNamer(color)?.ntc[0].name
        } catch (error) {
            return color
        }
    }