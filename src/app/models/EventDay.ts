import { Day } from './Day';
import { User } from './User';
import { Event } from './Event';
import { Equipament } from './Equipament';

export class EventDay {
  public id?: number;
  public day?: Day;
  public user?: User;
  public event?: Event;
  public equipament?: Equipament;
  public startHour?: Date;
  public finishHour?: Date;
  public observation?: string;
  public status?: string;
}
