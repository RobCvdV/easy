import { json, Json, List, ofGet } from '../types';
import { Property, PropertyOptions, toProperties, toProperty } from './Property';

export class Map<P extends Property = Property> {
  constructor(private props?: List<[string, P]>) {}

  get properties(): List<[string, P]> {
    return this.props ?? (this.props = toProperties(this));
  }

  get keys(): List<string> {
    return this.properties.map(([k]) => k);
  }

  get columns(): List<string> {
    return this.properties.map(([, p]) => p.name);
  }

  private get dropped(): List<string> {
    return this.columns.filter(c => !this.keys.some(k => k === c));
  }

  toString(): string {
    return this.constructor.name;
  }

  prop = <T = unknown>(name: string, options?: PropertyOptions<T>): Property => toProperty(this, name, options);

  in = (from: Json = {}): Json =>
    json.omit(
      this.properties.reduce((a: any, [k, p]: [string, P]) => this.copyIn(a, k, p), from),
      ...this.dropped
    );

  out = (to: Json = {}): Json =>
    json.omit(
      this.properties.reduce((a: any, [k, p]: [string, P]) => ({ ...a, [p.name]: p.options?.convert?.from(a[k]) }), to),
      ...this.keys
    );

  private copyIn = (subject: Json, key: string, prop: Property): Json => {
    const target: any = { ...subject };
    target[key] = prop.options?.convert?.to(subject[prop.name] ?? ofGet(prop.options?.dflt));
    return target;
  };
}
