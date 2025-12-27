import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductFinder: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    age: '',
    occasion: '',
    budget: '',
    type: '',
  });

  const steps = [
    {
      key: 'age' as const,
      label: t.finder.ageLabel,
      options: Object.entries(t.finder.ages).map(([key, label]) => ({ key, label })),
    },
    {
      key: 'occasion' as const,
      label: t.finder.occasionLabel,
      options: Object.entries(t.finder.occasions).map(([key, label]) => ({ key, label })),
    },
    {
      key: 'budget' as const,
      label: t.finder.budgetLabel,
      options: Object.entries(t.finder.budgets).map(([key, label]) => ({ key, label })),
    },
    {
      key: 'type' as const,
      label: t.finder.typeLabel,
      options: Object.entries(t.finder.types).map(([key, label]) => ({ key, label })),
    },
  ];

  const handleSelect = (key: keyof typeof selections, value: string) => {
    setSelections({ ...selections, [key]: value });
    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams(selections);
    navigate(`/shop?${params.toString()}`);
  };

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="bg-card rounded-3xl p-6 lg:p-10 shadow-soft">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-accent/50 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          {t.finder.title}
        </div>
        <p className="text-muted-foreground">{t.finder.subtitle}</p>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-muted rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Navigation */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {steps.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setStep(i)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              i === step
                ? 'bg-primary text-primary-foreground'
                : i < step && selections[s.key]
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center text-xs">
              {i + 1}
            </span>
            {selections[s.key] ? (
              <span className="hidden sm:inline">
                {s.options.find((o) => o.key === selections[s.key])?.label}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Current Question */}
      <div className="mb-8">
        <h3 className="font-display text-xl lg:text-2xl font-semibold mb-6">
          {currentStep.label}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {currentStep.options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSelect(currentStep.key, option.key)}
              className={`p-4 rounded-xl border-2 text-left transition-all hover-lift ${
                selections[currentStep.key] === option.key
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleSearch}
          disabled={!Object.values(selections).some(Boolean)}
          className="px-8 gap-2"
        >
          {t.finder.findButton}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductFinder;
