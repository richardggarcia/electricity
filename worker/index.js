const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8"
};

function buildResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...jsonHeaders,
      ...extraHeaders
    }
  });
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendContactEmail(payload, env) {
  const { CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, RESEND_API_KEY } = env;

  if (!CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL || !RESEND_API_KEY) {
    throw new Error("Faltan variables del Worker para enviar el correo.");
  }

  const phone = payload.phone?.trim() || "No informado";
  const projectType = payload.projectType?.trim() || "No informado";
  const message = payload.message.trim();

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: payload.email,
      subject: `Nueva consulta web - ${payload.name}`,
      text: [
        `Nombre: ${payload.name}`,
        `Email: ${payload.email}`,
        `Telefono: ${phone}`,
        `Tipo de proyecto: ${projectType}`,
        "",
        "Mensaje:",
        message
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
          <h2>Nueva consulta desde la landing</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Telefono:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Tipo de proyecto:</strong> ${escapeHtml(projectType)}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
        </div>
      `
    })
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    throw new Error(`Resend rechazo la solicitud: ${details}`);
  }
}

async function handleContact(request, env) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return buildResponse({ message: "El cuerpo de la solicitud no es valido." }, 400);
  }

  const name = payload?.name?.trim();
  const email = payload?.email?.trim();
  const message = payload?.message?.trim();

  if (!name || !email || !message) {
    return buildResponse(
      { message: "Nombre, email y mensaje son obligatorios." },
      400
    );
  }

  if (!isEmail(email)) {
    return buildResponse({ message: "El email ingresado no es valido." }, 400);
  }

  try {
    await sendContactEmail(
      {
        name,
        email,
        phone: payload.phone,
        projectType: payload.projectType,
        message
      },
      env
    );

    return buildResponse({ message: "Consulta enviada correctamente." });
  } catch (error) {
    console.error("contact_error", error);
    return buildResponse(
      { message: "No se pudo enviar la consulta en este momento." },
      500
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (request.method === "GET" && url.pathname === "/api/health") {
      return buildResponse({ ok: true });
    }

    return env.ASSETS.fetch(request);
  }
};
