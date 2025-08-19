// js/dashboard.js

function renderDashboard() {
    // 1. Indicadores (Cards)
    const produtosEmRisco = mockData.produtos.filter(p => p.quantidade <= p.quantidadeMinima);
    document.getElementById('estoque-risco-total').textContent = produtosEmRisco.length;

    let totalVendasMes = 0;
    // Simulação de cálculo de vendas, idealmente viria de um array de vendas
    mockData.vendas.forEach(venda => {
        const produto = mockData.produtos.find(p => p.id === venda.produtoId);
        if (produto) {
            totalVendasMes += venda.quantidade * produto.precoUnitario;
        }
    });
    document.getElementById('vendas-mes-total').textContent = `R$ ${totalVendasMes.toFixed(2).replace('.', ',')}`;

    let valorTotalEstoque = 0;
    mockData.produtos.forEach(p => {
        valorTotalEstoque += p.quantidade * p.precoUnitario;
    });
    document.getElementById('valor-estoque-total').textContent = `R$ ${valorTotalEstoque.toFixed(2).replace('.', ',')}`;

    // 2. Gráficos (usando Chart.js)

    // Gráfico de Produtos Mais Vendidos
    const vendasAgrupadas = mockData.vendas.reduce((acc, venda) => {
        const produto = mockData.produtos.find(p => p.id === venda.produtoId);
        if (produto) {
            if (!acc[produto.nome]) {
                acc[produto.nome] = 0;
            }
            acc[produto.nome] += venda.quantidade;
        }
        return acc;
    }, {});
    
    const labelsVendas = Object.keys(vendasAgrupadas);
    const dataVendas = Object.values(vendasAgrupadas);

    new Chart(document.getElementById('chart-mais-vendidos'), {
        type: 'bar',
        data: {
            labels: labelsVendas,
            datasets: [{
                label: 'Quantidade Vendida',
                data: dataVendas,
                backgroundColor: 'rgba(255, 255, 40, 0.57)', // Altere esta cor
                borderColor: 'rgba(255, 255, 96, 1)', // Altere esta cor
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { 
                    beginAtZero: true ,
                    grid: {
                        drawOnChartArea: false // Esta linha remove a grade do eixo Y
                    }
                }
            }
        }
    });

    // Gráfico de Estoque em Risco
    const estoquePorCategoria = mockData.categorias.map(cat => {
        return {
            categoria: cat,
            risco: mockData.produtos.filter(p => p.categoria === cat && p.quantidade <= p.quantidadeMinima).length,
            total: mockData.produtos.filter(p => p.categoria === cat).length
        }
    });
    
    const labelsCategorias = estoquePorCategoria.map(c => c.categoria);
    const dataRisco = estoquePorCategoria.map(c => c.risco);
    const dataTotal = estoquePorCategoria.map(c => c.total - c.risco);

    new Chart(document.getElementById('chart-estoque-risco'), {
        type: 'bar',
        data: {
            labels: labelsCategorias,
            datasets: [
                {
                    label: 'Itens em Risco',
                    data: dataRisco,
                    backgroundColor: 'rgba(255, 255, 40, 0.57)', // Altere esta cor
                },
                {
                    label: 'Itens OK',
                    data: dataTotal,
                    backgroundColor: 'rgba(250, 177, 19, 0.5)' // Altere esta cor
                }
            ]
        },
        options: {
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true, grid: {
                        drawOnChartArea: false // Esta linha remove a grade do eixo Y
                    } }
            }
        }
    });

    // Novo Gráfico de Pizza de Produtos Mais Vendidos
    new Chart(document.getElementById('chart-mais-vendidos-pizza'), {
        type: 'pie', // Tipo do gráfico
        data: {
            labels: labelsVendas, // Reutiliza os labels do gráfico de barras
            datasets: [{
                label: 'Quantidade Vendida',
                data: dataVendas, // Reutiliza os dados do gráfico de barras
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(235, 54, 54, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                borderWidth: 1
            }]
        }
    });

    renderProductsAtRisk();
}

function renderProductsAtRisk() {
    const tableBody = document.querySelector('#produtos-risco-tabela tbody');
    tableBody.innerHTML = '';
    
    const produtosEmRisco = mockData.produtos.filter(p => p.quantidade <= p.quantidadeMinima);

    if (produtosEmRisco.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3">Nenhum produto em estoque de risco.</td></tr>';
        return;
    }

    produtosEmRisco.forEach(product => {
        // Altere esta linha para adicionar a classe "product-risk-item"
        const row = document.createElement('tr');
        row.classList.add('product-risk-item');
        
        row.innerHTML = `
            <td>${product.nome}</td>
            <td class="status-risk">${product.quantidade}</td>
            <td>${product.quantidadeMinima}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', renderDashboard);

document.addEventListener('DOMContentLoaded', renderDashboard);