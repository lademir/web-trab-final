import { User } from "@/models/user";

type NavButton = {
	label: string;
	href: string;
	roles: string[];
};

const STUDENT = "student";
const ADMIN = "admin";
const TRAINER = "trainer";
const USER = "user";

export function hasRoles(roles: string[], userRoles: string[]) {
	return roles.some((role) => userRoles.includes(role));
}

export const navButtons: NavButton[] = [
	{
		label: "Treinar",
		href: "/dashboard/train",
		roles: [STUDENT],
	},
	{
		label: "Meus dados antropometricos",
		href: "/dashboard/workouts",
		roles: [STUDENT],
	},
	{
		label: "Minhas estatísticas",
		href: "/dashboard/stats",
		roles: [STUDENT],
	},
	{
		label: "Meu histórico",
		href: "/dashboard/history",
		roles: [STUDENT],
	},
	{
		label: "Configurações",
		href: "/dashboard/settuings",
		roles: [ADMIN, TRAINER, STUDENT],
	},
];
