import User from "./User";

export enum Roles {
  GoodKnight = "Good Knight",
  BadKnight = "Bad Knight",
  Assassin = "Assassin",
  Merlin = "Merlin",
  Percival = "Percival",
  Morgana = "Morgana",
  Minion = "Minion",
  MerlinOrMorgana = "Merlin or Morgana",
}

export enum GoodRoles {
  GoodKnight = "Good Knight",
  Merlin = "Merlin",
  Percival = "Percival",
}

export enum BadRoles {
  BadKnight = "Bad Knight",
  Morgana = "Morgana",
  Minion = "Minion",
}

export function getKnownRoles(user: User | undefined, users: User[]) {
  if (!user) {
    return [];
  }
  const knownRoles: User[] = [];
  const role = user.role;
  const _id = user._id;
  if (
    role === Roles.Merlin ||
    role === Roles.BadKnight ||
    role === Roles.Assassin ||
    role === Roles.Morgana ||
    role === Roles.Minion
  ) {
    users.forEach((user: User) => {
      if (_id !== user._id && isBad(user)) {
        knownRoles.push(user);
      }
    });
  } else if (role === Roles.Percival) {
    users.forEach((user: User) => {
      if (
        _id !== user._id &&
        (user.role === Roles.Merlin || user.role === Roles.Morgana)
      ) {
        user.role = Roles.MerlinOrMorgana;
        knownRoles.push(user);
      }
    });
  }
  return knownRoles;
}

export function isBad(user: User) {
  const role = user.role;
  return (
    role === Roles.BadKnight ||
    role === Roles.Assassin ||
    role === Roles.Morgana
  );
}

export default Roles;
