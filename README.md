
**Rafaela Tanaka Cardoso 24062611-2**

**Vitor Hugo da Costa 23234248-2**

# Truco Paulista - Casos de Teste

## Concepção do Desafio

O desafio consiste na criação de casos de teste para o jogo de Truco Paulista, utilizando JavaScript e o framework Jest.
A ideia é testar as principais regras do jogo e verificar se tudo funciona como esperado, desde a distribuição das cartas até a definição da dupla vencedora.

Os testes foram elaborados considerando uma partida tradicional de Truco Paulista, com quatro jogadores divididos em duas duplas.

## Funcionamento dos Casos de Teste

Foram criados 18 casos de teste para verificar diferentes situações que podem acontecer durante uma partida.

Os testes estão divididos entre as seguintes funcionalidades:

- **Baralho:** verifica se o baralho possui 40 cartas, sem cartas que não fazem parte do jogo e sem duplicações.
- **Distribuição:** verifica se cada jogador recebe três cartas.
- **Comparação de cartas:** verifica qual carta é mais forte durante uma rodada.
- **Manilhas:** verifica se as manilhas são identificadas corretamente e se a comparação entre elas funciona.
- **Pontuação:** verifica o valor inicial da mão e os aumentos de pontos.
- **Pedidos de truco:** verifica os pedidos de truco, seis, nove e doze, além da possibilidade de recusar.
- **Resultado das rodadas:** verifica qual dupla venceu e como são tratados os empates.
- **Finalização:** verifica a soma dos pontos e o encerramento da partida quando uma dupla chega a 12 pontos.

## Casos de Teste

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT01 | Criar o baralho | O baralho deve conter 40 cartas. |
| CT02 | Verificar as cartas do baralho | Não devem existir cartas 8, 9, 10 ou curingas. |
| CT03 | Verificar cartas duplicadas | O baralho não deve possuir cartas duplicadas. |
| CT04 | Distribuir cartas | Cada jogador deve receber 3 cartas. |
| CT05 | Comparar duas cartas comuns | A carta de maior força deve vencer. |
| CT06 | Identificar a manilha | A manilha deve ser a carta seguinte à vira. |
| CT07 | Comparar manilhas | A manilha de maior força deve vencer. |
| CT08 | Iniciar uma mão | A mão deve começar valendo 1 ponto. |
| CT09 | Pedir truco | O valor da mão deve passar para 3 pontos. |
| CT10 | Aceitar o truco | A mão deve continuar valendo 3 pontos. |
| CT11 | Recusar o truco | A dupla que pediu deve receber o valor atual da mão. |
| CT12 | Pedir seis | O valor da mão deve passar para 6 pontos. |
| CT13 | Pedir nove | O valor da mão deve passar para 9 pontos. |
| CT14 | Pedir doze | O valor da mão deve passar para 12 pontos. |
| CT15 | Verificar o vencedor da mão | A dupla que vencer duas rodadas deve vencer a mão. |
| CT16 | Verificar empate | Se a primeira dupla vencer a primeira rodada e houver empate na segunda, ela vence a mão. |
| CT17 | Atualizar a pontuação | Os pontos conquistados devem ser somados ao placar da dupla. |
| CT18 | Finalizar a partida | A partida deve terminar quando uma dupla atingir 12 pontos. |


### Como executar os testes

Primeiro, é necessário instalar as dependências do projeto:

```bash
npm install
```

Caso o Jest ainda não esteja instalado, utilize:

```bash
npm install --save-dev jest
```

Depois, para executar os testes, basta utilizar:

```bash
npm test
```

O Jest irá executar os casos de teste e mostrar quais passaram e quais apresentaram algum erro.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Jest

## Objetivo

O objetivo dos testes é verificar se as principais regras do Truco Paulista estão funcionando corretamente, ajudando a identificar possíveis erros e garantindo que o jogo siga as regras esperadas.
