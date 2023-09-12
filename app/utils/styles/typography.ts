import {FontsEnum} from './fonts-enum';
import {formatSize} from './format-size';

export const typography = {
    // Regular Font
    text10Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(10),
    },
    text12Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(12),
    },
    text14Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(14),
    },
    text16Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(16),
    },
    text18Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(18),
    },
    text20Regular: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(20),
    },

    // SemiBold
    text10SemiBold: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(10),
    },
    text12SemiBold: {
        fontFamily: FontsEnum.quicksandSemiBold,
        fontSize: formatSize(12),
    },
    text14SemiBold: {
        fontFamily: FontsEnum.quicksandSemiBold,
        fontSize: formatSize(14),
    },
    text16SemiBold: {
        fontFamily: FontsEnum.quicksandSemiBold,
        fontSize: formatSize(16),
    },
    text18SemiBold: {
        fontFamily: FontsEnum.quicksandSemiBold,
        fontSize: formatSize(18),
    },
    text20SemiBold: {
        fontFamily: FontsEnum.quicksandSemiBold,
        fontSize: formatSize(20),
    },
    text24SemiBold: {
        fontFamily: FontsEnum.quicksandSemiBold,
        fontSize: formatSize(24),
    },

    text28SemiBold: {
        fontFamily: FontsEnum.quicksandSemiBold,
        fontSize: formatSize(28),
    },
    text32SemiBold: {
        fontFamily: FontsEnum.quicksandSemiBold,
        fontSize: formatSize(32),
    },

    // Bold Font
    text10Bold: {
        fontFamily: FontsEnum.quicksandRegular,
        fontSize: formatSize(10),
    },
    text12Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(12),
    },
    text14Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(14),
    },
    text16Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(16),
    },
    text18Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(18),
    },
    text20Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(20),
    },
    text24Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(24),
    },
    text28Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(28),
    },
    text32Bold: {
        fontFamily: FontsEnum.quicksandBold,
        fontSize: formatSize(32),
    },
};

interface FontStyles {
    fontFamily: string;
    fontSize: number;
}

export type Typography = Record<keyof typeof typography, FontStyles>;
