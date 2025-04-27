'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUrlData, URLData } from '../../lib/url-service';
import CopyButton from '../../components/copyButton';
import {
    ArrowLeft,
    BarChart2,
    Clock,
    ExternalLink,
    Eye,
    Share2
} from 'lucide-react';
import { Header } from '@/app/ui/header';

export default function ResultPage({ params }: { params: { shortId: string } }) {
    const [urlData, setUrlData] = useState<URLData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stats');

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        async function loadUrlData() {
            try {
                const data = await getUrlData(params.shortId);
                setUrlData(data);
            } catch (error) {
                console.error('Error loading URL data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadUrlData();
    }, [params.shortId]);

    const shareUrl = () => {
        if (navigator.share && urlData) {
            navigator.share({
                title: 'URL Encurtada',
                text: 'Confira este link:',
                url: `https://${urlData.shortUrl}`
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600">Carregando informações da URL...</p>
                </div>
            </div>
        );
    }

    if (!urlData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <h1 className="text-xl font-bold text-red-600 mb-2">URL não encontrada</h1>
                    <p className="text-gray-600 mb-4">Não foi possível encontrar informações para esta URL encurtada.</p>
                    <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <ArrowLeft size={16} className="mr-2" /> Voltar para o início
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main */}
            <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-6">
                {/* URL Card */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <div className="mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">URL Encurtada</h2>
                                <p className="text-sm text-gray-500">Criada em {urlData.createdAt}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={shareUrl}
                                    className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                >
                                    <Share2 size={18} className="text-gray-700" />
                                    <span className="ml-1 text-sm">Compartilhar</span>
                                </button>
                                <a
                                    href={`https://${urlData.shortUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition"
                                >
                                    <ExternalLink size={18} />
                                    <span className="ml-1 text-sm">Visitar</span>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-grow md:w-2/3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Original</label>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3  text-gray-400 font-medium truncate">
                                    {urlData.originalUrl}
                                </div>
                            </div>
                            <div className="md:w-1/3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Encurtada</label>
                                <div className="flex">
                                    <div className="flex-grow bg-blue-50 border border-blue-200 text-blue-700 rounded-l-lg p-3 font-medium">
                                        {urlData.shortUrl}
                                    </div>
                                    <CopyButton
                                        text={urlData.shortUrl}
                                        className="bg-blue-100 hover:bg-blue-200 border-y border-r border-blue-200 rounded-r-lg px-3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Clock size={16} className="mr-1" />
                                <span>Expira em: {urlData.expiresAt}</span>
                            </div>
                            <div className="flex items-center">
                                <Eye size={16} className="mr-1" />
                                <span>{urlData.stats.views} visualizações</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="bg-white rounded-xl shadow">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('stats')}
                            >
                                <BarChart2 size={18} className="mr-2" />
                                Estatísticas
                            </button>
                            <button
                                className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'qrcode' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('qrcode')}
                            >
                                <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <rect x="7" y="7" width="3" height="3"></rect>
                                    <rect x="14" y="7" width="3" height="3"></rect>
                                    <rect x="7" y="14" width="3" height="3"></rect>
                                    <rect x="14" y="14" width="3" height="3"></rect>
                                </svg>
                                QR Code
                            </button>
                            <button
                                className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                                Configurações
                            </button>
                        </nav>
                    </div>


                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Estatisticas */}
                        {activeTab === 'stats' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Total de Cliques</h3>
                                        <p className="text-2xl font-bold text-blue-600">{urlData.stats.views}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Visitantes Únicos</h3>
                                        <p className="text-2xl font-bold text-blue-600">{urlData.stats.uniqueVisitors}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Taxa de Conversão</h3>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {Math.round((urlData.stats.uniqueVisitors / urlData.stats.views) * 100)}%
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Cliques Recentes</h3>
                                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispositivo</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {urlData.stats.recentClicks.map((click, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-3 text-sm text-gray-600">{click.time}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">{click.location}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">{click.device}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* QRCODE */}
                        {activeTab === 'qrcode' && (
                            <div className="flex flex-col items-center">
                                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                                        {/* Placeholder para QR Code */}
                                        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                                            <rect width="160" height="160" fill="white" />
                                            <rect x="32" y="32" width="96" height="96" fill="#333" />
                                            <rect x="48" y="48" width="16" height="16" fill="white" />
                                            <rect x="96" y="48" width="16" height="16" fill="white" />
                                            <rect x="48" y="96" width="16" height="16" fill="white" />
                                            <rect x="72" y="72" width="16" height="16" fill="white" />
                                            <rect x="32" y="32" width="32" height="32" stroke="white" strokeWidth="4" fill="none" />
                                            <rect x="96" y="32" width="32" height="32" stroke="white" strokeWidth="4" fill="none" />
                                            <rect x="32" y="96" width="32" height="32" stroke="white" strokeWidth="4" fill="none" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">Escaneie este QR code para acessar a URL encurtada</p>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                                        Baixar QR Code
                                    </button>
                                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition">
                                        Personalizar
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Configurações */}
                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Configurações de URL</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Título personalizado
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                placeholder="Nome para facilitar identificação"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Data de expiração
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                                                <option>1 ano (padrão)</option>
                                                <option>6 meses</option>
                                                <option>3 meses</option>
                                                <option>1 mês</option>
                                                <option>1 semana</option>
                                                <option>Nunca expirar</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="password-protection"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="password-protection" className="ml-2 block text-sm text-gray-700">
                                                Adicionar proteção por senha
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="track-clicks"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                defaultChecked
                                            />
                                            <label htmlFor="track-clicks" className="ml-2 block text-sm text-gray-700">
                                                Rastrear cliques e estatísticas
                                            </label>
                                        </div>

                                        <div className='flex justify-end'>
                                            <button className='bg-blue-700 px-3 py-2 text-white rounded-lg cursor-pointer hover:bg-blue-600'>
                                                Salvar Alterações
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <footer className="shadow fixed bottom-0 w-full bg-white text-gray-500 text-center text-sm p-4">
                Juan Jerrah © {currentYear} Encurtador de URL <br /> Todas as URLs encurtadas são válidas por 1 ano
            </footer>
        </div>
    )
}
