document.addEventListener("DOMContentLoaded", function(event) { 
  // список языков для тултипа
	const langList = {
		ru: ["Скопировать", "Скопровано"],
		es: ["Copiar", "Copiado"],
		pt: ["Copiar", "Copiado"],
		it: ["Copiare", "Copiato"],
		en: ["Copy", "Copied"],
		gr: ["Αντιγραφή", "Αντιγράφηκε"],
		ro: ["Copie", "Copiat"],
		hu: ["Másolni", "Másolva"]
	};
	const lang = document.getElementsByTagName("html")[0].getAttribute("lang");

	// получаем li с иконкой копии
	const links = document.querySelectorAll(".link__item");
	
	function resetTooltip(btn, tooltip) {
		tooltip.style.opacity = 0;
		btn.style.opacity = 0;
		if (langList[lang]) {
			tooltip.textContent = langList[lang][0];
		}
	}
	
	function setTooltipText(link, btn, tooltip, copyLink, event){
		if (event.clipboardData) {

			// копирование текста ссылки
			event.clipboardData.setData(
				"text/plain",
				copyLink.textContent
			);

			if (langList[lang]) {
				tooltip.textContent = langList[lang][1];
			}
			btn.style.opacity = 0.5;
			tooltip.style.opacity = 1;
		}
	}
	
	//copy footer links
	links.forEach((item) => {
		let copyBtn = item.querySelector('.copy-btn')
		let copyTooltip = item.querySelector('.copy-tooltip')
		let copyLink = item.querySelector('.copy-link')
	
		item.addEventListener("click", (event) => {
			event.target.classList.contains('copy-img') ? document.execCommand("copy") : false
		});
		item.addEventListener("copy", (event) => {
			setTooltipText(item, copyBtn, copyTooltip, copyLink, event)
			event.preventDefault();
		});
		item.addEventListener("mouseenter", () => {
			resetTooltip(copyBtn, copyTooltip)
			copyTooltip.style.opacity = 0.6;
			copyBtn.style.opacity = 1;
		});
		item.addEventListener("mouseleave", () => {
			resetTooltip(copyBtn, copyTooltip)
		});
	});
});