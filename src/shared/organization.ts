import { Entity, Fields, Relations } from 'remult'
import { OrganizationPerson } from './organizationPeople'
import { Event } from './event'

@Entity('organizations', {
  allowApiCrud: true,
})
export class Organization {
  @Fields.cuid()
  id = ''
  @Fields.string()
  name = ''
  @Relations.toMany(() => OrganizationPerson, 'organization')
  people?: OrganizationPerson[]
  @Relations.toMany<Organization, Event>(() => Event, 'organization')
  events?: Event[]
}
