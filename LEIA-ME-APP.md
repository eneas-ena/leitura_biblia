# Leitura da Bíblia — Etapa 2

App de leitura PWA. Quatro arquivos, tudo pelo navegador do GitHub.

---

## Publicar

**1. Preencha as credenciais.** Abra `index.html` e localize, logo no começo do `<script>`:

```js
const SUPABASE_URL  = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_KEY  = 'SUA_PUBLISHABLE_KEY';
```

Substitua pelos dados do **projeto novo da Bíblia** — não os do projeto antigo.
Settings → API traz os dois valores.

**2. Crie o repositório.** No GitHub, novo repositório público, por exemplo `leitura-biblia`.

**3. Envie os arquivos** (Add file → Upload files):

| Arquivo | Função |
|---|---|
| `index.html` | O app inteiro |
| `manifest.json` | Instalação como aplicativo |
| `sw.js` | Funcionamento offline |
| `icone-192.png` · `icone-512.png` | Ícones |

**4. Ative o GitHub Pages.** Settings → Pages → Source: `Deploy from a branch`,
branch `main`, pasta `/ (root)`. Em um ou dois minutos o endereço aparece na mesma tela.

**5. Instale no iPhone.** Abra o endereço no Safari → Compartilhar → Adicionar à Tela de Início.

Mensagem de commit sugerida: `Primeira versão do app de leitura`

---

## Primeiro uso

Ao abrir, o app pede quem está lendo. Crie um leitor com nome e PIN de 4 dígitos,
escolha um plano e pronto. A aba **Hoje** passa a mostrar a leitura do dia.

---

## O que o app faz

**Hoje** — a leitura do dia, o corte do livro e o botão de marcar como lido.
O "dia de hoje" é sempre o primeiro dia ainda não concluído, não a data do calendário.
Se você viajar uma semana, volta de onde parou em vez de encontrar sete dias em atraso.

**Ler** — navegação livre por livro e capítulo, alternando entre ordem canônica e Tanakh.

**Planos** — os três planos anuais e os nove percursos temáticos, separados. Só as trilhas
com `cobertura_completa` aparecem como "A Bíblia inteira em um ano".

**Buscar** — busca em português no texto completo, com as palavras destacadas.
Vale trocar de versão: as três traduzem de modo bem diferente.

**Marcações** — destaques em três cores e anotações por versículo.

### O corte do livro

O ano aparece como uma faixa de fios verticais, imitando o corte de páginas de uma Bíblia
vista de lado. Dias lidos em tinta, o dia atual em ouro, o resto em papel. Toque em
qualquer fio para pular direto àquele dia — útil para revisar uma leitura antiga
ou adiantar quando sobrar tempo.

### Três temas de leitura

O botão no canto superior direito alterna entre **papel**, **sépia** e **noite**.
O botão `Aa` dentro da leitura ajusta o tamanho do texto e guarda a preferência.

---

## Decisões que valem explicar

**Literata no texto bíblico, não Cormorant Garamond.** Seus outros apps usam Cormorant,
e ela continua nos rótulos e títulos secundários. Mas a Cormorant é fina demais para
vinte minutos de leitura corrida em tela; a Literata foi desenhada para isso.
Cinzel ficou nos títulos, como no seu ícone.

**Marcações independem da versão.** Um destaque feito na Tradução Brasileira aparece
quando você abrir a mesma passagem na Bíblia Livre. É o comportamento que faz sentido
para quem compara traduções.

**O ouro aparece num lugar só** — o dia atual no corte do livro. Seu ícone é azul e prata,
sem dourado, e espalhar ouro pela interface brigaria com ele.

---

## Limitações conhecidas

**O PIN não protege os dados.** Ele separa leitores no aparelho, mas as políticas de RLS
são permissivas — quem tiver a chave publicável e souber usar a API consegue ler as
marcações de todos. Para uso pessoal e familiar está bem. Antes de divulgar para a igreja
inteira, a troca é por Supabase Auth, e as policies precisam ser reescritas.

**Offline é parcial.** A casca do app funciona sem rede e os capítulos já abertos ficam
em cache, mas capítulos nunca visitados exigem conexão. Baixar as três versões inteiras
para o aparelho é possível, e seria um bom próximo bloco.

**Sem áudio, sem referências cruzadas, sem notas de rodapé.** São candidatos naturais
para as próximas versões — o banco já suporta.

---

## Próximos blocos possíveis

1. Download completo para leitura offline de verdade
2. Sequência de dias consecutivos e lembrete diário
3. Exportar marcações e anotações em DOCX
4. Leitura em áudio com a voz do sistema
5. Comparar duas versões lado a lado
