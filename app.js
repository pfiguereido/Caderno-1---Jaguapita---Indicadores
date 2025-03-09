// Extrair componentes necessários do Recharts
const {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} = Recharts;

// Componente principal
const IndicadoresMunicipais = () => {
  // Dados do IEGM convertidos para valores numéricos para visualização
  const iegmData = [
    { area: 'Nota Geral', valor: 2.5, nota: 'C+' }, // C+ = 2.5
    { area: 'Educação', valor: 3, nota: 'B' },     // B = 3
    { area: 'Planejamento', valor: 2, nota: 'C' },  // C = 2
    { area: 'Saúde', valor: 3, nota: 'B' },        // B = 3
    { area: 'Fiscal', valor: 3, nota: 'B' },       // B = 3
    { area: 'Ambiental', valor: 2, nota: 'C' },     // C = 2
    { area: 'TI', valor: 2.5, nota: 'C+' },        // C+ = 2.5
    { area: 'Cidades', valor: 2, nota: 'C' },       // C = 2
  ];

  // Dados do Progov
  const progovData = [
    { area: 'Educação', valor: 6.31 },
    { area: 'Saúde', valor: 6.35 },
    { area: 'Assistência Social', valor: 6.71 },
    { area: 'Adm. Financeira', valor: 3 },
    { area: 'Transparência', valor: 5.58 },
    { area: 'Controle Interno', valor: 0.35 },
  ];

  // Função para definir a cor com base no valor do IEGM
  const getIEGMColor = (valor) => {
    if (valor >= 4) return "#4CAF50"; // A/A+
    if (valor >= 3) return "#8BC34A"; // B/B+
    if (valor >= 2) return "#FFC107"; // C/C+
    return "#F44336"; // D
  };

  // Função para definir a cor com base no valor do Progov
  const getProgovColor = (valor) => {
    if (valor >= 7) return "#4CAF50";  // Bom
    if (valor >= 5) return "#FFC107";  // Regular
    if (valor >= 3) return "#FF9800";  // Baixo
    return "#F44336";                 // Crítico
  };

  // Componente de tooltip customizado para o IEGM
  const CustomTooltipIEGM = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-bold">{label}</p>
          <p>Nota: {payload[0].payload.nota}</p>
          <p className="text-sm">{getIEGMDescricao(payload[0].payload.nota)}</p>
        </div>
      );
    }
    return null;
  };

  // Componente de tooltip customizado para o Progov
  const CustomTooltipProgov = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-bold">{label}</p>
          <p>Nota: {payload[0].value.toFixed(2)}</p>
          <p className="text-sm">{getProgovDescricao(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  // Função para obter descrição do IEGM
  const getIEGMDescricao = (nota) => {
    switch (nota) {
      case 'A+': case 'A': return 'Altamente efetiva';
      case 'B+': case 'B': return 'Muito efetiva';
      case 'C+': case 'C': return 'Efetiva, mas pode melhorar';
      default: return 'Baixo nível de adequação';
    }
  };

  // Função para obter descrição do Progov
  const getProgovDescricao = (valor) => {
    if (valor >= 7) return "Bom desempenho";
    if (valor >= 5) return "Desempenho mediano";
    if (valor >= 3) return "Baixo desempenho";
    return "Desempenho crítico";
  };

  // Renderização customizada das barras IEGM
  const renderIEGMBars = (entry, index) => {
    return <Bar key={`bar-${index}`} fill={getIEGMColor(entry.valor)} />;
  };

  // Renderização customizada das barras Progov
  const renderProgovBars = (entry, index) => {
    return <Bar key={`bar-${index}`} fill={getProgovColor(entry.valor)} />;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Indicadores de Desempenho Municipal</h1>
      
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Índice de Efetividade da Gestão Municipal (IEGM)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={iegmData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} label={{ value: 'Escala (D=1, C=2, B=3, A=4)', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<CustomTooltipIEGM />} />
              <Legend />
              <Bar dataKey="valor" name="Nível de Efetividade">
                {iegmData.map((entry, index) => (
                  <Bar key={`cell-${index}`} fill={getIEGMColor(entry.valor)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-4 text-xs">
          <div className="flex items-center"><span className="w-3 h-3 mr-1 inline-block bg-gray-300"></span>D: Baixo nível</div>
          <div className="flex items-center"><span className="w-3 h-3 mr-1 inline-block bg-yellow-400"></span>C/C+: Efetiva</div>
          <div className="flex items-center"><span className="w-3 h-3 mr-1 inline-block bg-green-300"></span>B/B+: Muito efetiva</div>
          <div className="flex items-center"><span className="w-3 h-3 mr-1 inline-block bg-green-600"></span>A/A+: Altamente efetiva</div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-bold mb-2 text-yellow-800">Transparência (ITP 2024)</h2>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <span className="text-4xl font-bold text-green-800">DIAMANTE</span>
          <p className="mt-2">Nota: 100% - Ranking Estadual: 19º lugar</p>
          <p className="mt-2 text-sm text-green-700">O município atingiu o mais alto nível de transparência, cumprindo 100% dos requisitos essenciais avaliados.</p>
        </div>
      </div>

      <div className="mb-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h2 className="text-xl font-bold mb-4 text-purple-800">Programa de Gestão e Avaliação (PROGOV)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={progovData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis domain={[0, 10]} />
              <Tooltip content={<CustomTooltipProgov />} />
              <Legend />
              <Bar dataKey="valor" name="Nota (0-10)">
                {progovData.map((entry, index) => (
                  <Bar key={`cell-${index}`} fill={getProgovColor(entry.valor)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-4 text-xs">
          <div className="flex items-center"><span className="w-3 h-3 mr-1 inline-block bg-red-500"></span>0-3: Crítico</div>
          <div className="flex items-center"><span className="w-3 h-3 mr-1 inline-block bg-orange-400"></span>3-5: Baixo</div>
          <div className="flex items-center"><span className="w-3 h-3 mr-1 inline-block bg-yellow-400"></span>5-7: Regular</div>
          <div className="flex items-center"><span className="w-3 h-3 mr-1 inline-block bg-green-500"></span>7-10: Bom</div>
        </div>
      </div>

      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <h2 className="text-xl font-bold mb-4 text-red-800">Áreas que Exigem Atenção Imediata</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-red-300">
            <h3 className="font-bold text-red-700">Controle Interno</h3>
            <div className="text-4xl font-bold text-center text-red-600 my-2">0,35</div>
            <p className="text-sm">Situação crítica que demanda intervenção imediata. Recomenda-se estruturar equipe e procedimentos.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-orange-300">
            <h3 className="font-bold text-orange-700">Administração Financeira</h3>
            <div className="text-4xl font-bold text-center text-orange-600 my-2">3,00</div>
            <p className="text-sm">Desempenho baixo que necessita de revisão dos processos de planejamento orçamentário.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Renderizar o componente no DOM
ReactDOM.render(<IndicadoresMunicipais />, document.getElementById('root'));
