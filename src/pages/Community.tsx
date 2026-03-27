import React from 'react';
import { MessageSquare, ThumbsUp, Share2, User } from 'lucide-react';

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
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Comunidade</h2>
          <p className="text-gray-500 mt-1">Conecte-se com outros agricultores, tire dúvidas e compartilhe experiências.</p>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center text-green-700">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <textarea 
              placeholder="O que você quer compartilhar com a comunidade hoje?"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-24"
            ></textarea>
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <button className="text-sm font-medium text-gray-500 hover:text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors">
                  Adicionar Foto
                </button>
                <button className="text-sm font-medium text-gray-500 hover:text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors">
                  Adicionar Tag
                </button>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-sm shadow-green-600/20">
                Publicar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.farm} • {post.time}</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
            
            <div className="flex gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="bg-green-50 text-green-700 px-2.5 py-1 rounded-md text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span className="text-sm font-medium">{post.likes} Curtidas</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">{post.comments} Comentários</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Compartilhar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
