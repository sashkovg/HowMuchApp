import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
    transform(value: any, arg: string): any {
        let keys = [];
        for (let key in value) {
            if (key.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                keys.push({ key: key, value: value[key] });
            }
        }
        return keys;
    }
}
