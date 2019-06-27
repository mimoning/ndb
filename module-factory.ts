import { Observable } from 'rxjs';
import { filter, concatMap, tap } from 'rxjs/operators';

import { Operation, DataModuleDetails, Payload, Source$ } from './typings';
import { GET } from './controller';

class DataModule<T> {
  readonly module: string;
  private source$: Source$<T>;
  private GET: Operation<T>;
  private DELETE: Operation<T>;
  private UPDATE: Operation<T>;
  private POST: Operation<T>;
  private storedData: Array<T>;
  private initialized: boolean = false;

  public stream: Observable<Array<T>>;

  constructor(arg: DataModuleDetails<T>) {
    this.module = arg.module;

    this.source$ = arg.source;

    this.GET = arg.get;
    this.DELETE = arg.del;
    this.UPDATE = arg.update;
    this.POST = arg.post;

    this.activate();
  }

  private activate(): void {
    this.stream = this.source$.pipe(
      filter(({ module }: Payload<T>) => (module === this.module)),
      concatMap(({ type, data }) => this[type](this.storedData, data)),
      tap(d => { this.storedData = d }),
    );

    this.stream.subscribe = (...args) => {
      const subscription = Observable.prototype.subscribe.bind(this.stream)(...args);
      if (!this.initialized) {
        this.initialized = true;
        GET(this.module);
      }
      return subscription;
    }
  }
}

export default DataModule;
