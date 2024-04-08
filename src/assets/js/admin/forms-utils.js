class FormUtils {

    clearFormData(formulario) {
        Array.from(formulario).forEach(elemento => {
            elemento.value = null;
        });
    }

   

}