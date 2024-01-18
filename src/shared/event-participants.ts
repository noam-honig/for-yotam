import { Entity, Field, Fields, Relations } from 'remult'
import { User } from '../components/user/user'
import { Event } from './event'
@Entity('event-participants', {
  allowApiCrud: true,
  id: { event: true, user: true },
})
export class EventParticipant {
  @Relations.toOne(() => Event)
  event?: Event
  @Relations.toOne(() => User)
  user?: User
  @Fields.boolean()
  owner = false
}
