
const NAIPES = ['ouros', 'espadas', 'copas', 'paus'];
const CARTAS = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];
const APOSTAS = [1, 3, 6, 9, 12];

class TrucoPaulista {
    constructor() {
        this.placar = [0, 0];
        this.valorMao = 1;
        this.pedido = null;
        this.estado = 'aguardando';
        this.vencedor = null;
        this.resultados = [];
        this.cartaVira = null;
    }

    iniciarPartida() {
        if (this.estado !== 'aguardando') {
            throw new Error('A partida já foi iniciada.');
        }

        this.estado = 'em_andamento';
        this.iniciarNovaMao();

        return this.resumo();
    }

    iniciarNovaMao(vira = null) {
        this.verificarPartida();

        this.valorMao = 1;
        this.pedido = null;
        this.vencedor = null;
        this.resultados = [];
        this.cartaVira = vira;
    }

    pedirTruco(dupla) {
        this.validarDupla(dupla);
        this.verificarPartida();

        if (this.pedido !== null) {
            throw new Error('Já existe um pedido aguardando resposta.');
        }

        if (this.vencedor !== null) {
            throw new Error('A mão já foi encerrada.');
        }

        const proximaAposta = this.proximoValor();

        if (proximaAposta === null) {
            throw new Error('A aposta já atingiu o limite de 12 pontos.');
        }

        this.pedido = dupla;

        return {
            dupla: dupla,
            valorSolicitado: proximaAposta
        };
    }

    aceitarTruco() {
        this.verificarPartida();

        if (this.pedido === null) {
            throw new Error('Não existe pedido aguardando resposta.');
        }

        this.valorMao = this.proximoValor();
        this.pedido = null;

        return this.valorMao;
    }

    correr(dupla) {
        this.validarDupla(dupla);
        this.verificarPartida();

        if (this.pedido === null) {
            throw new Error('Não existe pedido aguardando resposta.');
        }

        if (dupla === this.pedido) {
            throw new Error('A dupla que pediu não pode recusar.');
        }

        const vencedora = this.pedido;
        const pontos = this.valorMao;

        this.placar[vencedora] += pontos;
        this.pedido = null;
        this.vencedor = vencedora;

        this.atualizarEstado();

        return {
            duplaVencedora: vencedora,
            pontos: pontos
        };
    }

    registrarRodada(vencedor, empate = false) {
        this.verificarPartida();

        if (typeof empate !== 'boolean') {
            throw new Error('O empate deve ser informado como verdadeiro ou falso.');
        }

        if (!empate) {
            this.validarDupla(vencedor);
        }

        if (this.vencedor !== null) {
            throw new Error('A mão já foi encerrada.');
        }

        if (this.pedido !== null) {
            throw new Error('O pedido precisa ser respondido antes da rodada.');
        }

        if (this.resultados.length >= 3) {
            throw new Error('As três rodadas já foram registradas.');
        }

        this.resultados.push(empate ? null : vencedor);

        const resultado = this.calcularVencedor();

        if (resultado !== null) {
            this.finalizarMao(resultado);
        }

        return resultado;
    }

    calcularVencedor() {
        const vitorias = [0, 0];

        for (const resultado of this.resultados) {
            if (resultado !== null) {
                vitorias[resultado]++;
            }
        }

        if (vitorias[0] >= 2) return 0;
        if (vitorias[1] >= 2) return 1;

        if (
            this.resultados.length >= 2 &&
            this.resultados[0] === null &&
            this.resultados[1] !== null
        ) {
            return this.resultados[1];
        }

        if (
            this.resultados.length === 3 &&
            this.resultados[0] !== null &&
            this.resultados[1] === null &&
            this.resultados[2] === null
        ) {
            return this.resultados[0];
        }

        return null;
    }

    finalizarMao(dupla) {
        this.validarDupla(dupla);

        if (this.vencedor !== null) {
            throw new Error('A mão já foi encerrada.');
        }

        this.placar[dupla] += this.valorMao;
        this.vencedor = dupla;

        this.atualizarEstado();
    }

    proximoValor() {
        const indice = APOSTAS.indexOf(this.valorMao);
        return APOSTAS[indice + 1] ?? null;
    }

    atualizarEstado() {
        if (this.partidaEncerrada()) {
            this.estado = 'encerrada';
        }
    }

    partidaEncerrada() {
        return this.placar.some(pontos => pontos >= 12);
    }

    pontuacaoDaDupla(dupla) {
        this.validarDupla(dupla);
        return this.placar[dupla];
    }

    resumo() {
        return {
            status: this.estado,
            pontos: [...this.placar],
            aposta: this.valorMao,
            rodadas: [...this.resultados],
            vira: this.cartaVira,
            vencedorDaMao: this.vencedor
        };
    }

    validarDupla(dupla) {
        if (dupla !== 0 && dupla !== 1) {
            throw new Error('A dupla deve ser identificada por 0 ou 1.');
        }
    }

    verificarPartida() {
        if (this.estado !== 'em_andamento') {
            throw new Error('A partida não está em andamento.');
        }

        if (this.partidaEncerrada()) {
            this.estado = 'encerrada';
            throw new Error('A partida já terminou.');
        }
    }

    static identificarManilha(vira) {
        if (!vira || !CARTAS.includes(vira.valor)) {
            throw new Error('Valor de vira inválido.');
        }

        const indice = CARTAS.indexOf(vira.valor);
        return CARTAS[(indice + 1) % CARTAS.length];
    }

    static compararCartas(cartaA, cartaB, vira) {
        if (!cartaA || !cartaB || !vira) {
            throw new Error('As duas cartas e a vira são obrigatórias.');
        }

        for (const carta of [cartaA, cartaB, vira]) {
            if (!CARTAS.includes(carta.valor)) {
                throw new Error('Valor de carta inválido.');
            }
        }

        for (const carta of [cartaA, cartaB]) {
            if (!NAIPES.includes(carta.naipe)) {
                throw new Error('Naipe de carta inválido.');
            }
        }

        const manilha = TrucoPaulista.identificarManilha(vira);

        const aManilha = cartaA.valor === manilha;
        const bManilha = cartaB.valor === manilha;

        if (aManilha && bManilha) {
            return NAIPES.indexOf(cartaA.naipe) -
                NAIPES.indexOf(cartaB.naipe);
        }

        if (aManilha) return 1;
        if (bManilha) return -1;

        return CARTAS.indexOf(cartaA.valor) -
            CARTAS.indexOf(cartaB.valor);
    }
}

module.exports = { TrucoPaulista };
