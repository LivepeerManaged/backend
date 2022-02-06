export class BaseError extends Error {
    parameter: Map<string, any>;
    constructor(name: string, message: string, parameter: [string, any][]) {
        super(message);
        this.name = name;
        this.parameter = new Map<string, any>(parameter);
    }
}