import { useState } from "react";
import { CreditCard, HelpCircle } from "lucide-react";

interface PaymentFormProps {
  onSubmit: (data: any) => void;
}

const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  const [saveAddress, setSaveAddress] = useState(false);
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-card rounded-xl border-2 border-primary p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard size={20} className="text-foreground" />
          <span className="font-medium">Kredi Kartı</span>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
            Kart Numarası
          </label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Kart Numarası"
            maxLength={19}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
            Kart Üzerindeki İsim
          </label>
          <input
            type="text"
            value={formData.cardName}
            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
            className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Kart Üzerindeki İsim"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
              Ay / Yıl
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.expiryMonth}
                onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="AA"
                maxLength={2}
              />
              <input
                type="text"
                value={formData.expiryYear}
                onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="YY"
                maxLength={2}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground flex items-center gap-1">
              CVC
              <HelpCircle size={14} className="text-muted-foreground" />
            </label>
            <input
              type="text"
              value={formData.cvc}
              onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
              className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="CVC"
              maxLength={3}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs">M</span>
          </div>
          <span className="text-sm font-medium">masterpass</span>
          <span className="text-xs text-muted-foreground">
            altyapısında saklamak istiyorum.
          </span>
        </div>
      </div>

      {/* Summary Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-3">
          <span className="text-sm">Kapıda Ödeme (Nakit)</span>
          <span className="font-semibold">39 TL İşlem Bedeli</span>
        </div>
        <div className="flex items-center justify-between py-3 border-t border-border">
          <span className="text-sm">Kapıda Ödeme (Kredi Kartı)</span>
          <span className="font-semibold">39 TL İşlem Bedeli</span>
        </div>
      </div>

      {/* Agreements */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={(e) => setSaveAddress(e.target.checked)}
            className="w-5 h-5 mt-0.5 accent-foreground rounded"
          />
          <span className="text-sm">
            Fatura adresim teslimat adresimle aynı
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreements.privacy}
            onChange={(e) => setAgreements({ ...agreements, privacy: e.target.checked })}
            className="w-5 h-5 mt-0.5 accent-foreground rounded"
          />
          <span className="text-sm">
            <span className="font-medium">Gizlilik Sözleşmesini</span> ve{" "}
            <span className="font-medium">Satış Sözleşmesini</span> okudum, onaylıyorum.
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-foreground text-background py-4 rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
      >
        Siparişi Tamamla
      </button>

      <p className="text-xs text-center text-muted-foreground">
        Ödemeler güvenli ve şifrelidir
      </p>
    </form>
  );
};

export default PaymentForm;
