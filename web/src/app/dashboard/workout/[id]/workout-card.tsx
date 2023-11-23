import { Card, CardContent } from "@/components/ui/card";

export const WorkoutCard = ({ children }: { children: React.ReactNode; }) => {
    return (
        <Card className="bg-slate-800 border-none text-slate-50">
            <CardContent className="p-5">
                {children}
            </CardContent>
        </Card>
    );
};