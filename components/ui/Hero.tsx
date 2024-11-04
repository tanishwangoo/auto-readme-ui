import React from 'react';
import { Book } from 'lucide-react';

export function Hero() {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6">
        <Book className="w-16 h-16 text-primary animate-float" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-in">
        Auto README Generator
      </h1>
      <p className="text-neutral text-lg md:text-xl max-w-2xl mx-auto">
        Create beautiful documentation automatically.
      </p>
    </div>
  );
}