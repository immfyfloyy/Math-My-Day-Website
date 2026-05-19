/**
 * In-memory user store. Will be replaced by a real database in a future phase.
 *
 * NOTE: data is lost on server restart and is not shared across processes.
 * Suitable for development only.
 */

export interface StoredUser {
  id: string
  fullname: string
  email: string
  phone: string
  education: string
  passwordHash: string
  createdAt: Date
}

export interface CreateUserInput {
  fullname: string
  email: string
  phone: string
  education: string
  passwordHash: string
}

const users = new Map<string, StoredUser>()

function nextId(): string {
  return crypto.randomUUID()
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const normalized = email.trim().toLowerCase()
  for (const user of users.values()) {
    if (user.email === normalized) return user
  }
  return undefined
}

export function createUser(input: CreateUserInput): StoredUser {
  const user: StoredUser = {
    id: nextId(),
    fullname: input.fullname.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    education: input.education,
    passwordHash: input.passwordHash,
    createdAt: new Date(),
  }
  users.set(user.id, user)
  return user
}

export function listUsers(): ReadonlyArray<StoredUser> {
  return Array.from(users.values())
}
