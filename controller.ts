import { Subject } from 'rxjs';
import { Payload } from './typings';
import { filter } from 'rxjs/operators';

const controller$ = new Subject<Payload<any>>();

function operate(
  type: 'GET' | 'UPDATE' | 'DELETE' | 'POST',
  module?: string, data?: string): void {
  controller$.next({ type, module, data });
}

const GET = (...args) => operate('GET', ...args);
const UPDATE = (...args) => operate('UPDATE', ...args);
const DELETE = (...args) => operate('DELETE', ...args);
const POST = (...args) => operate('POST', ...args);

export default controller$;

export {
  GET, UPDATE, DELETE, POST,
};
