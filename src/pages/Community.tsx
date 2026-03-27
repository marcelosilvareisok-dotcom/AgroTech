import React from 'react';
import { MessageSquare, ThumbsUp, Share2, User } from 'lucide-react';
import { AudioGuide } from '@/components/AudioGuide';

const posts = [
  {
    id: 1,
    author: 'Carlos Mendes',
    farm: 'Fazenda Sol Nascente',
    time: '2 horas atrás',
    content: 'Alguém mais tendo problemas com a ferrugem asiática na soja nesta safra? Qual defensivo estão usando?',
    likes: 12,
    comments: 5,
    tags: ['Soja', 'Pragas', 'Dúvida']
  },
  {
    id: 2,
    author: 'Ana Silva',
    farm: 'Sítio das Águas',
    time: '5 horas atrás',
    content: 'Colheita do milho finalizada com sucesso! Produtividade 15% acima do esperado graças ao novo sistema de irrigação. 🌽🚜',
    likes: 45,
    comments: 12,
    tags: ['Milho', 'Colheita', 'Irrigação']
  },
  {
    id: 3,
    author: 'Roberto Dias',
    farm: 'Estância Bela Vista',
    time: '1 dia atrás',
    content: 'Venda de trator Massey Ferguson 4292, ano 2018. Único dono, revisões em dia. Interessados chamar no privado.',
    likes: 8,
    comments: 2,
    tags: ['Classificados', 'Maquinário']
  }
];

export function Community() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AudioGuide text="Bem-vindo à comunidade Agro. Aqui você pode se conectar com outros agricultores, compartilhar experiências, tirar dúvidas e ver o que está acontecendo na região." />
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Comunidade</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Conecte-se com outros agricultores, tire dúvidas e compartilhe experiências.</p>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-[#111] p-6 rounded-2xl border border-[#333] shadow-xl relative overflow-hidden group">
        <div className="absolute -inset-2 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full"></div>
        <div className="flex gap-4 relative z-10">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex-shrink-0 flex items-center justify-center text-green-400 border border-green-500/20">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <textarea 
              placeholder="O que você quer compartilhar com a comunidade hoje?"
              className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent resize-none h-24 transition-all"
            ></textarea>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <button className="text-sm font-bold text-gray-500 hover:text-green-400 px-3 py-1.5 rounded-lg hover:bg-[#222] transition-colors uppercase tracking-wider">
                  Adicionar Foto
                </button>
                <button className="text-sm font-bold text-gray-500 hover:text-green-400 px-3 py-1.5 rounded-lg hover:bg-[#222] transition-colors uppercase tracking-wider">
                  Adicionar Tag
                </button>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-40 hover:opacity-70 transition duration-500"></div>
                <button className="relative bg-[#111] hover:bg-[#1a1a1a] text-green-400 border border-green-500/50 px-6 py-2 rounded-xl font-black transition-all uppercase tracking-wide text-sm">
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-[#111] p-6 rounded-2xl border border-[#333] shadow-xl hover:border-green-500/30 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-600 opacity-50"></div>
            <div className="flex justify-between items-start mb-4 pl-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0a0a0a] border border-[#222] rounded-full flex items-center justify-center text-gray-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-white">{post.author}</p>
                  <p className="text-xs font-medium text-gray-500">{post.farm} • {post.time}</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed pl-2">{post.content}</p>
            
            <div className="flex gap-2 mb-6 pl-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-[#222] pl-2">
              <button className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors group">
                <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">{post.likes} Curtidas</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors group">
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">{post.comments} Comentários</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors ml-auto group">
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-wider">Compartilhar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
