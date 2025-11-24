interface StepIndicatorProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepIndicator = ({ stepNumber, title, isActive, isCompleted }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
          isCompleted
            ? "bg-foreground text-background"
            : isActive
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isCompleted ? "✓" : stepNumber}
      </div>
      <h2 className={`text-lg font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
        {title}
      </h2>
      {isCompleted && (
        <button className="ml-auto text-sm text-primary">
          Düzenle
        </button>
      )}
    </div>
  );
};

export default StepIndicator;
