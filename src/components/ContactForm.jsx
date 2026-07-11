import { ArrowRight } from "lucide-react";
import { startTransition, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "No se pudo enviar la consulta.");
      }

      startTransition(() => {
        setForm(initialForm);
        setStatus({
          type: "success",
          message: "Consulta enviada. Te responderemos a la brevedad."
        });
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Ocurrio un error al enviar la consulta."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nombre
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="correo@empresa.com"
          />
        </label>

        <label>
          Telefono
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+54 11 0000 0000"
          />
        </label>

        <label>
          Tipo de proyecto
          <input
            name="projectType"
            type="text"
            value={form.projectType}
            onChange={handleChange}
            placeholder="Residencial, comercial, reforma..."
          />
        </label>
      </div>

      <label>
        Contanos la necesidad
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows="6"
          placeholder="Alcance, ubicacion, etapa de obra y fecha estimada."
        />
      </label>

      <div className="form-footer">
        <button className="button button-accent" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar consulta"}
          <ArrowRight size={18} />
        </button>

        {status.type !== "idle" ? (
          <p className={`form-message form-message--${status.type}`}>{status.message}</p>
        ) : null}
      </div>
    </form>
  );
}
