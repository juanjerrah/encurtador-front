'use client';
import { Globe } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'
import LoadingButton from './components/loadingButton';
import { shortenUrl } from './lib/url-service';

export default function Home() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Por favor, insira uma URL');
      return;
    }


    // Validação simples de URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('URL deve começar com http:// ou https://');
      return;
    }

    setIsLoading(true);

    try {
      // Chamada ao serviço para encurtar a URL
      const shortId: string = await shortenUrl(url);
      // Navega para a página de resultados com o ID curto
      router.push(`/result/${shortId}`);
    } catch (err) {
      setError('Erro ao encurtar a URL. Tente novamente.');
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <div className="flex items-center justify-center mb-6">
          <Globe className="text-blue-600 mr-2" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Encurtador de URL</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL Original
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemplo.com/pagina-com-url-muito-longa"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <LoadingButton
            isLoading={isLoading}
            loadingText="Processando..."
            defaultText="Encurtar"
          />
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Encurte, compartilhe e acompanhe suas URLs com facilidade.
          </p>
        </div>

      </div>
    </div>
  );
}
