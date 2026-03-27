import React, { useState } from 'react';
import { ShoppingCart, Filter, Star, Plus, MessageCircle, X, Camera } from 'lucide-react';
import { Product } from '@/types';
import { AudioGuide } from '@/components/AudioGuide';
import { CameraScanner } from '@/components/CameraScanner';
import { analyzeProductImage } from '@/services/ai';
import { useAppContext } from '@/contexts/AppContext';

const categories = ['Todos', 'Sementes', 'Fertilizantes', 'Equipamentos', 'Defensivos'];

export function Store() {
  const { profile } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'Sementes',
    price: 0,
    stock: 0,
    image: ''
  });

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const shareOnWhatsApp = (product: Product) => {
    const message = `Olá Geraldo Barbosa Marinho! 🌾\n\nVeja essa oferta imperdível na ${profile.storeName} que separei para você:\n\n🚜 *${product.name}*\n💰 Por apenas: *R$ ${product.price.toFixed(2).replace('.', ',')}*\n\nEssa é a oportunidade perfeita para aumentarmos a produtividade da nossa lavoura com o melhor custo-benefício do mercado!\n\nVamos aproveitar?`;
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
    setNewProduct({ category: 'Sementes', price: 0, stock: 0, image: '' });
  };

  const handleScanProduct = async (base64Image: string) => {
    setIsScanning(false);
    setIsAnalyzing(true);
    setIsAddModalOpen(true); // Open modal to show loading state
    
    try {
      const data = await analyzeProductImage(base64Image);
      setNewProduct({
        name: data.name || '',
        category: categories.includes(data.category) ? data.category : 'Sementes',
        price: data.price || 0,
        description: data.description || '',
        stock: 10, // default
        image: `data:image/jpeg;base64,${base64Image}` // Use the captured image
      });
    } catch (error) {
      alert("Erro ao analisar a imagem com IA. Preencha manualmente.");
      setNewProduct(prev => ({ ...prev, image: `data:image/jpeg;base64,${base64Image}` }));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text={`Bem-vindo à ${profile.storeName}. Você pode adicionar novos produtos usando a câmera do seu celular para preenchimento automático com Inteligência Artificial.`} />
      
      {isScanning && (
        <CameraScanner 
          onCapture={handleScanProduct} 
          onClose={() => setIsScanning(false)} 
          title="Escanear Produto"
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{profile.storeName}</h2>
          <p className="text-gray-500 mt-1">Gerencie seus produtos e encontre o que precisa.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsScanning(true)}
            className="flex-1 md:flex-none bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Camera className="w-5 h-5" />
            Escanear
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none bg-white border border-green-600 text-green-700 hover:bg-green-50 px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Adicionar
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
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">Sua loja está vazia. Clique em "Escanear" ou "Adicionar" para cadastrar seu primeiro produto.</p>
        </div>
      ) : (
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
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Adicionar Novo Produto</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={isAnalyzing}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-5 space-y-4">
              {isAnalyzing && (
                <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 animate-pulse">
                  <Camera className="w-4 h-4" />
                  Analisando imagem com IA...
                </div>
              )}

              {newProduct.image && !isAnalyzing && (
                <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                <input 
                  type="text" 
                  required
                  disabled={isAnalyzing}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all disabled:opacity-50"
                  value={newProduct.name || ''}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Ex: Semente de Milho"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select 
                    disabled={isAnalyzing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white disabled:opacity-50"
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
                    disabled={isAnalyzing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all disabled:opacity-50"
                    value={newProduct.price || ''}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  />
                </div>
              </div>

              {!newProduct.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <input 
                    type="url" 
                    disabled={isAnalyzing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all disabled:opacity-50"
                    value={newProduct.image || ''}
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  rows={3}
                  disabled={isAnalyzing}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none disabled:opacity-50"
                  value={newProduct.description || ''}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Detalhes do produto..."
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={isAnalyzing}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isAnalyzing}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-green-600/20 disabled:opacity-50"
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

