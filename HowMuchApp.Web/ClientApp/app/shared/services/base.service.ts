import { Observable } from 'rxjs/Rx';


export abstract class BaseService {

    constructor() { }

    protected handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');

        // either applicationError in header or model error in body
        if (applicationError) {
            return Observable.throw(applicationError);
        }
        var serverError = error.json();

        var result = null;
        if (serverError.length == 0)
            result = null
        else
            result = serverError;

        return Observable.throw(result || 'Server error');
    }
}
