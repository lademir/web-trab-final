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
		href: "/dashboard/student/workout",
		roles: [STUDENT],
	},
	// {
	// 	label: "Meus dados antropometricos",
	// 	href: "/dashboard/workouts",
	// 	roles: [STUDENT],
	// },
	// {
	// 	label: "Minhas estatísticas",
	// 	href: "/dashboard/stats",
	// 	roles: [STUDENT],
	// },
	{
		label: "Meu histórico",
		href: "/dashboard/student/history",
		roles: [STUDENT],
	},
	{
		label: "Alunos",
		href: "/dashboard/admin/students",
		roles: [ADMIN],
	},
	{
		label: "Treinadores",
		href: "/dashboard/admin/trainers",
		roles: [ADMIN],
	},

	{
		label: "Treinos",
		href: "/dashboard/trainer/workouts",
		roles: [TRAINER],
	},

	{
		label: "Exercícios",
		href: "/dashboard/trainer/exercises",
		roles: [TRAINER],
	},
	{
		label: "Configurações",
		href: "/dashboard/settings",
		roles: [ADMIN, TRAINER, STUDENT],
	},
];
