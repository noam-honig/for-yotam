import { Entity, Fields, Relations } from 'remult'
import { Organization } from './organization'

@Entity('events', { allowApiCrud: true })
export class Event {
  @Fields.cuid()
  id = ''
  @Relations.toOne(() => Organization)
  organization?: Organization
  @Fields.string()
  name = ''
}
