import { lists, todos } from "@/server/db/schema";

export const USER_ROLE = { USER: "User", ADMIN: "Admin" } as const;
type ObjectValues<T> = T[keyof T];
export type UserRole = ObjectValues<typeof USER_ROLE>;

export type TodoType = typeof todos.$inferSelect;
export type ListType = typeof lists.$inferSelect;
