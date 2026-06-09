/**
 * ==========================================
 * PROJETO INTEGRADO - ATIVIDADES DO CURSO
 * Desenvolvedor: [Seu Nome]
 * ==========================================
 */

// ⏳ EVENTO 1: load - Dispara quando a página e os recursos terminam de carregar (Atividade Obrigatória)
window.addEventListener('load', () => {
    console.log("🌐 EVENTO 'LOAD': Todos os recursos da página foram carregados. Vitrine pronta!");
    
    // Seleção de elementos do DOM
    const btnLimpar = document.getElementById('btn-limpar-carrinho');
    const cardsVitrine = document.querySelectorAll('.card-produto');
    const inputBusca = document.getElementById('busca-vitrine');
    
    const emailInput = document.getElementById('email_cliente');
    const erroEmail = document.getElementById('erro-email');
    const senhaInput = document.getElementById('senha_cliente');
    const nivelSenha = document.getElementById('nivel-senha');
    
    const feedbackInput = document.getElementById('feedback_cliente');
    const contadorChars = document.getElementById('contador-chars');
    const formCheckout = document.getElementById('form-checkout');

    // 👆 EVENTO 2: click - Atividade 1 (Interação com botões e carrinho)
    
    // 🗑️ Limpar carrinho com confirmação
    btnLimpar.addEventListener('click', () => {
        const confirmar = confirm("Tem certeza que deseja limpar o carrinho inteiro?");
        if(confirmar) {
            alert("Carrinho esvaziado com sucesso!");
            // Aqui entraria a lógica de zerar o array carrinho do seu script principal
        }
    });

    // Lógica interna de cada Card da Vitrine
    cardsVitrine.forEach(card => {
        const btnDetalhes = card.querySelector('.btn-detalhes');
        const detalhesText = card.querySelector('.detalhes-produto');
        const btnMais = card.querySelector('.btn-mais');
        const btnMenos = card.querySelector('.btn-menos');
        const spanQtd = card.querySelector('.qtd-display');
        const btnAdd = card.querySelector('.btn-add-vitrine');
        const nomeProduto = card.querySelector('.nome-vitrine').innerText;

        // 🔍 Mostrar/Ocultar Detalhes
        btnDetalhes.addEventListener('click', () => {
            detalhesText.classList.toggle('escondido');
            btnDetalhes.innerText = detalhesText.classList.contains('escondido') ? "Ver Detalhes 🔍" : "Esconder Detalhes 🔼";
        });

        // ➕➖ Contador de Quantidade
        let qtd = 1;
        btnMais.addEventListener('click', () => {
            qtd++;
            spanQtd.innerText = qtd;
        });

        btnMenos.addEventListener('click', () => {
            if (qtd > 1) {
                qtd--;
                spanQtd.innerText = qtd;
            }
        });

        // 🔘 Confirmar adição
        btnAdd.addEventListener('click', () => {
            alert(`✅ Sucesso! ${qtd}x ${nomeProduto} adicionado(s) ao carrinho!`);
            qtd = 1; // Reseta após adicionar
            spanQtd.innerText = qtd;
        });

        // 🖱️ EVENTO 3: mouseover e mouseout - Atividade 2 (Efeitos de Mouse)
        card.addEventListener('mouseover', () => {
            card.style.backgroundColor = "#fafafa"; // Dá um leve destaque ao fundo
        });

        card.addEventListener('mouseout', () => {
            card.style.backgroundColor = "white"; // Retorna ao normal
        });
    });

    // ⌨️ EVENTO 4: keyup e keydown - Atividade 4 (Busca e Teclado)
    
    // 🔎 Filtro de Busca em tempo real
    inputBusca.addEventListener('keyup', (event) => {
        const termo = event.target.value.toLowerCase();
        cardsVitrine.forEach(card => {
            const nome = card.querySelector('.nome-vitrine').innerText.toLowerCase();
            if(nome.includes(termo)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 📝 Contador de Caracteres no Textarea
    feedbackInput.addEventListener('keyup', () => {
        contadorChars.innerText = feedbackInput.value.length;
    });

    // ⌨️ Atalho Global e Navegação
    document.addEventListener('keydown', (event) => {
        // Ctrl + Enter para enviar formulário de checkout
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            formCheckout.dispatchEvent(new Event('submit')); // Força o evento submit
        }
    });

    // 🔄 EVENTO 5: change e input - Atividade 3 (Validação de Formulário)
    
    // 📧 Validação de Email (Dispara quando o usuário sai do campo ou altera o valor)
    emailInput.addEventListener('change', () => {
        const emailValido = emailInput.value.includes('@') && emailInput.value.includes('.');
        if(!emailValido && emailInput.value.length > 0) {
            erroEmail.classList.remove('escondido');
            emailInput.style.border = "2px solid red";
        } else {
            erroEmail.classList.add('escondido');
            emailInput.style.border = "1px solid #ccc";
        }
    });

    // 🔒 Força da Senha em tempo real
    senhaInput.addEventListener('input', () => {
        const tamanho = senhaInput.value.length;
        nivelSenha.className = ""; // Limpa classes
        
        if(tamanho === 0) {
            nivelSenha.innerText = "Nenhuma";
        } else if (tamanho < 5) {
            nivelSenha.innerText = "Fraca";
            nivelSenha.classList.add('senha-fraca');
        } else if (tamanho >= 5 && tamanho < 8) {
            nivelSenha.innerText = "Média";
            nivelSenha.classList.add('senha-media');
        } else {
            nivelSenha.innerText = "Forte";
            nivelSenha.classList.add('senha-forte');
        }
    });

    // 📤 EVENTO 6: submit - Atividade Obrigatória
    formCheckout.addEventListener('submit', (event) => {
        event.preventDefault(); // 🚫 Prevenção do envio padrão do navegador

        // Validação final de segurança
        if (!emailInput.value.includes('@') || senhaInput.value.length < 5) {
            alert("⚠️ Erro: Verifique os campos! O email precisa ser válido e a senha ter pelo menos 5 caracteres.");
            return;
        }

        alert("🎉 Cadastro e Checkout finalizados com sucesso! (Via evento Submit)");
        formCheckout.reset(); // Limpa o formulário
        contadorChars.innerText = "0"; // Zera contador
        nivelSenha.innerText = "Nenhuma";
    });
});
