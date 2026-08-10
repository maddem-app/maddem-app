import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      contactName,
      phone,
      reason,
      accepted,
    } = body;

    // Validación de los datos enviados.
    // No consulta Supabase ni verifica si la empresa existe.
    if (
      !name ||
      !contactName ||
      !phone ||
      !reason ||
      accepted !== true
    ) {
      return Response.json(
        {
          error: "Faltan datos para enviar la solicitud.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "MADdeM <onboarding@resend.dev>",
      to: ["maddem.app@outlook.com"],
      subject: `Solicitud de desadhesión — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2>Solicitud de desadhesión</h2>

          <p>
            Se recibió una solicitud de desadhesión de una Empresa Fundadora
            del proyecto MADdeM.
          </p>

          <hr />

          <p><strong>Empresa:</strong> ${name}</p>
          <p><strong>Solicitante:</strong> ${contactName}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Motivo:</strong></p>
          <p>${reason}</p>

          <hr />

          <p>
            <strong>Declaración formal:</strong> Aceptada
          </p>

          <p style="font-size: 12px; color: #777;">
            Esta solicitud no modifica automáticamente el estado de la empresa.
            La desadhesión debe ser revisada y realizada manualmente desde el
            panel de administración.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend desadhesion error:", error);

      return Response.json(
        {
          error: "No se pudo enviar la solicitud.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Desadhesion API error:", error);

    return Response.json(
      {
        error: "Error interno al enviar la solicitud.",
      },
      { status: 500 }
    );
  }
}