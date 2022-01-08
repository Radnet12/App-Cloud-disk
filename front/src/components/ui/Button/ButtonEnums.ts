export const PositionsEnum = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
} as const;

export const SizesEnum = {
    SMALL: "small",
    MIDDLE: "middle",
    LARGE: "large",
    FULL: "full",
} as const;

export type Positions = typeof PositionsEnum[keyof typeof PositionsEnum];
export type Sizes = typeof SizesEnum[keyof typeof SizesEnum];
