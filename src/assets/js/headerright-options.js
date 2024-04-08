function changeTheme() {

    document.body.classList.toggle("dark-edition");
    document.querySelectorAll(".selectPeriodoPrint").forEach((evt) => { });

    // d/n para modals
    document.querySelectorAll(".modal-content").forEach((evt) => {
        evt.classList.toggle("dark-edition");
    });

    allSelectsInPage = document.querySelectorAll(".selectItems");
    if (allSelectsInPage != null) {
        allSelectsInPage.forEach(item => {
            item.classList.toggle("dark-edition")
            item.classList.toggle("selectBGDark")
            console.log("changin all");
        })

        // if (selectAddNotas.classList.contains("dark-edition")) {
        //     selectAddNotas.setAttribute("id", "selectForPeriodos");
        //     console.log("contiene");
        // } else {
        //     selectAddNotas.setAttribute("id", "");
        //     console.log("NO contiene");
        // }
    }


    document.getElementById("sidebardk").toggleAttribute("data-background-color");

    sidebardk = document.getElementById("sidebardk");

    if (sidebardk.hasAttribute("data-background-color")) {
        if (sidebardk.getAttribute("data-background-color") == "black") {
            console.log("changin atriu");
        }
    }
}

function fullscrren() {
    // e.preventDefault();
    document.body.classList.toggle("fullscreen-enable"),
        document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement
            ? document.cancelFullScreen
                ? document.cancelFullScreen()
                : document.mozCancelFullScreen
                    ? document.mozCancelFullScreen()
                    : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
            : document.documentElement.requestFullscreen
                ? document.documentElement.requestFullscreen()
                : document.documentElement.mozRequestFullScreen
                    ? document.documentElement.mozRequestFullScreen()
                    : document.documentElement.webkitRequestFullscreen &&
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT
                    );
    console.log("pantalla completa");
}

// para cambiar tema los modas agregar el mismo toggle como al

window.addEventListener("load", (event) => {
    loadSavedTheme();

    document.querySelector("#completeScreen").addEventListener("click", (evt) => {
        fullscrren();
    });

    document.querySelector("#changeTheme").addEventListener("click", (evt) => {
        changeTheme();
        loadSavedTheme("change")
    });
});

// guardar en LS el estado del theme
activeTheme = "";
boxContainerTheme = document.body;



function loadSavedTheme(btnDarkLight="") {
    if (localStorage.getItem("activeTheme")==null) {
        saveThemeInLS("light-edition") 
    } else { 
        if(btnDarkLight==""){
            activeTheme = localStorage.getItem("activeTheme");
            if (activeTheme=="light-edition") {
                boxContainerTheme.classList = "";
            }else{
                boxContainerTheme.classList.add(activeTheme);
                document.getElementById("sidebardk").toggleAttribute("data-background-color");
            }
        }else{
            activeTheme = boxContainerTheme.classList.contains("dark-edition")?"dark-edition":"light-edition"
            saveThemeInLS(activeTheme)
        }
       
    }
}

function saveThemeInLS(theme) {
    localStorage.setItem("activeTheme", theme);
}
