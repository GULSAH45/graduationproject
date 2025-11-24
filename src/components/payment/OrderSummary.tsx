interface OrderSummaryProps {
  address?: string;
  email?: string;
  shipping?: string;
}

const OrderSummary = ({ address, email, shipping }: OrderSummaryProps) => {
  return (
    <div className="space-y-4">
      {address && (
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <h3 className="font-semibold">Adres</h3>
            </div>
            <button className="text-sm text-primary">Düzenle</button>
          </div>
          <div className="ml-8 space-y-1">
            <p className="text-sm font-medium">{email}</p>
            <p className="text-sm text-muted-foreground">Arzu Betül Kart</p>
            <p className="text-sm text-muted-foreground">+905395115340</p>
            <p className="text-sm text-muted-foreground">
              Merkez mahallesi, Çay sokak no15, Sarıyer, İstanbul, Türkiye
            </p>
          </div>
        </div>
      )}

      {shipping && (
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <h3 className="font-semibold">Kargo</h3>
            </div>
            <button className="text-sm text-primary">Düzenle</button>
          </div>
          <div className="ml-8">
            <p className="text-sm">
              Ücretsiz Kargo (16:00 öncesi siparişler aynı gün kargolam) /{" "}
              <span className="text-primary">Ücretsiz</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
