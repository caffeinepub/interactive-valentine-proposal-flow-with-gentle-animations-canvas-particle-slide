import { HeartOnlyButton } from '../components/HeartOnlyButton';

interface LongEmotionalMessageScreenProps {
  onHeartClick: () => void;
}

export function LongEmotionalMessageScreen({ onHeartClick }: LongEmotionalMessageScreenProps) {
  const message = `sometimes i would be very nervous that what if you don't like me ?? and what if i am disturbing you ??? kind of feelings will cross my mind offen but i will come across it.24th november 2025 is a very special day for me girl because of you.i..love.. you my vincy your anger,your happiness,your eyes...etc etc everything i love it and i wanna admire it till the end of the life please give me a chance for that..please....  

i wanna talk about you more and more but as of now the other things about you will be given in handwriten letter directly to you sweet.wait for me... love u🫂


from your idiot 
surya`;

  return (
    <div className="message-screen">
      <div className="message-content space-y-12">
        <div className="long-message-text">
          {message}
        </div>

        <HeartOnlyButton onClick={onHeartClick} />
      </div>
    </div>
  );
}
