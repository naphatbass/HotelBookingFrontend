'use client'

export default function InteractiveCard({children}:{children:React.ReactNode}) {

    return(
        <div className="shadow-lg m-[20px] bg-white rounded-lg w-[400px] h-[350px] hover:shadow-2xl hover:rounded-lg hover:bg-neutral-200">
            {children}
        </div>
    );
}
