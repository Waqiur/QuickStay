import { keepSupabaseAlive } from "@/app/_lib/data-service";

export async function GET(req) {
    try {
        await keepSupabaseAlive();
        return new Response(
            JSON.stringify({ message: "Supabase keep-alive triggered" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error in keep-alive API:", error);
        return new Response(
            JSON.stringify({ error: "Failed to trigger keep-alive" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
