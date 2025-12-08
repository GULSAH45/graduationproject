import { CustomerReview, ReviewStats } from "@/types/Review";

export const mockCustomerReviews: CustomerReview[] = [
    {
        id: "1",
        author: "Ahmet Yılmaz",
        date: "15 Kasım 2024",
        rating: 5,
        title: "Harika ürünler ve hızlı teslimat!",
        content: "2 yıldır bu firmadan alışveriş yapıyorum. Ürünlerin kalitesi gerçekten çok iyi ve teslimat her zaman zamanında oluyor. Özellikle protein tozlarını çok beğeniyorum.",
        isVerified: true,
    },
    {
        id: "2",
        author: "Zeynep Kaya",
        date: "10 Kasım 2024",
        rating: 5,
        title: "Müşteri hizmetleri mükemmel",
        content: "Sipariş verdikten sonra bir sorun yaşadım ve müşteri hizmetleri çok ilgili ve çözüm odaklı davrandı. Ürünlerin lezzeti ve kalitesi de çok başarılı.",
        isVerified: true,
    },
    {
        id: "3",
        author: "Mehmet Demir",
        date: "5 Kasım 2024",
        rating: 4,
        title: "Kaliteli ve güvenilir",
        content: "Uzun zamandır aradığım kaliteli spor gıdalarını burada buldum. Fiyatlar da oldukça makul. Tavsiye ederim.",
        isVerified: true,
    },
    {
        id: "4",
        author: "Ayşe Şahin",
        date: "1 Kasım 2024",
        rating: 5,
        title: "Sağlıklı yaşam için ideal",
        content: "Sağlıklı beslenme konusunda çok titiz davranıyorum. Bu firmanın ürünleri tam aradığım gibi, içerik listesi net ve sertifikalara sahipler. Kesinlikle öneriyorum!",
        isVerified: true,
    },
    {
        id: "5",
        author: "Can Öztürk",
        date: "28 Ekim 2024",
        rating: 5,
        title: "Performansım arttı",
        content: "Spor salonunda performansımı artırmak için aldığım ürünler gerçekten işe yaradı. Lezzet de beklediğimden çok daha iyi.",
        isVerified: true,
    },
    {
        id: "6",
        author: "Elif Arslan",
        date: "20 Ekim 2024",
        rating: 4,
        title: "Çeşitlilik çok geniş",
        content: "Ürün çeşitliliği gerçekten çok fazla. Her ihtiyacıma yönelik bir ürün bulabiliyorum. Fiyat/performans dengesi de gayet iyi.",
        isVerified: true,
    },
];

export const mockReviewStats: ReviewStats = {
    averageRating: 4.8,
    totalReviews: mockCustomerReviews.length,
    ratingBreakdown: {
        5: 5,
        4: 1,
        3: 0,
        2: 0,
        1: 0,
    },
};
