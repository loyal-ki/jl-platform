export class ValidationResult<T> {
    static ok = <Meta>(): ValidationResult<Meta> => {
        return new ValidationResult(true, undefined);
    };

    static error = <Meta>(errorMessage: string): ValidationResult<Meta> => {
        return new ValidationResult(false, errorMessage);
    };

    isValid: boolean;

    errorMessage: string | undefined;

    meta?: T;

    constructor(isValid: boolean, errorMessage: string | undefined, meta?: T) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
        this.meta = meta;
    }
}
