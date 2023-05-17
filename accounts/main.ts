import { getGroups, getUsers } from "https://github.com/puffycid/artemis-api/mod.ts";
import { Groups, Users } from "https://github.com/puffycid/artemis-api/src/macos/accounts.ts";

interface Accounts {
  users: Users[];
  groups: Groups[];
}

/**
 * Simple function to gather all local users and groups on a macOS system
 * @returns All local users and groups on a macOS system
 */
function main() {
  const users = getUsers();
  const groups = getGroups();

  const accounts: Accounts = {
    users,
    groups,
  };

  return accounts;
}

main();
