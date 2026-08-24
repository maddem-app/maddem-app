import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      contactName,
      email,
      phone,
      donation,
    } = body;

    if (
      !name ||
      !contactName ||
      !email ||
      !phone ||
      !donation
    ) {
      return Response.json(
        {
          error: "Faltan datos para registrar la adhesión.",
        },
        { status: 400 }
      );
    }

    const donationValue = Number(
      String(donation).replace(/\./g, "").replace(",", ".")
    );

    if (!Number.isFinite(donationValue)) {
      return Response.json(
        {
          error: "El aporte indicado no es válido.",
        },
        { status: 400 }
      );
    }

    // 1. Registrar la adhesión desde el servidor.
    // La service role permite obtener el ID sin depender
    // de las políticas RLS del usuario anónimo.

    const { data: company, error: insertError } = await supabaseAdmin
      .from("companies")
      .insert({
        name,
        contact_name: contactName,
        email,
        phone,
        donation_nominal: donationValue,
        adhesion_accepted: true,
        adhesion_at: new Date().toISOString(),
        active: false,
      })
      .select("id")
      .single();

    if (insertError || !company) {
      console.error("SUPABASE ADHESION INSERT ERROR:", {
        message: insertError?.message,
        details: insertError?.details,
        hint: insertError?.hint,
        code: insertError?.code,
      });

      return Response.json(
        {
          error: "No se pudo registrar la adhesión.",
        },
        { status: 500 }
      );
    }

    // 2. Enviar el correo de notificación

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://maddem-app.vercel.app";

    const adminUrl = `${baseUrl}/admin?company=${company.id}`;

    const { data, error } = await resend.emails.send({
      from: "MADdeM <onboarding@resend.dev>",
      to: ["maddem.app@outlook.com"],
      subject: `Nueva adhesión — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2>Nueva Empresa Fundadora</h2>

          <p>Se recibió una nueva adhesión al proyecto MADdeM.</p>

          <hr />

          <p><strong>Empresa:</strong> ${name}</p>
          <p><strong>Contacto:</strong> ${contactName}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Aporte:</strong> USD ${donation}</p>

          <hr />

          <p>
            <strong>Adhesión formal:</strong> Sí
          </p>

          <p>
            <a
              href="${adminUrl}"
              style="
                display: inline-block;
                padding: 12px 20px;
                background: #f39a1e;
                color: #020b14;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
              "
            >
              VER ADHESIÓN EN ADMIN
            </a>
          </p>

          <p style="font-size: 12px; color: #777;">
            ID de empresa: ${company.id}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          error: "La adhesión fue registrada, pero no se pudo enviar la notificación.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      companyId: company.id,
      data,
    });
  } catch (error) {
    console.error("Adhesion API error:", error);

    return Response.json(
      {
        error: "Error interno al procesar la adhesión.",
      },
      { status: 500 }
    );
  }
}