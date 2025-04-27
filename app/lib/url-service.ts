export interface URLStats {
    views: number;
    uniqueVisitors: number;
    countries: { name: string; count: number }[];
    devices: { name: string; count: number }[];
    recentClicks: { time: string; location: string; device: string }[];
}

// Interface para dados da URL
export interface URLData {
    originalUrl: string;
    shortId: string;
    shortUrl: string;
    createdAt: string;
    expiresAt: string;
    stats: URLStats;
}

export async function shortenUrl(originalUrl: string): Promise<string> {
    // Simula uma chamada de API
    return new Promise((resolve) => {
        setTimeout(() => {
            // Gera um ID curto aleatório
            const shortId = Math.random().toString(36).substring(2, 8);
            resolve(shortId);
        }, 1000);
    });
}

// Função mock para obter dados da URL (em produção, seria uma chamada à API)
export async function getUrlData(shortId: string): Promise<URLData> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dados simulados
      resolve({
        originalUrl: "https://exemplo.com/artigo/como-utilizar-tecnologias-modernas-para-desenvolvimento-web-em-2025-novas-tendencias",
        shortId,
        shortUrl: `short.url/${shortId}`,
        createdAt: "27 de Abril, 2025",
        expiresAt: "27 de Abril, 2026",
        stats: {
          views: 142,
          uniqueVisitors: 87,
          countries: [
            { name: "Brasil", count: 64 },
            { name: "Portugal", count: 12 },
            { name: "Estados Unidos", count: 8 },
            { name: "Outros", count: 3 }
          ],
          devices: [
            { name: "Mobile", count: 95 },
            { name: "Desktop", count: 38 },
            { name: "Tablet", count: 9 }
          ],
          recentClicks: [
            { time: "Hoje, 14:32", location: "São Paulo, BR", device: "Android" },
            { time: "Hoje, 13:15", location: "Lisboa, PT", device: "iPhone" },
            { time: "Hoje, 11:47", location: "Rio de Janeiro, BR", device: "Windows" },
            { time: "Ontem, 22:05", location: "Porto Alegre, BR", device: "MacOS" }
          ]
        }
      });
    }, 500);
  });
}


