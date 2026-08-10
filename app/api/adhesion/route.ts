import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      companyId,
      name,
      contactName,
      email,
      phone,
      donation,
    } = body;

    if (
      !companyId ||
      !name ||
      !contactName ||
      !email ||
      !phone ||
      !donation
    ) {
      return Response.json(
        {
          error: "Faltan datos para enviar la notificación.",
        },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://maddem-app.vercel.app";

    const adminUrl = `${baseUrl}/admin?company=${companyId}`;

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
            ID de empresa: ${companyId}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          error: "No se pudo enviar el correo.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Adhesion API error:", error);

    return Response.json(
      {
        error: "Error interno al enviar el correo.",
      },
      { status: 500 }
    );
  }
}