


interface WorkoutCardAvatarProps {
    children: React.ReactNode;
    className?: string;
}


export const WorkoutCardAvatar = ({ children, className }: WorkoutCardAvatarProps) => {
    return (
        <div className={`bg-slate-700 max-w-fit max-h-fit py-3 px-5 rounded-full font-bold text-2xl ${className}`}>
            {children}
        </div>
    );
};