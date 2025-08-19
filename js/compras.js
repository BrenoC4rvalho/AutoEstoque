// js/compras.js

function populateForms() {
    const fornecedorSelect = document.getElementById('fornecedorSelect');
    const produtoSelect = document.getElementById('produtoCompraSelect');
    
    // Popula o seletor de fornecedores
    mockData.fornecedores.forEach(fornecedor => {
        const option = document.createElement('option');
        option.value = fornecedor.id;
        option.textContent = fornecedor.nome;
        fornecedorSelect.appendChild(option);
    });

    // Popula o seletor de produtos
    mockData.produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.id;
        option.textContent = produto.nome;
        produtoSelect.appendChild(option);
    });
}

document.getElementById('registroCompraForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fornecedorId = document.getElementById('fornecedorSelect').value;
    const produtoId = document.getElementById('produtoCompraSelect').value;
    const quantidade = parseInt(document.getElementById('quantidadeCompra').value);
    const valorUnitario = parseFloat(document.getElementById('valorUnitarioCompra').value);

    // Encontra o produto e atualiza o estoque
    const produto = mockData.produtos.find(p => p.id == produtoId);
    if (produto) {
        produto.quantidade += quantidade;
        alert(`Compra de ${quantidade}x ${produto.nome} registrada com sucesso! Estoque atualizado para ${produto.quantidade}.`);
        e.target.reset(); // Limpa o formulário
    } else {
        alert('Produto não encontrado!');
    }
});

document.getElementById('cadastroFornecedorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const novoFornecedor = {
        id: mockData.fornecedores.length > 0 ? Math.max(...mockData.fornecedores.map(f => f.id)) + 1 : 1,
        nome: document.getElementById('fornecedorNome').value,
        cnpj: document.getElementById('fornecedorCNPJ').value,
        telefone: document.getElementById('fornecedorTelefone').value,
        email: document.getElementById('fornecedorEmail').value,
        endereco: document.getElementById('fornecedorEndereco').value
    };

    mockData.fornecedores.push(novoFornecedor);
    alert(`Fornecedor "${novoFornecedor.nome}" cadastrado com sucesso!`);
    populateForms(); // Atualiza a lista de fornecedores
    e.target.reset(); // Limpa o formulário
});

document.addEventListener('DOMContentLoaded', populateForms);