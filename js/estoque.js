// js/estoque.js

function renderProducts(products) {
    const tableBody = document.querySelector('#productsTable tbody');
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        const statusClass = product.quantidade <= product.quantidadeMinima ? 'status-risk' : 'status-ok';
        const statusText = product.quantidade <= product.quantidadeMinima ? 'Em Risco' : 'OK';

        row.innerHTML = `
            <td>${product.nome}</td>
            <td>${product.sku}</td>
            <td>${product.categoria}</td>
            <td>${product.quantidade}</td>
            <td>${product.quantidadeMinima}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
            <td>
                <button class="edit-btn" onclick="openModal('edit', ${product.id})">Editar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoriaFilter').value;
    
    const filtered = mockData.produtos.filter(p => {
        const matchSearch = p.nome.toLowerCase().includes(searchTerm) || p.sku.toLowerCase().includes(searchTerm);
        const matchCategory = category === '' || p.categoria === category;
        return matchSearch && matchCategory;
    });

    renderProducts(filtered);
}

function setupFilters() {
    const categorySelect = document.getElementById('categoriaFilter');
    mockData.categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

function openModal(mode, productId = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    document.getElementById('modalTitle').textContent = mode === 'add' ? 'Adicionar Produto' : 'Editar Produto';
    form.reset();

    if (mode === 'edit' && productId) {
        const product = mockData.produtos.find(p => p.id === productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.nome;
            document.getElementById('productSKU').value = product.sku;
            document.getElementById('productCategory').value = product.categoria;
            document.getElementById('productQty').value = product.quantidade;
            document.getElementById('productMinQty').value = product.quantidadeMinima;
        }
    }
    
    // Popula o dropdown de categorias no modal
    const modalCategorySelect = document.getElementById('productCategory');
    modalCategorySelect.innerHTML = '';
    mockData.categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        modalCategorySelect.appendChild(option);
    });

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const productId = document.getElementById('productId').value;
    const newProduct = {
        nome: document.getElementById('productName').value,
        sku: document.getElementById('productSKU').value,
        categoria: document.getElementById('productCategory').value,
        quantidade: parseInt(document.getElementById('productQty').value),
        quantidadeMinima: parseInt(document.getElementById('productMinQty').value),
    };

    if (productId) {
        // Editar produto existente
        const index = mockData.produtos.findIndex(p => p.id == productId);
        if (index > -1) {
            mockData.produtos[index] = { ...mockData.produtos[index], ...newProduct };
        }
    } else {
        // Adicionar novo produto
        newProduct.id = mockData.produtos.length > 0 ? Math.max(...mockData.produtos.map(p => p.id)) + 1 : 1;
        mockData.produtos.push(newProduct);
    }
    
    closeModal();
    renderProducts(mockData.produtos); // Atualiza a tabela
});

document.addEventListener('DOMContentLoaded', () => {
    setupFilters();
    renderProducts(mockData.produtos);
});