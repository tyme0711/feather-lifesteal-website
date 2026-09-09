// ========================================
// FEATHER LIFESTEAL - CLOUDFLARE WORKER
// ========================================

export default {
    async fetch(request, env) {

        // CORS
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        };

        // OPTIONS request
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: corsHeaders
            });
        }

        const url = new URL(request.url);

        // ========================================
        // API STATUS
        // ========================================

        if (url.pathname === "/api/status") {

            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Feather Lifesteal API is online"
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                        ...corsHeaders
                    }
                }
            );
        }

        // ========================================
        // REGISTER
        // ========================================

        if (
            url.pathname === "/api/register" &&
            request.method === "POST"
        ) {

            try {

                const body = await request.json();

                const username = body.username?.trim();
                const email = body.email?.trim().toLowerCase();
                const password = body.password;

                // Basic validation
                if (!username || !email || !password) {

                    return new Response(
                        JSON.stringify({
                            success: false,
                            error: "Alle Felder sind erforderlich."
                        }),
                        {
                            status: 400,
                            headers: {
                                "Content-Type": "application/json",
                                ...corsHeaders
                            }
                        }
                    );
                }

                if (username.length < 3) {

                    return new Response(
                        JSON.stringify({
                            success: false,
                            error: "Der Benutzername muss mindestens 3 Zeichen haben."
                        }),
                        {
                            status: 400,
                            headers: {
                                "Content-Type": "application/json",
                                ...corsHeaders
                            }
                        }
                    );
                }

                if (password.length < 8) {

                    return new Response(
                        JSON.stringify({
                            success: false,
                            error: "Das Passwort muss mindestens 8 Zeichen haben."
                        }),
                        {
                            status: 400,
                            headers: {
                                "Content-Type": "application/json",
                                ...corsHeaders
                            }
                        }
                    );
                }

                // ========================================
                // CHECK EXISTING USER
                // ========================================

                const existingUser = await env.DB.prepare(
                    `
                    SELECT id
                    FROM users
                    WHERE username = ? OR email = ?
                    LIMIT 1
                    `
                )
                .bind(username, email)
                .first();

                if (existingUser) {

                    return new Response(
                        JSON.stringify({
                            success: false,
                            error: "Benutzername oder E-Mail ist bereits registriert."
                        }),
                        {
                            status: 409,
                            headers: {
                                "Content-Type": "application/json",
                                ...corsHeaders
                            }
                        }
                    );
                }

                // ========================================
                // TEMPORARY PLACEHOLDER
                // ========================================
                //
                // ACHTUNG:
                // Hier wird später ein sicherer Passwort-Hash
                // erzeugt.
                //
                // Niemals echte Passwörter direkt speichern!
                //

                const passwordHash = "PASSWORD_HASH_WILL_BE_ADDED";

                // ========================================
                // CREATE USER
                // ========================================

                await env.DB.prepare(
                    `
                    INSERT INTO users
                    (
                        username,
                        email,
                        password_hash,
                        status,
                        role
                    )
                    VALUES (?, ?, ?, 'PENDING', 'USER')
                    `
                )
                .bind(
                    username,
                    email,
                    passwordHash
                )
                .run();

                return new Response(
                    JSON.stringify({
                        success: true,
                        message:
                            "Registrierung erfolgreich. Dein Account wartet auf die Freigabe durch einen Administrator."
                    }),
                    {
                        status: 201,
                        headers: {
                            "Content-Type": "application/json",
                            ...corsHeaders
                        }
                    }
                );

            } catch (error) {

                console.error(error);

                return new Response(
                    JSON.stringify({
                        success: false,
                        error: "Interner Serverfehler."
                    }),
                    {
                        status: 500,
                        headers: {
                            "Content-Type": "application/json",
                            ...corsHeaders
                        }
                    }
                );
            }
        }

        // ========================================
        // UNKNOWN ROUTE
        // ========================================

        return new Response(
            JSON.stringify({
                success: false,
                error: "API route not found."
            }),
            {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders
                }
            }
        );
    }
};
