


interface ErrorMessageProps {
    type: "validate" | "required",
    message: string;
}


export function ErrorMessage({ type, message }: ErrorMessageProps) {



    return (
        <p className='text-red-500 text-xs'>{message}</p>
    );
}