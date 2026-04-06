
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN 🇬🇧' },
  { code: 'tr', label: 'TR 🇹🇷' },
  { code: 'fr', label: 'FR 🇫🇷' },
  { code: 'ar', label: 'AR 🇦🇪' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage, isRTL } = useLanguage();

  const currentLang = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:text-accent hover:bg-primary/5 transition-colors duration-200 font-medium"
        >
          <Globe className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {currentLang.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"} className="bg-primary text-primary-foreground border-primary-foreground/10">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer hover:bg-accent hover:text-primary transition-colors ${
              language === lang.code ? 'bg-primary-foreground/10 text-accent' : ''
            } ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
