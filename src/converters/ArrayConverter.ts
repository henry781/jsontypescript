import {JsonConverterError} from '../core/JsonConverterError';
import {ensureConverterDefinition} from '../util/ConverterDefinitionUtil';
import {Type} from '../util/JsonConverterUtil';
import {ConverterDefinition, CustomConverter, CustomConverterOptions} from './CustomConverter';

export class ArrayConverter extends CustomConverter<any[], ArrayConverterOptions> {

    public deserialize<T>(json: any, options: ArrayConverterOptions): T[] {

        if (!Array.isArray(json)) {
            const errorMessage = 'Fail to deserialize, given json is not an array';
            throw new JsonConverterError(errorMessage);
        }

        return json.map((entry, index) => {
            try {
                return this.converter.processDeserialize(entry, options.itemConverter) as T;
            } catch (err) {
                const errorMessage = `Fail to deserialize index <${index}> of array`;
                throw new JsonConverterError(errorMessage, index, err);
            }
        });
    }

    public serialize<T>(obj: T[], options: ArrayConverterOptions): any {

        return obj.map((entry, index) => {
            try {
                return this.converter.processSerialize(entry, options.itemConverter);
            } catch (err) {
                const errorMessage = `Fail to serialize index <${index}> of array`;
                throw new JsonConverterError(errorMessage, index, err);
            }
        });
    }
}

export interface ArrayConverterOptions extends CustomConverterOptions {
    itemConverter: ConverterDefinition;
}

export function arrayOf(itemTypeOrConverter: Type | ConverterDefinition): ConverterDefinition {
    return {
        converter: ArrayConverter,
        options: {itemConverter: ensureConverterDefinition(itemTypeOrConverter)} as ArrayConverterOptions,
    };
}
