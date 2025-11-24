import { BASE_URL } from "@/navigation/screens/ProductDetailPage";


export async function login(email: string, password: string) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
    } catch (error) {
        console.log(error);
    }
}   