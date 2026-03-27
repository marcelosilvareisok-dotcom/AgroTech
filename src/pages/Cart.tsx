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
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Carrinho de Compras</h2>
        <p className="text-gray-500 mt-1">Revise seus itens antes de finalizar o pedido.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-24 h-32 sm:h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                <p className="text-green-700 font-bold mt-1">R$ {item.price.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">-</button>
                  <span className="px-3 py-1 font-medium text-gray-900 border-x border-gray-200">{item.quantity}</span>
                  <button className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">+</button>
                </div>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-24">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-green-600" />
            Resumo do Pedido
          </h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItems.length} itens)</span>
              <span className="font-medium text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frete (Transportadora)</span>
              <span className="font-medium text-gray-900">R$ {frete.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between">
              <span className="font-bold text-gray-900 text-lg">Total</span>
              <span className="font-black text-green-700 text-2xl">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-green-600/20">
            Finalizar Compra
            <ArrowRight className="w-5 h-5" />
          </button>

          <button 
            onClick={shareCartOnWhatsApp}
            className="w-full mt-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5" />
            Enviar Orçamento para Geraldo
          </button>
          
          <Link to="/loja" className="block text-center mt-4 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
