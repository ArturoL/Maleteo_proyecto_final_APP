const ServicioLogin = {
    getLogueado: function() { return sessionStorage.getItem("logueado") == "true" ? true : false; },
    setLogueado: function(estado) { sessionStorage.setItem("logueado", estado ? "true" : "false"); }
}
export default ServicioLogin;