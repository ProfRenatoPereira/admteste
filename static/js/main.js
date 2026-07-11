// Controle do Menu Hamburger
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Suporte para clique no dropdown em telas touch/mobile
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            toggle.parentElement.classList.toggle('active');
        }
    });
});

// Integração AJAX com a API Python do Backend
async function calcularPrecovenda() {
    const custo_total = document.getElementById('custoTotal').value;
    const margem_lucro = document.getElementById('lucro').value;
    const impostos = document.getElementById('impostosInput').value;

    const response = await fetch('/api/calculo-markup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ custo_total, margem_lucro, impostos })
    });

    const resultadoDiv = document.getElementById('resultado');
    
    if (response.ok) {
        const data = await response.json();
        resultadoDiv.innerHTML = `
            <p><strong>Mark-up Multiplicador:</strong> ${data.markup}x</p>
            <p><strong>Preço de Venda Sugerido:</strong> R$ ${data.preco_venda}</p>
        `;
    } else {
        resultadoDiv.innerHTML = `<p style="color:red;">Erro ao calcular. Verifique as margens.</p>`;
    }
}
