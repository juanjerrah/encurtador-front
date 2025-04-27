import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
                <Link href="/" className="mr-4 text-gray-600 hover:text-gray-900 flex items-center">
                    <ArrowLeft size={20} />
                    <span className="ml-1 hidden sm:inline">Voltar</span>
                </Link>
                <h1 className="text-xl font-bold text-gray-800 flex-grow">URL Encurtada com Sucesso</h1>
            </div>
        </header>
    );
}