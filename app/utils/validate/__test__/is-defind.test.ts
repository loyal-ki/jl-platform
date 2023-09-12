import {isDefined} from '@utils/validate/is-defined';

describe('isDefined', () => {
    it('returns true for defined values', () => {
        expect(isDefined('')).toBe(true);
        expect(isDefined(0)).toBe(true);
        expect(isDefined(false)).toBe(true);
    });

    it('returns false for undefined or null values', () => {
        expect(isDefined(undefined)).toBe(false);
        expect(isDefined(null)).toBe(false);
    });
});
