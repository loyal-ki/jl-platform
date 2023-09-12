import {
    isValidEmail,
    isValidPassword,
    isValidUrl,
    isNilOrEmpty,
    isNilOrNaN,
} from '@app/utils/validate/validate-form';

describe('validate-form', () => {
    describe('isValidEmail', () => {
        it('returns true for valid emails', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('test.test@example.com')).toBe(true);
        });

        it('returns false for invalid emails', () => {
            expect(isValidEmail('test')).toBe(false);
            expect(isValidEmail('test@')).toBe(false);
            expect(isValidEmail('test@example')).toBe(false);
        });
    });

    describe('isValidPassword', () => {
        it('should return true for valid passwords', () => {
            expect(isValidPassword('Password123')).toBe(true);
        });

        it('should return false for invalid passwords', () => {
            expect(isValidPassword('password')).toBe(false);
        });
    });

    describe('isValidUrl', () => {
        it('should return true for valid URLs', () => {
            expect(isValidUrl('http://example.com')).toBe(true);
        });

        it('should return false for invalid URLs', () => {
            expect(isValidUrl('invalid url')).toBe(false);
        });
    });

    describe('isNilOrEmpty', () => {
        it('should return true for null or empty strings', () => {
            expect(isNilOrEmpty('')).toBe(true);
            expect(isNilOrEmpty(null)).toBe(true);
        });

        it('should return false for non-empty strings', () => {
            expect(isNilOrEmpty('not empty')).toBe(false);
        });
    });

    describe('isNilOrNaN', () => {
        it('should return true for null, empty strings, or NaN', () => {
            expect(isNilOrNaN('')).toBe(true);
            expect(isNilOrNaN(null)).toBe(true);
            expect(isNilOrNaN(undefined)).toBe(true);
        });

        it('should return false for non-empty strings and numbers', () => {
            expect(isNilOrNaN('not empty')).toBe(false);
            expect(isNilOrNaN('123')).toBe(false);
        });
    });
});
