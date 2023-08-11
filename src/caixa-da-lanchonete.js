const cardapio = {
  cafe: 3,
  chantily: 1.5,
  suco: 6.2,
  sanduiche: 6.5,
  queijo: 2,
  salgado: 7.25,
  combo1: 9.5,
  combo2: 7.5,
}

const metodosDePagamento = {
  dinheiro: 0.95,
  credito: 1.03,
  debito: 1,
}

class CaixaDaLanchonete {
  validarItemExtra(principal, itens) {
    if (itens.find((item) => item.includes(principal))) return
    throw new Error("Item extra não pode ser pedido sem o principal")
  }

  validarMetodoDePagamento(metodoDePagamento) {
    if (!metodosDePagamento.hasOwnProperty(metodoDePagamento))
      throw new Error("Forma de pagamento inválida!")
  }

  validarItens(itens) {
    if (itens.length === 0)
      throw new Error("Não há itens no carrinho de compra!")

    const itensValidados = itens.map((item) => {
      const [codigo, quantidade] = item.split(",")
      if (!cardapio.hasOwnProperty(codigo)) throw new Error("Item inválido!")
      if (quantidade < 1) throw new Error("Quantidade inválida!")
      if (codigo === "chantily") this.validarItemExtra("cafe", itens)
      if (codigo === "queijo") this.validarItemExtra("sanduiche", itens)
      return { codigo, quantidade }
    })

    return itensValidados
  }

  calcularValorTotal(cart, metodoDePagamento) {
    return (
      cart.reduce((acc, item) => {
        const { codigo, quantidade } = item
        return acc + cardapio[codigo] * quantidade
      }, 0) * metodosDePagamento[metodoDePagamento]
    ).toFixed(2)
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    try {
      this.validarMetodoDePagamento(metodoDePagamento)
      const itensValidados = this.validarItens(itens)
      const valorTotal = this.calcularValorTotal(
        itensValidados,
        metodoDePagamento
      )
      return `R$ ${valorTotal}`.replace(".", ",")
    } catch (error) {
      return error.message
    }
  }
}

export { CaixaDaLanchonete }
