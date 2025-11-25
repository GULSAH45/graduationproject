import { useNavigate } from "react-router-dom";
import { CheckCircle2, Package, MapPin, CreditCard, Home } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-checkout flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-center max-w-md mx-auto">
          <h1 className="text-lg font-semibold">Sipariş Onayı</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4 space-y-6">
          {/* Success Message */}
          <div className="bg-success/10 border-2 border-success rounded-xl p-6 text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
                <CheckCircle2 size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold">Siparişiniz Alındı!</h2>
            <p className="text-sm text-muted-foreground">
              Sipariş numaranız: <span className="font-semibold text-foreground">#12345</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Siparişiniz hazırlanıyor ve en kısa sürede kargoya verilecek.
            </p>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            {/* Address */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Teslimat Adresi</h3>
                  <p className="text-sm text-muted-foreground">
                    Arzu Betül Kart
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Merkez mahallesi, Çay sokak no15
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sarıyer, İstanbul, Türkiye
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    +905395115340
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-info" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Kargo Bilgileri</h3>
                  <p className="text-sm text-muted-foreground">
                    Ücretsiz Kargo
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tahmini teslimat: 2-3 iş günü
                  </p>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/30 rounded-lg flex items-center justify-center">
                  <CreditCard size={20} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Ödeme Bilgileri</h3>
                  <p className="text-sm text-muted-foreground">
                    Kredi Kartı ile ödendi
                  </p>
                  <p className="text-sm text-muted-foreground">
                    **** **** **** 1234
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-xl p-4 border border-border space-y-3">
            <h3 className="font-semibold">Sipariş Özeti</h3>
            
            <div className="space-y-2">
              <div className="flex items-start gap-3 py-2">
                <img
                  src="https://via.placeholder.com/60"
                  alt="Product"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Örnek Ürün 1</p>
                  <p className="text-xs text-muted-foreground">Adet: 1</p>
                </div>
                <div className="text-sm font-semibold">344 TL</div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <img
                  src="https://via.placeholder.com/60"
                  alt="Product"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Örnek Ürün 2</p>
                  <p className="text-xs text-muted-foreground">Adet: 1</p>
                </div>
                <div className="text-sm font-semibold">344 TL</div>
              </div>
            </div>

            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Ara Toplam</span>
                <span className="font-medium">688 TL</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Kargo</span>
                <span className="font-medium text-success">Ücretsiz</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-semibold">Toplam</span>
                <span className="text-xl font-bold">688 TL</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-foreground text-background py-4 rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
            >
              Siparişlerimi Görüntüle
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-muted text-foreground py-4 rounded-lg font-semibold hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Alışverişe Devam Et
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
