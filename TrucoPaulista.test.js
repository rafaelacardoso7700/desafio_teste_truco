
const { TrucoPaulista } = require('./TrucoPaulista');

describe('Testes do Truco Paulista', () => {

    test('CT01 - Iniciar partida com pontuação zerada e aposta de um ponto', () => {
        const jogo = new TrucoPaulista();
        const resumo = jogo.iniciarPartida();

        expect(resumo.status).toBe('em_andamento');
        expect(resumo.pontos).toEqual([0, 0]);
        expect(resumo.aposta).toBe(1);
    });

    test('CT02 - Não permitir registrar rodadas antes de iniciar a partida', () => {
        const jogo = new TrucoPaulista();

        expect(() => jogo.registrarRodada(0))
            .toThrow('A partida não está em andamento.');
    });

    test('CT03 - A dupla vence a mão ao ganhar duas rodadas', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        expect(jogo.registrarRodada(0)).toBeNull();
        expect(jogo.registrarRodada(0)).toBe(0);
        expect(jogo.pontuacaoDaDupla(0)).toBe(1);
    });

    test('CT04 - A dupla vence após perder a primeira rodada', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        jogo.registrarRodada(1);
        jogo.registrarRodada(0);

        expect(jogo.registrarRodada(0)).toBe(0);
        expect(jogo.pontuacaoDaDupla(0)).toBe(1);
    });

    test('CT05 - A vitória na segunda rodada decide após empate na primeira', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        jogo.registrarRodada(null, true);

        expect(jogo.registrarRodada(1)).toBe(1);
        expect(jogo.pontuacaoDaDupla(1)).toBe(1);
    });

    test('CT06 - Pedido e aceitação de truco aumentam a aposta', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        expect(jogo.pedirTruco(0)).toEqual({
            dupla: 0,
            valorSolicitado: 3
        });

        expect(jogo.aceitarTruco()).toBe(3);
        expect(jogo.valorMao).toBe(3);
    });

    test('CT07 - Vitória após aceitar truco concede o valor da aposta', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        jogo.pedirTruco(0);
        jogo.aceitarTruco();

        jogo.registrarRodada(0);
        jogo.registrarRodada(0);

        expect(jogo.pontuacaoDaDupla(0)).toBe(3);
    });

    test('CT08 - Recusar truco concede o valor anterior ao solicitante', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        jogo.pedirTruco(0);

        expect(jogo.correr(1)).toEqual({
            duplaVencedora: 0,
            pontos: 1
        });

        expect(jogo.pontuacaoDaDupla(0)).toBe(1);
    });

    test('CT09 - A progressão da aposta deve chegar até doze pontos', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        for (let i = 0; i < 4; i++) {
            jogo.pedirTruco(i % 2);
            jogo.aceitarTruco();
        }

        expect(jogo.valorMao).toBe(12);

        expect(() => jogo.pedirTruco(0))
            .toThrow('A aposta já atingiu o limite de 12 pontos.');
    });

    test('CT10 - A partida termina quando uma dupla atinge doze pontos', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        jogo.placar[0] = 11;

        jogo.registrarRodada(0);
        jogo.registrarRodada(0);

        expect(jogo.estado).toBe('encerrada');
        expect(jogo.pontuacaoDaDupla(0)).toBe(12);

        expect(() => jogo.iniciarNovaMao())
            .toThrow('A partida não está em andamento.');
    });

    test('CT11 - Rejeitar dupla inválida e pedido de truco duplicado', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        expect(() => jogo.pedirTruco(2))
            .toThrow('A dupla deve ser identificada por 0 ou 1.');

        jogo.pedirTruco(0);

        expect(() => jogo.pedirTruco(1))
            .toThrow('Já existe um pedido aguardando resposta.');
    });

    test('CT12 - Identificar a manilha como a carta seguinte à vira', () => {
        expect(
            TrucoPaulista.identificarManilha({
                valor: '7',
                naipe: 'copas'
            })
        ).toBe('Q');

        expect(
            TrucoPaulista.identificarManilha({
                valor: '3',
                naipe: 'paus'
            })
        ).toBe('4');
    });

    test('CT13 - A manilha vence carta comum e o naipe define a disputa entre manilhas', () => {
        expect(
            TrucoPaulista.compararCartas(
                { valor: 'Q', naipe: 'ouros' },
                { valor: '3', naipe: 'paus' },
                { valor: '7', naipe: 'copas' }
            )
        ).toBeGreaterThan(0);

        expect(
            TrucoPaulista.compararCartas(
                { valor: 'Q', naipe: 'paus' },
                { valor: 'Q', naipe: 'ouros' },
                { valor: '7', naipe: 'copas' }
            )
        ).toBeGreaterThan(0);
    });

    test('CT14 - Rejeitar cartas e resultados de rodada inválidos', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        expect(() => jogo.registrarRodada(3))
            .toThrow('A dupla deve ser identificada por 0 ou 1.');

        expect(() => TrucoPaulista.compararCartas(
            { valor: 'X', naipe: 'copas' },
            { valor: '3', naipe: 'paus' },
            { valor: '7', naipe: 'copas' }
        )).toThrow('Valor de carta inválido.');
    });

    test('CT15 - Não permitir pedir truco quando a mão já terminou', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        jogo.registrarRodada(0);
        jogo.registrarRodada(0);

        expect(() => jogo.pedirTruco(1))
            .toThrow('A mão já foi encerrada.');
    });

    test('CT16 - Não permitir aceitar truco sem pedido pendente', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        expect(() => jogo.aceitarTruco())
            .toThrow('Não existe pedido aguardando resposta.');
    });

    test('CT17 - Não permitir registrar mais de três rodadas', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        jogo.registrarRodada(0);
        jogo.registrarRodada(1);
        jogo.registrarRodada(0);

        expect(() => jogo.registrarRodada(1))
            .toThrow('A mão já foi encerrada.');
    });

    test('CT18 - Não permitir que a dupla que pediu truco recuse o próprio pedido', () => {
        const jogo = new TrucoPaulista();
        jogo.iniciarPartida();

        jogo.pedirTruco(0);

        expect(() => jogo.correr(0))
            .toThrow('A dupla que pediu não pode recusar.');
    });

});
