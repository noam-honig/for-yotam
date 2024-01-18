import { remultExpress } from 'remult/remult-express'
import { AuthController } from '../components/user/auth-controller'
import { initRequest } from './server-session'
import { User } from '../components/user/user'
import { Organization } from '../shared/organization'
import { OrganizationPerson } from '../shared/organizationPeople'
import { EventParticipant } from '../shared/event-participants'
import { Event } from '../shared/event'

export const entities = [
  User,
  Organization,
  OrganizationPerson,
  Event,
  EventParticipant,
]

export const api = remultExpress({
  initRequest,
  entities,
  controllers: [AuthController],
})
