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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
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
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                },
                {
                    label: 'Itens OK',
                    data: dataTotal,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }
            ]
        },
        options: {
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', renderDashboard);