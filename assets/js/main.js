// 1. Função para exibir/ocultar os projetos de outras categorias
function toggleProjects() {
    const hiddenSection = document.getElementById('hidden-categories');
    const btn = document.getElementById('btn-toggle-projects');
    
    if (hiddenSection.style.display === 'none') {
        hiddenSection.style.display = 'block';
        setTimeout(() => { hiddenSection.style.opacity = '1'; }, 50);
        btn.innerHTML = 'Ver menos projetos <i class="fa-solid fa-chevron-up"></i>';
    } else {
        hiddenSection.style.opacity = '0';
        setTimeout(() => { hiddenSection.style.display = 'none'; }, 500);
        btn.innerHTML = 'Ver portfólio completo <i class="fa-solid fa-chevron-down"></i>';
        document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' });
    }
}

// 2. Lógica de envio do Formulário de Contato via AJAX (Formspree)
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if(contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Impede a página de recarregar
            
            // SUBSTITUA "SEU_CODIGO_AQUI" pelo seu código do Formspree (Veja o passo a passo abaixo)
            const formspreeEndpoint = "https://formspree.io/f/mwvrqpnl"; 
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Muda o botão para estado de carregamento
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.innerHTML = "Mensagem enviada com sucesso! Retornarei em breve.";
                    formStatus.className = "form-status success";
                    contactForm.reset(); // Limpa os campos
                } else {
                    formStatus.innerHTML = "Ops! Ocorreu um erro ao enviar sua mensagem.";
                    formStatus.className = "form-status error";
                }
            } catch (error) {
                formStatus.innerHTML = "Erro de conexão. Tente novamente mais tarde.";
                formStatus.className = "form-status error";
            }

            // Restaura o botão original após 3 segundos
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formStatus.className = "form-status";
            }, 5000); // Oculta a mensagem de status após 5s
        });
    }
});