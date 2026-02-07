interface HeartOnlyButtonProps {
  onClick: () => void;
}

export function HeartOnlyButton({ onClick }: HeartOnlyButtonProps) {
  return (
    <div className="flex justify-center mt-16 mb-8">
      <button
        onClick={onClick}
        className="heart-button"
        aria-label="Continue"
      >
        💗
      </button>
    </div>
  );
}
