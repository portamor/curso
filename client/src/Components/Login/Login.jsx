import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserByCode, loginSuccess } from "../../Redux/actions"; 
import styles from "../StyleSheet/Login.module.css";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


function Login() {
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(true); 
  const dispatch = useDispatch();

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await dispatch(getUserByCode(code));
      if (user !== null) {
        dispatch(loginSuccess(user));
        setShowModal(false);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1800
        });
      } else {
        console.error('No se encontró el usuario');
        Swal.fire({
          icon: 'error',
          title: 'Código incorrecto',
          text: 'El código ingresado no es válido. Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit}>
              <div className={styles["login-container"]}>
                <label htmlFor="code">Ingresa tu código:</label>
                <input type="text" id="code" value={code} onChange={handleCodeChange} />
              </div>
              <button className={styles["login-button"]} type="submit">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;