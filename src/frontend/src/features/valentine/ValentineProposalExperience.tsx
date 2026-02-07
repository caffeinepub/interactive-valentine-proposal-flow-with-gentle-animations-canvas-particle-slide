import { useState } from 'react';
import { ProposalScreen } from './screens/ProposalScreen';
import { FinalLoveMessageScreen } from './screens/FinalLoveMessageScreen';
import { LongEmotionalMessageScreen } from './screens/LongEmotionalMessageScreen';
import { ParticleSlideshowModule } from '../particleSlideshow/ParticleSlideshowModule';
import './valentine.css';

type Step = 'proposal' | 'finalMessage' | 'longMessage' | 'particleShow';

export function ValentineProposalExperience() {
  const [currentStep, setCurrentStep] = useState<Step>('proposal');

  return (
    <div className="valentine-experience">
      {currentStep === 'proposal' && (
        <ProposalScreen onYesClick={() => setCurrentStep('finalMessage')} />
      )}
      
      {currentStep === 'finalMessage' && (
        <FinalLoveMessageScreen onNext={() => setCurrentStep('longMessage')} />
      )}
      
      {currentStep === 'longMessage' && (
        <LongEmotionalMessageScreen onHeartClick={() => setCurrentStep('particleShow')} />
      )}
      
      {currentStep === 'particleShow' && <ParticleSlideshowModule />}
    </div>
  );
}
