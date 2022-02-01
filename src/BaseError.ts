export class BaseError extends Error {
    parameter: Map<string, any>
    constructor(message: string, parameter: [string, any][]) {
        super(message);
        this.parameter = new Map<string, any>(parameter);
    }
}