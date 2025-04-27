import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [showEmailLabel, setShowEmailLabel] = useState(true);

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/login");
};

  const handleRecuperarSenha = async () => {
    try {
      await axios.post("/recuperar-senha", { email });

      Swal.fire({
        icon: "success",
        title: "Email enviado!",
        text: "Verifique seu email para obter o código de recuperação.",
      }).then(() => handleValidarCodigo());
    } catch (error) {
      if (error.response) {
        Swal.fire(
          "Erro!",
          error.response.data.message || "Erro ao enviar email de recuperação.",
          "error"
        );
      } else if (error.request) {
        Swal.fire(
          "Erro de Conexão!",
          "Não foi possível se conectar ao servidor. Tente novamente mais tarde.",
          "error"
        );
      } else {
        Swal.fire("Erro!", "Erro desconhecido. Tente novamente.", "error");
      }
    }
  };

  const handleValidarCodigo = async () => {
    Swal.fire({
      title: "Digite o Código de Recuperação",
      input: "text",
      inputPlaceholder: "Digite o código enviado ao seu email",
      inputValidator: (value) => {
        if (!value) return "O código de recuperação é obrigatório.";
      },
      showCancelButton: true,
      confirmButtonText: "Validar",
      preConfirm: async (inputCodigo) => {
        try {
          await axios.post("/recuperar-senha/validar-codigo", {
            email,
            codigo_recuperar_senha: inputCodigo,
          });

          Swal.fire({
            icon: "success",
            title: "Código Válido!",
            text: "Agora, defina sua nova senha.",
          }).then(() => handleAlterarSenha());
        } catch (error) {
          if (error.response) {
            Swal.showValidationMessage(
              error.response.data.message || "Código inválido ou expirado."
            );
          } else if (error.request) {
            Swal.showValidationMessage(
              "Não foi possível se conectar ao servidor. Tente novamente mais tarde."
            );
          } else {
            Swal.showValidationMessage("Erro desconhecido. Tente novamente.");
          }
        }
      },
    });
  };

  const handleAlterarSenha = async () => {
    Swal.fire({
      title: "Defina Sua Nova Senha",
      input: "password",
      inputPlaceholder: "Digite sua nova senha",
      inputAttributes: {
        minlength: 8,
        required: true,
      },
      inputValidator: (value) => {
        if (!value) return "A nova senha é obrigatória.";
        if (value.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
      },
      confirmButtonText: "Alterar Senha",
      preConfirm: async (inputSenha) => {
        try {
          await axios.patch("/recuperar-senha/nova-senha", {
            email,
            senha: inputSenha,
          });

          Swal.fire(
            "Senha Alterada!",
            "Sua senha foi alterada com sucesso.",
            "success"
          );
        } catch (error) {
          if (error.response) {
            Swal.showValidationMessage(
              error.response.data.message || "Erro ao alterar senha."
            );
          } else if (error.request) {
            Swal.showValidationMessage(
              "Não foi possível se conectar ao servidor. Tente novamente mais tarde."
            );
          } else {
            Swal.showValidationMessage("Erro desconhecido. Tente novamente.");
          }
        }
      },
    });
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-contents">
          <div className="auth-titles">
                            <h1>Recupere sua senha!</h1>
                            <p>Lembrou da senha? <a href="#" onClick={handleRegisterClick}>Faça login!</a></p>
                        </div>
            <div className="auth-inputs">
              <div className="input-container">
                {showEmailLabel && <label htmlFor="email">E-mail</label>}
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setShowEmailLabel(false)}
                  onBlur={() => {
                    if (!email) setShowEmailLabel(true);
                  }}
                />
              </div>
            </div>
            <button className="auth-btn" onClick={handleRecuperarSenha}>
              Recuperar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecuperarSenha;
