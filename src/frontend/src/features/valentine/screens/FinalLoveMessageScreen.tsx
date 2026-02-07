import { Button } from '@/components/ui/button';

interface FinalLoveMessageScreenProps {
  onNext: () => void;
}

export function FinalLoveMessageScreen({ onNext }: FinalLoveMessageScreenProps) {
  return (
    <div className="message-screen">
      <div className="message-content space-y-12">
        <div className="message-text">
          thank you... thank you my love for accepting me as your valentine..
          <br />
          i am crying with happiness because of you my sweet pisasu 😭....
          <br />
          with all my love i will make you forget the worst things happened to you till now
          <br />
          my dear vincy
        </div>

        <Button
          onClick={onNext}
          size="lg"
          className="mx-auto block text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-md hover:shadow-glow-lg transition-all duration-700"
        >
          Next 💌
        </Button>
      </div>
    </div>
  );
}
