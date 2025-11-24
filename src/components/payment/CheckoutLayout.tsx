import { ReactNode } from "react";
import { Home, Search, Package, Menu } from "lucide-react";

interface CheckoutLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

const CheckoutLayout = ({ children, currentStep, totalSteps }: CheckoutLayoutProps) => {
  return (
    <div className="min-h-screen bg-checkout flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-lg font-semibold">Özet</h1>
          <div className="text-sm font-medium">
            688 TL <span className="text-muted-foreground">(2 ürün)</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Home size={20} />
              <span className="text-xs">Anasayfa</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Search size={20} />
              <span className="text-xs">Ürün Ara</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Package size={20} />
              <span className="text-xs">Tüm Ürünler</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Menu size={20} />
              <span className="text-xs">Menü</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CheckoutLayout;
