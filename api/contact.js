const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseBody(body) {
  if (typeof body === "string") {
    return JSON.parse(body);
  }

  return body ?? {};
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Metodo no permitido." });
  }

  let payload;

  try {
    payload = parseBody(request.body);
  } catch {
    return response.status(400).json({ message: "El cuerpo de la solicitud no es valido." });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim() || "No informado";
  const projectType = payload.projectType?.trim() || "No informado";
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return response.status(400).json({
      message: "Nombre, email y mensaje son obligatorios."
    });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return response.status(400).json({ message: "El email ingresado no es valido." });
  }

  if (name.length > 120 || email.length > 254 || phone.length > 80 || projectType.length > 120 || message.length > 5000) {
    return response.status(400).json({ message: "Uno de los campos supera el limite permitido." });
  }

  const { FROM_EMAIL, TO_EMAIL, RESEND_API_KEY } = process.env;

  if (!FROM_EMAIL || !TO_EMAIL || !RESEND_API_KEY) {
    console.error("contact_config_error");
    return response.status(500).json({
      message: "No se pudo enviar la consulta en este momento."
    });
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Nueva consulta RG Electric - ${name}`,
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          `Telefono: ${phone}`,
          `Tipo de proyecto: ${projectType}`,
          "",
          "Mensaje:",
          message
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
            <h2>Nueva consulta desde RG Electric</h2>
            <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefono:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Tipo de proyecto:</strong> ${escapeHtml(projectType)}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
          </div>
        `
      })
    });

    if (!resendResponse.ok) {
      console.error("contact_resend_error", resendResponse.status);
      return response.status(502).json({
        message: "No se pudo enviar la consulta en este momento."
      });
    }

    return response.status(200).json({ message: "Consulta enviada correctamente." });
  } catch (error) {
    console.error("contact_request_error", error);
    return response.status(500).json({
      message: "No se pudo enviar la consulta en este momento."
    });
  }
}
