import { Entity, Fields, Relations } from 'remult'
import { Organization } from './organization'
import { User } from '../components/user/user'

@Entity<OrganizationPerson>('organizationPeople', {
  allowApiCrud: true,
  id: { organization: true, user: true },
})
export class OrganizationPerson {
  @Relations.toOne(() => Organization)
  organization?: Organization
  @Relations.toOne(() => User)
  user?: User
  @Fields.boolean()
  admin = false
  @Fields.boolean()
  canAddEvents = false
}
