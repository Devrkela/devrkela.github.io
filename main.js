function toggleMenu(){
	document.body.setAttribute("menu", document.body.getAttribute("menu") === "false");
};

function closeMenu(){
	if(window.matchMedia("(width < 636px)").matches){
		document.body.setAttribute("menu", false);		
	}
}

toggle_menu.addEventListener("click", toggleMenu);
close_menu.addEventListener("click", closeMenu);

document.querySelector(".scrim").addEventListener("click", closeMenu);

function showModal(){
	document.body.setAttribute("modal", true);
}

function hideModal(){
	document.body.setAttribute("modal", false);
}

document.querySelector(".scrim").addEventListener("click", hideModal);
info.addEventListener("click", showModal);