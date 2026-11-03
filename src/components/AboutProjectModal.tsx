import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, BookOpen, Layers, RotateCcw, CheckCircle } from 'lucide-react';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
}

export const AboutProjectModal: React.FC<AboutProjectModalProps> = ({
  isOpen,
  onClose,
  onResetData,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Empreendedorismo
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Organiza<span className="text-emerald-600">Aí</span>
              </h3>
              <p className="text-xs font-bold text-emerald-700 tracking-wider uppercase mt-1">
                E.E. MARIA BARBOSA LEITE
              </p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">
                Protótipo do aplicativo
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Telas, navegação e funcionamento da organização escolar em um só lugar.
              </p>
            </div>

            {/* Equipe / Autores */}
            <div className="bg-slate-50 rounded-2xl p-4 my-4 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                <Users size={16} className="text-emerald-600" />
                <span>Autores do Projeto</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700 font-medium">
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  Anna Vitória
                </span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  Carlos Henrique
                </span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  Caroline
                </span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  Cibely
                </span>
              </div>
            </div>

            {/* Índice do protótipo */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Layers size={16} className="text-emerald-600" />
                <span>Estrutura do Protótipo (Índice PDF)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-emerald-700">03. Tela Inicial:</span> Resumo da rotina e acesso rápido
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-emerald-700">04. Cadastro:</span> Informações para organizar uma tarefa
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-emerald-700">05. Matérias:</span> Atividades separadas por disciplina
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-emerald-700">06. Agenda:</span> Datas e ordem das entregas
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-emerald-700">07. Detalhes:</span> Consulta, edição e exclusão
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-emerald-700">08. Lembretes:</span> Configuração e simulação
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-emerald-700">09. Concluídas:</span> Acompanhamento e reabertura
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-emerald-700">10. Mensagens:</span> Orientações e estados vazios
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  onResetData();
                  onClose();
                }}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw size={14} />
                Restaurar Dados Originais do PDF
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                Explorar App
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
