import { useState } from "react";
import { MapPin } from "lucide-react";

interface AddressFormProps {
  onSubmit: (data: any) => void;
}

const AddressForm = ({ onSubmit }: AddressFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    apartment: "",
    city: "",
    district: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Girilen bilgiler hatalı";
    if (!formData.surname) newErrors.surname = "Girilen bilgiler hatalı";
    if (!formData.address) newErrors.address = "Girilen bilgiler hatalı";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-card rounded-xl border-2 border-primary p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={20} className="text-foreground" />
          <span className="font-medium">Yeni Adres</span>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Arzu Betül</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Arzu Betül"
          />
          {errors.name && (
            <p className="text-destructive text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Kart</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Kart"
          />
          {errors.surname && (
            <p className="text-destructive text-xs mt-1">{errors.surname}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Adres</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Adres"
          />
          {errors.address && (
            <p className="text-destructive text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Apartman, daire, vb.</label>
          <input
            type="text"
            value={formData.apartment}
            onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
            className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Apartman, daire, vb."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">İl</label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">İl</option>
              <option value="istanbul">İstanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">İzmir</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">İlçe</label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">İlçe</option>
              <option value="sarıyer">Sarıyer</option>
              <option value="beşiktaş">Beşiktaş</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Telefon</label>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-background border border-input rounded-lg w-20">
              <span className="text-2xl">🇹🇷</span>
            </div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="flex-1 px-3 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="+90"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-muted text-muted-foreground py-3.5 rounded-lg font-medium hover:bg-muted/80 transition-colors"
        >
          Adres Başlığı
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-muted text-foreground py-4 rounded-lg font-semibold hover:bg-muted/80 transition-colors"
      >
        Kargo ile Devam Et
      </button>
    </form>
  );
};

export default AddressForm;
