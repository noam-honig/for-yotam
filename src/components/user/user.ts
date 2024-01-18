import { Allow, Entity, Fields, Relations, Validators, remult } from 'remult'
import { Roles } from './roles'
import { OrganizationPerson } from '../../shared/organizationPeople'
import { EventParticipant } from '../../shared/event-participants'

@Entity('users', {
  allowApiCrud: Roles.admin,
  // The next two options, allow for a user to see only their data, and for an admin to see all users
  allowApiRead: Allow.authenticated,
  apiPrefilter: () => ({
    id: remult.isAllowed(Roles.admin) ? undefined : remult.user!.id,
  }),
})
export class User {
  @Fields.cuid()
  id = ''

  @Fields.string({
    validate: [Validators.required],
  })
  name = ''

  @Fields.string({
    validate: [Validators.required, Validators.uniqueOnBackend],
  })
  username = ''

  @Fields.string({ includeInApi: false })
  password = ''

  @Fields.boolean({ includeInApi: false })
  admin = false

  @Fields.createdAt()
  createdAt = new Date()

  @Relations.toMany(() => OrganizationPerson, 'user')
  organizations?: OrganizationPerson[]
  @Relations.toMany(() => EventParticipant, 'user')
  events?: EventParticipant[]
}

export const userRepo = remult.repo(User)
