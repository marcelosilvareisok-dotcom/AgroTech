import React from 'react';
import { Trash2, ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AudioGuide } from '@/components/AudioGuide';

const cartItems = [
  {
    id: '1',
    name: 'Semente de Milho Híbrido AG 8088',
    price: 350.00,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'Fertilizante NPK 10-10-10 (50kg)',
    price: 185.50,
    quantity: 5,
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400',
  }
];

export function Cart() {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const frete = 150.00;
  const total = subtotal + frete;

  const shareCartOnWhatsApp = () => {
    const itemsText = cartItems.map(item => `- ${item.quantity}x ${item.name}`).join('\n');
    const message = `Olá Geraldo Barbosa Marinho! 🌾\n\nPreparei um orçamento especial no AgroTech com os insumos que precisamos para a próxima safra:\n\n${itemsText}\n\n*Total estimado: R$ ${total.toFixed(2).replace('.', ',')}*\n\nCom esses produtos, vamos garantir a melhor produtividade para a nossa lavoura. O que acha de fecharmos esse pedido? 🚜🌱`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text="Você está no seu carrinho de compras. Revise os itens e o valor total antes de finalizar o pedido. Você também pode enviar este orçamento diretamente para o Geraldo via WhatsApp." />
      
      <div>
        <h2 className="text-4xl font-black text-white tracking-tighter">
          Carrinho de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Compras</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">Revise seus itens antes de finalizar o pedido.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-[#111] p-4 rounded-2xl border border-[#333] shadow-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-green-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute -inset-2 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
              <div className="w-full sm:w-24 h-32 sm:h-24 rounded-xl overflow-hidden bg-[#0a0a0a] flex-shrink-0 border border-[#222] relative z-10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="font-bold text-white leading-tight">{item.name}</h3>
                <p className="text-green-400 font-black mt-1">R$ {item.price.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0 relative z-10">
                <div className="flex items-center border border-[#333] rounded-lg overflow-hidden bg-[#0a0a0a]">
                  <button className="px-3 py-1 hover:bg-[#222] text-gray-400 hover:text-white transition-colors">-</button>
                  <span className="px-3 py-1 font-bold text-white border-x border-[#333]">{item.quantity}</span>
                  <button className="px-3 py-1 hover:bg-[#222] text-gray-400 hover:text-white transition-colors">+</button>
                </div>
                <button className="p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors border border-transparent hover:border-red-500/30">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#111] p-6 rounded-2xl border border-[#333] shadow-xl h-fit sticky top-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
          <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2 uppercase tracking-wide">
            <ShoppingBag className="w-5 h-5 text-green-400" />
            Resumo do Pedido
          </h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-400 font-medium">
              <span>Subtotal ({cartItems.length} itens)</span>
              <span className="text-white">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-gray-400 font-medium">
              <span>Frete (Transportadora)</span>
              <span className="text-white">R$ {frete.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="pt-4 border-t border-[#222] flex justify-between items-end">
              <span className="font-bold text-gray-400 uppercase tracking-wider text-xs">Total</span>
              <span className="font-black text-green-400 text-3xl drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="relative mt-8 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <button className="relative w-full bg-[#111] hover:bg-[#1a1a1a] text-green-400 border border-green-500/50 py-3.5 rounded-xl font-black flex items-center justify-center gap-2 transition-all uppercase tracking-wide text-sm">
              Finalizar Compra
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <button 
            onClick={shareCartOnWhatsApp}
            className="w-full mt-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Enviar Orçamento para Geraldo
          </button>
          
          <Link to="/loja" className="block text-center mt-6 text-sm font-bold text-gray-500 hover:text-green-400 transition-colors uppercase tracking-wider">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
