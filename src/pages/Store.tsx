import React, { useState } from 'react';
import { ShoppingCart, Filter, Star, Plus, MessageCircle, X } from 'lucide-react';
import { Product } from '@/types';
import { AudioGuide } from '@/components/AudioGuide';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Semente de Milho Híbrido AG 8088',
    category: 'Sementes',
    price: 350.00,
    image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400',
    description: 'Semente de alta produtividade, resistente a pragas.',
    stock: 50
  },
  {
    id: '2',
    name: 'Fertilizante NPK 10-10-10 (50kg)',
    category: 'Fertilizantes',
    price: 185.50,
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400',
    description: 'Adubo mineral misto para diversas culturas.',
    stock: 120
  },
  {
    id: '3',
    name: 'Pulverizador Costal 20L',
    category: 'Equipamentos',
    price: 245.90,
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=400',
    description: 'Equipamento resistente para aplicação de defensivos.',
    stock: 15
  },
  {
    id: '4',
    name: 'Semente de Soja Brasmax',
    category: 'Sementes',
    price: 420.00,
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=400',
    description: 'Ciclo precoce e alto potencial produtivo.',
    stock: 80
  },
  {
    id: '5',
    name: 'Herbicida Glifosato 5L',
    category: 'Defensivos',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1586771107445-d3af286f0300?auto=format&fit=crop&q=80&w=400',
    description: 'Controle eficiente de ervas daninhas.',
    stock: 45
  },
  {
    id: '6',
    name: 'Tratorito Motocultivador',
    category: 'Equipamentos',
    price: 3450.00,
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a308b?auto=format&fit=crop&q=80&w=400',
    description: 'Ideal para preparo de solo em pequenas áreas.',
    stock: 5
  }
];

const categories = ['Todos', 'Sementes', 'Fertilizantes', 'Equipamentos', 'Defensivos'];

export function Store() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'Sementes',
    price: 0,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400'
  });

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const shareOnWhatsApp = (product: Product) => {
    const message = `Olá Geraldo Barbosa Marinho! 🌾\n\nVeja essa oferta imperdível no AgroTech que separei para você:\n\n🚜 *${product.name}*\n💰 Por apenas: *R$ ${product.price.toFixed(2).replace('.', ',')}*\n\nEssa é a oportunidade perfeita para aumentarmos a produtividade da nossa lavoura com o melhor custo-benefício do mercado!\n\nVamos aproveitar?`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name || 'Novo Produto',
      category: newProduct.category as any,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      image: newProduct.image || 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400',
      description: newProduct.description || 'Sem descrição'
    };
    setProducts([product, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({ category: 'Sementes', price: 0, stock: 0, image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text="Bem-vindo à Loja Agrícola. Aqui você pode comprar sementes, fertilizantes, equipamentos e defensivos. Use os filtros para encontrar o que precisa. Você também pode adicionar novos produtos clicando no botão Adicionar Produto." />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Loja Agrícola</h2>
          <p className="text-gray-500 mt-1">Encontre tudo o que sua fazenda precisa com os melhores preços.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none bg-white border border-green-600 text-green-700 hover:bg-green-50 px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Adicionar Produto
          </button>
          <button className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm shadow-green-600/20">
            <ShoppingCart className="w-5 h-5" />
            Carrinho (3)
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 text-gray-500 mr-2">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filtros:</span>
        </div>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-green-900 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-green-500 hover:text-green-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
            <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-green-700 shadow-sm">
                {product.category}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current text-gray-300" />
                <span className="text-xs text-gray-500 ml-1">(24)</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
              
              <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Preço</p>
                  <p className="text-2xl font-black text-green-700">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => shareOnWhatsApp(product)}
                    className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] p-3 rounded-xl transition-colors shadow-sm"
                    title="Compartilhar com Geraldo no WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className="bg-gray-900 hover:bg-green-600 text-white p-3 rounded-xl transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Adicionar Novo Produto</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  value={newProduct.name || ''}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Ex: Semente de Milho"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                  >
                    {categories.filter(c => c !== 'Todos').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    value={newProduct.price || ''}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <input 
                  type="url" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  value={newProduct.image || ''}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                  value={newProduct.description || ''}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Detalhes do produto..."
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-green-600/20"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

