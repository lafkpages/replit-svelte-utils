import { Roles } from '@replit-svelte/types';
import type { Variant, RawUser, Role, User, Modal, ModalEvent } from '@replit-svelte/types';

export const evalbot =
  'https://i0.wp.com/replit.com/public/images/evalbot/evalbot_29.png';

export const roleIdToKey = Object.fromEntries(
  Object.entries(Roles).map(([k, v]) => [v, k])
);

export const roleColors = {
  '1': 'yellow',
  '2': 'blue',
  '3': 'pink'
};

export const roleNames = {
  '3': 'Early Access'
};

export function getRoleName(id: string): string | null {
  return roleNames[id] || roleIdToKey[id] || null;
}

export function getRoleColor(id: string): Variant {
  return roleColors[id] || 'grey';
}

export function parseRawRoleIds(raw: string | RawUser) {
  if (typeof raw != 'string') {
    raw = raw.roles;
  }

  return raw?.split(',').filter((role) => role) || [];
}

export function parseRawRoles(raw: string | RawUser): Role[] {
  const roleIds = parseRawRoleIds(raw);

  return roleIds.map((roleId) => ({
    id: roleId,
    key: roleIdToKey[roleId],
    name: getRoleName(roleId),
    color: getRoleColor(roleId)
  }));
}

export function hasRole(user: User | null, roleToFind: string | Role) {
  if (!user) {
    return false;
  }

  if (typeof roleToFind != 'string') {
    roleToFind = roleToFind.id;
  }

  return user.roles.some((role: Role) => role.id == roleToFind);
}

export default function showModal(modal: Modal) {
  const event: ModalEvent = new CustomEvent('showModal', {
    detail: modal
  });

  window?.dispatchEvent(event);

  return event;
}

export function showCreateReplModal() {
  const event: ModalEvent = new CustomEvent('showModal', {
    detail: 'createReplModal'
  });

  window?.dispatchEvent(event);

  return event;
}
