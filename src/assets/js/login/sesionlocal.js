class SesionLocal {

    createSesion(dato) {
        localStorage.setItem("datosPerfil", JSON.stringify(dato))
    }

    destroySesion() {
        localStorage.removeItem("datosPerfil")
        localStorage.removeItem("idprof")
        localStorage.removeItem("idgrad")
        this.validateSesion()
    }

    get getuser(){
        let dt=JSON.parse(localStorage.getItem("datosPerfil"))
        return dt.userlogin;
    }

    get getToken(){
        let dt=JSON.parse(localStorage.getItem("datosPerfil"))
        return dt?dt.token:null
    }

    get getSesion() {
        return localStorage.getItem("datosPerfil")
    }
    
    get headers(){
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.getToken
          };
    }



    validateSesion() {
        let url ='../index.html'
        if (!this.getSesion) {
            window.location.href = '../index.html';
            history.pushState(null, null, url);
            
            // Desactivar el botón "atrás" del navegador
            history.pushState(null, null, url);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, url);
            });
            window.location.replace('../index.html')
        }
    }

}