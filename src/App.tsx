import { useMemo, useState } from "react";
import "./App.css";
import { validateCedula } from "./lib/cedula";

type AlertType = "success" | "danger" | "";
interface AlertState {
  type: AlertType;
  text: string;
  show: boolean;
}

export default function App() {
  const [cedula, setCedula] = useState<string>("");
  const [alert, setAlert] = useState<AlertState>({
    type: "",
    text: "",
    show: false,
  });
  const [touched, setTouched] = useState<boolean>(false);

  const cedulaRaw = useMemo<string>(() => cedula.replace(/-/g, "").trim(), [cedula]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);

    if (!cedulaRaw) {
      return showMessage("El campo no puede estar vacío.", "danger");
    }
    if (!/^\d+$/.test(cedulaRaw)) {
      return showMessage("Lo que digitó no es un número.", "danger");
    }

    if (validateCedula(cedulaRaw)) {
      showMessage(`La Cédula ${formatPretty(cedulaRaw)} es válida.`, "success");
    } else {
      showMessage(`La Cédula ${formatPretty(cedulaRaw)} no es válida.`, "danger");
    }
  };

  const showMessage = (text: string, type: Exclude<AlertType, "">) => {
    setAlert({ text, type, show: true });
  };

  const formatPretty = (c: string): string => c.replace(/^(\d{3})(\d{7})(\d)$/, "$1-$2-$3");

  const isValidNow =
    touched && /^\d{11}$/.test(cedulaRaw) && validateCedula(cedulaRaw);
  const isInvalidNow =
    touched && cedulaRaw.length > 0 && (!/^\d+$/.test(cedulaRaw) || !validateCedula(cedulaRaw));

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-6">
          <h1 className="h4 mb-3">Validar Cédula (R.D.)</h1>

          {alert.show && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.text}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="cedula" className="form-label">
                Cédula
              </label>
              <input
                id="cedula"
                name="cedula"
                type="text"
                inputMode="numeric"
                placeholder="Ej: 001-1234567-8"
                className={`form-control ${isValidNow ? "is-valid" : isInvalidNow ? "is-invalid" : ""
                  }`}
                value={cedula}
                onChange={(e) => {
                  setCedula(e.target.value);
                  if (!touched) setTouched(true);
                }}
                onBlur={() => setTouched(true)}
              />
              <div className="form-text">Acepta con o sin guiones. 11 dígitos.</div>
              {isInvalidNow && <div className="invalid-feedback">Verifica el número digitado.</div>}
              {isValidNow && <div className="valid-feedback">Cédula válida.</div>}
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Validar
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setCedula("");
                  setTouched(false);
                  setAlert({ type: "", text: "", show: false });
                }}
              >
                Limpiar
              </button>
            </div>
          </form>

          {cedulaRaw && (
            <div className="mt-3">
              <small className="text-muted">
                Formato: {/^\d{11}$/.test(cedulaRaw) ? formatPretty(cedulaRaw) : "—"}
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}