'use client'

import { ArrowRight } from 'lucide-react'

interface LoadingButtonProps {
    isLoading: boolean;
    loadingText: string;
    defaultText: string;
}


export default function LoadingButton({ 
    isLoading, 
    loadingText, 
    defaultText 
  }: LoadingButtonProps) {
    return (
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center disabled:bg-blue-400"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingText}
          </span>
        ) : (
          <span className="flex items-center">
            {defaultText} <ArrowRight className="ml-2" size={16} />
          </span>
        )}
      </button>
    );
  }