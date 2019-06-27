import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

export type Operation<T> =
  (storedData?: Array<T>, optData?: T) => Observable<Array<T>>

export type Source$<T> = Observable<Payload<T>>
  | Subject<Payload<T>>
  | BehaviorSubject<Payload<T>>
  | ReplaySubject<Payload<T>>

export interface DataModuleDetails<T> {
  module: string;
  get: Operation<T>;
  del: Operation<T>;
  update: Operation<T>;
  post: Operation<T>;
  source: Source$<T>;
}

export interface Payload<T> {
  module: string;
  type: 'GET' | 'POST' | 'DELETE' | 'UPDATE';
  data: T;
}

