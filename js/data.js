// js/data.js

const mockData = {
    produtos: [
        {
            id: 1,
            nome: 'Filtro de Óleo Fram',
            sku: 'F-O-FRAM-PH580',
            categoria: 'Lubrificação',
            quantidade: 45,
            quantidadeMinima: 15,
            precoUnitario: 35.00,
        },
        {
            id: 2,
            nome: 'Pastilha de Freio Dianteira (Jogo)',
            sku: 'P-F-DIANT-CBR1100',
            categoria: 'Freios',
            quantidade: 8,
            quantidadeMinima: 10,
            precoUnitario: 120.00,
        },
        {
            id: 3,
            nome: 'Vela de Ignição NGK',
            sku: 'V-I-NGK-BKR6E-11',
            categoria: 'Motor',
            quantidade: 25,
            quantidadeMinima: 15,
            precoUnitario: 22.50,
        },
        {
            id: 4,
            nome: 'Amortecedor Dianteiro (Unidade)',
            sku: 'A-DIANT-KA-05-12',
            categoria: 'Suspensão',
            quantidade: 3,
            quantidadeMinima: 2,
            precoUnitario: 250.00,
        },
        {
            id: 5,
            nome: 'Correia Dentada',
            sku: 'C-D-FIAT-PALIO-1.0',
            categoria: 'Motor',
            quantidade: 12,
            quantidadeMinima: 10,
            precoUnitario: 80.00,
        },
        {
            id: 6,
            nome: 'Bateria Moura 60Ah',
            sku: 'B-MOURA-M60AD',
            categoria: 'Elétrica',
            quantidade: 2,
            quantidadeMinima: 5,
            precoUnitario: 450.00,
        }
    ],
    categorias: [
        'Lubrificação',
        'Freios',
        'Motor',
        'Suspensão',
        'Elétrica',
        'Carroceria'
    ],
    fornecedores: [
        {
            id: 101,
            nome: 'Autopeças F&F Ltda.',
            cnpj: '12.345.678/0001-90',
            telefone: '(11) 98765-4321',
            email: 'contato@autopeçasff.com',
            endereco: 'Rua das Rodas, 150 - São Paulo, SP'
        },
        {
            id: 102,
            nome: 'Distribuidora Automotiva Global',
            cnpj: '98.765.432/0001-12',
            telefone: '(21) 91234-5678',
            email: 'comercial@daglobal.com.br',
            endereco: 'Avenida da Mecânica, 50 - Rio de Janeiro, RJ'
        }
    ],
    vendas: [
        { produtoId: 1, quantidade: 3, data: '2025-08-15' },
        { produtoId: 2, quantidade: 2, data: '2025-08-16' },
        { produtoId: 3, quantidade: 5, data: '2025-08-17' },
        { produtoId: 1, quantidade: 2, data: '2025-08-18' },
    ]
};