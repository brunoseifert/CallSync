import Image from "next/image";

export default function Header() {
    return (
        <>
        <div className="flex flex-row items-center bg-slate-500 p-4">
            <Image src="/logo.svg" alt="logo" width={110} height={110} />
        </div>
        </>
    );
    }