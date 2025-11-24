import { useState } from "react";
import { Truck } from "lucide-react";

interface ShippingOptionsProps {
  onSubmit: (option: string) => void;
}

const ShippingOptions = ({ onSubmit }: ShippingOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState("free");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedOption);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-card rounded-xl p-4 space-y-3">
        <div
          className={`flex items-start justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
            selectedOption === "free"
              ? "border-primary bg-primary/5"
              : "border-border bg-background"
          }`}
          onClick={() => setSelectedOption("free")}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                selectedOption === "free"
                  ? "border-foreground"
                  : "border-muted-foreground"
              }`}
            >
              {selectedOption === "free" && (
                <div className="w-3 h-3 rounded-full bg-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Truck size={18} />
                <span className="font-medium">Ücretsiz Kargo</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                (16:00 öncesi siparişler aynı gün kargolam) / Ücretsiz
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-foreground text-background py-4 rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
      >
        Kargo ile Devam Et
      </button>
    </form>
  );
};

export default ShippingOptions;
