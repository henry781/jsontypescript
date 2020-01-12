import {ConverterDefinition, CustomConverter, CustomConverterOptions} from './CustomConverter';

export class AnyConverter extends CustomConverter {

    public deserialize(json: any, options: CustomConverterOptions): any {
        return this.deepCopy(json);
    }

    public serialize(obj: any, options: CustomConverterOptions): any {
        return this.deepCopy(obj);
    }

    protected deepCopy(obj: any): any {
        // TODO : deep copy is not implement for now
        return obj;
    }
}

export function any(): ConverterDefinition {
    return {converter: AnyConverter};
}