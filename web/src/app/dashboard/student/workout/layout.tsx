import { SetStateFromJwt } from "@/app/login/fn";
import { UserStore } from "@/lib/state/user-store";

const WorkoutStudentLatyout = ({ children }: { children: React.ReactNode; }) => {
    // SetStateFromJwt();
    return (
        <div>
            {children}
        </div>
    );
};

export default WorkoutStudentLatyout;