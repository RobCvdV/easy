import { isDefined, Value } from '../../types';
import moment, { Moment } from 'moment';
import { ifDefined } from '../../utils';

export class DateTime extends Value<string | undefined> {
  constructor(value: string | number | Date) {
    super(ifDefined(value, moment(value, true).toISOString()));
  }

  static get now(): DateTime {
    return new DateTime(moment().toISOString());
  }

  protected get moment(): Moment {
    return moment(this.value, true);
  }

  get isValid(): boolean {
    return isDefined(this.value) && this.moment.isValid();
  }

  get fromNow(): string {
    return this.value ? this.moment.fromNow() : '';
  }

  isAfter(dt: DateTime): boolean {
    return this.moment.isAfter(dt.moment);
  }

  toString(): string {
    return this.value ?? '';
  }
}
